import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  Chain,
  Network,
  Wormhole,
  amount,
  wormhole,
  TokenId,
  TokenTransfer,
} from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import sui from "@wormhole-foundation/sdk/sui";
import { SignerStuff, getSigner, getTokenDecimals } from "./helpers";
import { Connection, SendTransactionError } from "@solana/web3.js";

const server = new McpServer({
  name: "EigenLayer AVS service",
  version: "1.0.0",
});

server.tool(
  "transferTokens",
  {
    fullPrompt: z
      .string()
      .describe("The complete user query for transfer amount"),
    amt: z.string().describe("Amount to transfer, as a string (e.g., '0.1')"),
  },
  async ({ fullPrompt, amt }) => {
    try {
      const wh = await wormhole("Testnet", [evm, solana, sui]);

      // Set up source and destination chains
      const sendChain = wh.getChain("Sui");
      const rcvChain = wh.getChain("Solana");

      // Get signer from local key but anything that implements
      const source = await getSigner(sendChain);
      const destination = await getSigner(rcvChain);

      // Shortcut to allow transferring native gas token
      const token = Wormhole.tokenId(sendChain.chain, "native");

      // Used to normalize the amount to account for the tokens decimals
      const decimals = await getTokenDecimals(wh, token, sendChain);
      const automatic = false;

      // Perform the token transfer
      const xfer = await tokenTransfer(wh, {
        token,
        amount: amount.units(amount.parse(amt, decimals)),
        source,
        destination,
        automatic,
      });

      const transferInfo = `
Transfer completed successfully!
Source Chain: Sui
Destination Chain: Solana
Amount: ${amt}
Source Address: ${source.address}
Destination Address: ${destination.address}
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

      return {
        content: [
          {
            type: "text",
            text: `
${claudeJson.content[0].text}


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

// -------------------------------------------
// Helper functions
// -------------------------------------------

async function tokenTransfer<N extends Network>(
  wh: Wormhole<N>,
  route: {
    token: TokenId;
    amount: bigint;
    source: SignerStuff<N, Chain>;
    destination: SignerStuff<N, Chain>;
    automatic: boolean;
    payload?: Uint8Array;
  }
) {
  const xfer = await wh.tokenTransfer(
    route.token,
    route.amount,
    route.source.address,
    route.destination.address,
    route.automatic ?? false,
    route.payload
  );

  const quote = await TokenTransfer.quoteTransfer(
    wh,
    route.source.chain,
    route.destination.chain,
    xfer.transfer
  );

  if (xfer.transfer.automatic && quote.destinationToken.amount < 0)
    throw new Error(
      "The amount requested is too low to cover the fee and any native gas requested."
    );

  console.log("Starting transfer");
  const srcTxids = await xfer.initiateTransfer(route.source.signer);
  console.log(`Source Transaction ID: ${srcTxids[0]}`);
  console.log(`Wormhole Transaction ID: ${srcTxids[1] ?? srcTxids[0]}`);

  console.log("Getting Attestation");
  await waitFor(10); // Wait for 10 seconds
  console.log("10 seconds have passed.");
  await xfer.fetchAttestation(60000);

  console.log("Completing Transfer");
  try {
    const destTxids = await xfer.completeTransfer(route.destination.signer);
    console.log(`Completed Transfer: `, destTxids);
  } catch (e) {
    if (e instanceof SendTransactionError) {
      const connection = new Connection("https://api.testnet.solana.com");
      console.error("Simulation logs:", await e.getLogs(connection));
    }
    throw e;
  }

  return xfer;
}

function waitFor(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
