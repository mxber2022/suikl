// Anthropic SDK
import { Anthropic } from "@anthropic-ai/sdk";
import {
  MessageParam,
  Tool,
} from "@anthropic-ai/sdk/resources/messages/messages.mjs";

// MCP Client
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Express
import express from "express";
import type { RequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

class MCPClient {
  private mcp: Client;
  private llm: Anthropic;
  private transport: StdioClientTransport | null = null;
  public tools: Tool[] = [];

  constructor() {
    this.llm = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      await this.mcp.connect(this.transport);

      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name)
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  // async processQuery(query: string) {
  //   const messages: MessageParam[] = [
  //     {
  //       role: "user",
  //       content: query,
  //     },
  //   ];

  //   const response = await this.llm.messages.create({
  //     model: "claude-3-5-sonnet-20241022",
  //     max_tokens: 1000,
  //     messages,
  //     tools: this.tools,
  //   });

  //   const finalText = [];
  //   const toolResults = [];

  //   for (const content of response.content) {
  //     if (content.type === "text") {
  //       finalText.push(content.text);
  //     } else if (content.type === "tool_use") {
  //       const toolName = content.name;
  //       const toolArgs = content.input as { [x: string]: unknown } | undefined;

  //       const result = await this.mcp.callTool({
  //         name: toolName,
  //         arguments: toolArgs,
  //       });
  //       toolResults.push(result);
  //       finalText.push(
  //         `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`
  //       );

  //       messages.push({
  //         role: "user",
  //         content: result.content as string,
  //       });

  //       const response = await this.llm.messages.create({
  //         model: "claude-3-5-sonnet-20241022",
  //         max_tokens: 1000,
  //         messages,
  //       });

  //       finalText.push(
  //         response.content[0].type === "text" ? response.content[0].text : ""
  //       );
  //     }
  //   }

  //   return finalText.join("\n");
  // }

  async processQuery(query: string) {
    const messages: MessageParam[] = [
      {
        role: "user",
        content: query,
      },
    ];
  
    // First interaction with Claude to see if it wants to use a tool
    const response = await this.llm.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages,
      tools: this.tools,
    });
  
    // Check if Claude wants to use a tool
    const usesTool = response.content.some(content => content.type === "tool_use");
    
    if (!usesTool) {
      // No tool use, just return Claude's response
      return response.content
        .filter(content => content.type === "text")
        .map(content => content.text)
        .join("");
    }
    
    // Handle tool use scenario
    const updatedMessages = [...messages];
    const finalText = [];
    
    for (const content of response.content) {
      if (content.type === "text") {
        finalText.push(content.text);
      } else if (content.type === "tool_use") {
        const toolName = content.name;
        const toolId = content.id; // Get the ID of the tool_use block
        const toolArgs = content.input as { [x: string]: unknown } | undefined;
        
        finalText.push(`[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`);
        
        try {
          // Call the tool
          const result = await this.mcp.callTool({
            name: toolName,
            arguments: toolArgs,
          });
          
          // Directly extract the text from the tool's response
          let toolResponse = "";
          
          if (result.content && Array.isArray(result.content)) {
            // If the content is an array of content blocks
            for (const block of result.content) {
              if (block.type === "text" && block.text) {
                toolResponse += block.text;
              }
            }
          } else if (typeof result.content === "string") {
            // If the content is just a string
            toolResponse = result.content;
          }
          
          // FOR BALANCE TOOL: If this is the balance tool, return the response directly
          if (toolName === "balance") {
            return toolResponse;
          }

           // FOR transfer TOOL: If this is the balance tool, return the response directly
           if (toolName === "transferTokens") {
            return toolResponse;
          }
          
          // For other tools, add the tool's response to the messages array
          updatedMessages.push({
            role: "assistant",
            content: [{
              type: "tool_use",
              id: toolId, // Include the ID from the original tool_use block
              name: toolName,
              input: toolArgs
            }],
          });
          
          updatedMessages.push({
            role: "user", 
            content: toolResponse
          });
          
          // Get Claude's response to the tool result
          const followUpResponse = await this.llm.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1000,
            messages: updatedMessages,
          });
          
          // Add Claude's response to finalText
          for (const content of followUpResponse.content) {
            if (content.type === "text") {
              finalText.push(content.text);
            }
          }
        } catch (error) {
          finalText.push(`Error calling tool ${toolName}: ${error}`);
        }
      }
    }
    
    return finalText.join("\n");
  }

  async cleanup() {
    await this.mcp.close();
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node index.ts <path_to_server_script>");
    return;
  }

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  const mcpClient = new MCPClient();

  try {
    await mcpClient.connectToServer(process.argv[2]);

    // Health check endpoint
    const healthCheck: RequestHandler = (req, res) => {
      res.json({ status: 'ok', tools: mcpClient.tools.map(t => t.name) });
    };
    app.get('/health', healthCheck);

    // LLM interaction endpoint
    const chatHandler: RequestHandler = async (req, res) => {
      try {
        const { query } = req.body;
        if (!query) {
          res.status(400).json({ error: 'Query is required' });
          return;
        }

        const response = await mcpClient.processQuery(query);
        res.json({ response });
      } catch (error) {
        console.error('Error processing query:', error);
        res.status(500).json({ error: 'Failed to process query' });
      }
    };
    app.post('/chat', chatHandler);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
      console.log(`Chat endpoint: http://localhost:${port}/chat`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      await mcpClient.cleanup();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
