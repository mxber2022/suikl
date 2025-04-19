import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { config } from 'dotenv';
config();


function getEnv(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing environment variable: ${key}`);
    return val;
  }

const server = new McpServer({
  name: "sui mcp",
  version: "1.0.0",
});

server.tool(
  "transferTokens",
  {
    fullPrompt: z
      .string()
      .describe("The complete user query for transfer amount"),
    amt: z.string().describe("Amount to transfer, as a string (e.g., '0.1')"),
    token: z.string().describe("Name of token (e.g., 'Sui')"),
    address: z.string().describe("address to transfer (e.g., '0x0cCEb44dbbAF7dE58D8D0e12c93cbE553f0d6Ebf')"),
  },
  async ({ fullPrompt, amt, token, address }) => {
    try {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        const keypair = Ed25519Keypair.deriveKeypair("faint clarify curve diesel satoshi angry half spirit inner quiz crucial drum");

        const tx = new Transaction();
        const [coin] = tx.splitCoins(tx.gas, [BigInt(amt)]);
        tx.transferObjects([coin], address);

        // // Replace with your actual recipient address and amount
        // tx.transferObjects(
        //     [tx.gas],
        //     address,
        // );

        // Sign and execute the transaction
        const result = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
        });

        console.log('Transfer result:', result);


      const transferInfo = `
Transfer completed successfully!
Amount: ${amt}
      `;

      const claudeResponse = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.CLAUDE_API_KEY || "",
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 1024,
            messages: [
              {
                role: "user",
                content: `
You are a cross-chain token transfer assistant using the Wormhole protocol.

A user has initiated a transfer. Here are the details:
${transferInfo}

User query: ${fullPrompt}

Please summarize the action and provide any helpful insights about the transfer.
              `,
              },
            ],
          }),
        }
      );

      const claudeJson = await claudeResponse.json();
      
      // Safely access the Claude response data
      const responseText = claudeJson?.content?.[0]?.text || 
        `Transfer of ${amt} tokens completed successfully `;

      return {
        content: [
          {
            type: "text",
            text: `
${responseText}


          `,
          },
        ],
      };
    } catch (err) {
      console.error("Transfer Error:", err);
      return {
        content: [
          {
            type: "text",
            text: `Error performing transfer: ${err.message || err}`,
          },
        ],
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
