
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

const server = new McpServer({
  name: "WormholeScan Full API Wrapper",
  version: "1.0.0",
});


server.tool(
  "findAddressById",
  z.object({
    address: z.string().describe("Path param: address"),
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/address/:address";
    finalPath = finalPath.replace(":address", args.address);
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Lookup an address completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "applicationActivity",
  z.object({
    timespan: z.string().optional().describe("Query param: timespan"),
    from: z.string().optional().describe("Query param: from"),
    to: z.string().optional().describe("Query param: to"),
    appIds: z.string().optional().describe("Query param: appIds")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/application-activity";
      const params = new URLSearchParams();
    if (args.timespan) params.append("timespan", args.timespan);
    if (args.from) params.append("from", args.from);
    if (args.to) params.append("to", args.to);
    if (args.appIds) params.append("appIds", args.appIds);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Search for a specific period of time the number of transactions and the volume per application. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findGlobalTransactionById",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/global-tx/:chain_id/:emitter/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find a global transaction by VAA ID
Global transactions is a logical association of two transactions that are related to each other by a unique VAA ID.
The first transaction is created on the origin chain when the VAA is emitted.
The second transaction is created on the destination chain when the VAA is redeemed.
If the response only contains an origin tx the VAA was not redeemed. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorConfig",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/config";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns governor configuration for all guardians. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorConfigByGuardianAddress",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/config/:guardian_address";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns governor configuration for a given guardian. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorEnqueuedVaas",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/enqueued_vaas/";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns enqueued VAAs for each blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansEnqueuedVaasByChain",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/enqueued_vaas/:chain";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all enqueued VAAs for a given blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorNotionalLimit",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/limit";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the governor limit for all blockchains. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorNotionalAvailable",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/notional/available";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the amount of notional value available for each blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorNotionalAvailableByChain",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/notional/available/:chain";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the amount of notional value available for a given blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorNotionalLimitDetail",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/notional/limit";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the detailed notional limit for all blockchains. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorNotionalLimitDetailByChain",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/notional/limit/:chain";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the detailed notional limit available for a given blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorMaxNotionalAvailableByChain",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/notional/max_available/:chain";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the maximum amount of notional value available for a given blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorStatus",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/status";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the governor status for all guardians. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorStatusByGuardianAddress",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/status/:guardian_address";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the governor status for a given guardian. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorVaas",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/governor/vaas";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all vaas in Governor. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "healthCheck",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/health";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Health check completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getLastTransactions",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan"),
    sampleRate: z.string().optional().describe("Query param: sampleRate")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/last-txs";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
    if (args.sampleRate) params.append("sampleRate", args.sampleRate);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the number of transactions by a defined time span and sample rate. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "liveTrackingSubscribe",
  z.object({
    vaaID: z.string().optional().describe("Query param: vaaID"),
    txHash: z.string().optional().describe("Query param: txHash")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/live-tracking/subscribe";
      const params = new URLSearchParams();
    if (args.vaaID) params.append("vaaID", args.vaaID);
    if (args.txHash) params.append("txHash", args.txHash);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Subscribe to live tracking events for a VAA or transaction completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "/api/v1/nativeTokenTransfer/activity",
  z.object({
    symbol: z.string().optional().describe("Query param: symbol"),
    by: z.string().optional().describe("Query param: by")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/native-token-transfer/activity";
      const params = new URLSearchParams();
    if (args.symbol) params.append("symbol", args.symbol);
    if (args.by) params.append("by", args.by);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of values (tx count or notional) of the Native Token Transfer for a emitter and destination chains. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "nativeTokenTransfer summary",
  z.object({
    coingecko_id: z.string().optional().describe("Query param: coingecko_id")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/native-token-transfer/summary";
      const params = new URLSearchParams();
    if (args.coingecko_id) params.append("coingecko_id", args.coingecko_id);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a summary of the Native Token Transfer. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "nativeTokenTransfer tokenList",
  z.object({
    fullPrompt: z
      .string()
      .describe("The complete user query to get tokenList for nativeTokenTransfer"),
    withLinks: z.string().optional().describe("Query param: withLinks")
  }),
  async (args) => { 
    try {
      let finalPath = "/api/v1/native-token-transfer/token-list";
      const params = new URLSearchParams();
    if (args.withLinks) params.append("withLinks", args.withLinks);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the list of supported Native Token Transfer tokens. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "/api/v1/nativeTokenTransfer/topAddress",
  z.object({
    symbol: z.string().optional().describe("Query param: symbol"),
    by: z.string().optional().describe("Query param: by")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/native-token-transfer/top-address";
      const params = new URLSearchParams();
    if (args.symbol) params.append("symbol", args.symbol);
    if (args.by) params.append("by", args.by);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of values (tx count or notional) of the Native Token Transfer for address. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "/api/v1/nativeTokenTransfer/topHolder",
  z.object({
    coingecko_id: z.string().optional().describe("Query param: coingecko_id")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/native-token-transfer/top-holder";
      const params = new URLSearchParams();
    if (args.coingecko_id) params.append("coingecko_id", args.coingecko_id);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of volume and chain of the Native Token Transfer for top holders. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "/api/v1/nativeTokenTransfer/transferByTime",
  z.object({
    from: z.string().optional().describe("Query param: from"),
    to: z.string().optional().describe("Query param: to"),
    symbol: z.string().optional().describe("Query param: symbol"),
    by: z.string().optional().describe("Query param: by"),
    timeSpan: z.string().optional().describe("Query param: timeSpan")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/native-token-transfer/transfer-by-time";
      const params = new URLSearchParams();
    if (args.from) params.append("from", args.from);
    if (args.to) params.append("to", args.to);
    if (args.symbol) params.append("symbol", args.symbol);
    if (args.by) params.append("by", args.by);
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of values (tx count or notional) of the Native Token Transfer for a emitter and destination chains. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findObservations",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    txHash: z.string().optional().describe("Query param: txHash"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/observations";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.txHash) params.append("txHash", args.txHash);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all observations, sorted in descending timestamp order. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findObservationsByChain",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/observations/:chain";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all observations for a given blockchain, sorted in descending timestamp order. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findObservationsByEmitter",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/observations/:chain/:emitter";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all observations for a specific emitter address, sorted in descending timestamp order. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findObservationsBySequence",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/observations/:chain/:emitter/:sequence";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find observations identified by emitter chain, emitter address and sequence. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findObservationsById",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/observations/:chain/:emitter/:sequence/:signer/:hash";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find a specific observation. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getOperations",
  z.object({
    address: z.string().optional().describe("Query param: address"),
    txHash: z.string().optional().describe("Query param: txHash"),
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sourceChain: z.string().optional().describe("Query param: sourceChain"),
    targetChain: z.string().optional().describe("Query param: targetChain"),
    appId: z.string().optional().describe("Query param: appId"),
    exclusiveAppId: z.string().optional().describe("Query param: exclusiveAppId"),
    minAmount: z.string().optional().describe("Query param: minAmount"),
    addressType: z.string().optional().describe("Query param: addressType"),
    from: z.string().optional().describe("Query param: from"),
    to: z.string().optional().describe("Query param: to")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/operations";
      const params = new URLSearchParams();
    if (args.address) params.append("address", args.address);
    if (args.txHash) params.append("txHash", args.txHash);
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sourceChain) params.append("sourceChain", args.sourceChain);
    if (args.targetChain) params.append("targetChain", args.targetChain);
    if (args.appId) params.append("appId", args.appId);
    if (args.exclusiveAppId) params.append("exclusiveAppId", args.exclusiveAppId);
    if (args.minAmount) params.append("minAmount", args.minAmount);
    if (args.addressType) params.append("addressType", args.addressType);
    if (args.from) params.append("from", args.from);
    if (args.to) params.append("to", args.to);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find all operations. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "searchOperations",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/operations";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find operations by filters. Currently only txHash is supported. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getOperationById",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/operations/{chain_id}/{emitter}/{seq}";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find operations by ID (chainID/emitter/sequence). completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getTopProtocolsStats",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/protocols/stats";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the representative stats for the top protocols completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "readyCheck",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/ready";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Ready check completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findRelayByVaaId",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/relays/:chain/:emitter/:sequence";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get a specific relay information by chainID, emitter address and sequence. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getScorecards",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/scorecards";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of KPIs for Wormhole.
TVL is total value locked by token bridge contracts in USD.
Volume is the all-time total volume transferred through the token bridge in USD.
24h volume is the volume transferred through the token bridge in the last 24 hours, in USD.
Total Tx count is the number of transaction bridging assets since the creation of the network (does not include Pyth or other messages).
24h tx count is the number of transaction bridging assets in the last 24 hours (does not include Pyth or other messages).
Total messages is the number of VAAs emitted since the creation of the network (includes Pyth messages). completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "supplyInfo",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/supply";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get W token supply data (circulation and total supply). completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "circulatingSupply",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/supply/circulating";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get W token circulation supply. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "totalSupply",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/supply/total";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get W token total supply. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getTokenByChainAndAddress",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    token_address: z.string().describe("Path param: token_address")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/token/:chain_id/:token_address";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":token_address", args.token_address);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a token symbol, coingecko id and address by chain and token address. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "/api/v1/top100Corridors",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/top-100-corridors";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of the top 100 tokens, sorted in descending order by the number of transactions. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getTopAssetsByVolume",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/top-assets-by-volume";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of emitter_chain and asset pairs with ordered by volume.
The volume is calculated using the notional price of the symbol at the day the VAA was emitted. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getTopChainPairsByNumTransfers",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/top-chain-pairs-by-num-transfers";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of the emitter_chain and destination_chain pair ordered by transfer count. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "topSymbolsByVolume",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/top-symbols-by-volume";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of symbols by origin chain and tokens.
The volume is calculated using the notional price of the symbol at the day the VAA was emitted. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "listTransactions",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder"),
    address: z.string().optional().describe("Query param: address")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/transactions/";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
    if (args.address) params.append("address", args.address);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns transactions. Output is paginated. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getTransactionById",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/transactions/:chain_id/:emitter/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find VAA metadata by ID. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findAllVaas",
  z.object({
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder"),
    txHash: z.string().optional().describe("Query param: txHash"),
    parsedPayload: z.string().optional().describe("Query param: parsedPayload")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/";
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
    if (args.txHash) params.append("txHash", args.txHash);
    if (args.parsedPayload) params.append("parsedPayload", args.parsedPayload);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all VAAs. Output is paginated and can also be be sorted. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findVaasByChain",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/:chain_id";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
      const params = new URLSearchParams();
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all the VAAs generated in specific blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findVaasByEmitter",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    toChain: z.string().optional().describe("Query param: toChain"),
    page: z.string().optional().describe("Query param: page"),
    pageSize: z.string().optional().describe("Query param: pageSize"),
    sortOrder: z.string().optional().describe("Query param: sortOrder")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/:chain_id/:emitter";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
      const params = new URLSearchParams();
    if (args.toChain) params.append("toChain", args.toChain);
    if (args.page) params.append("page", args.page);
    if (args.pageSize) params.append("pageSize", args.pageSize);
    if (args.sortOrder) params.append("sortOrder", args.sortOrder);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns all all the VAAs generated by a specific emitter address. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findVaaById",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq"),
    parsedPayload: z.string().optional().describe("Query param: parsedPayload")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/:chain_id/:emitter/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
    if (args.parsedPayload) params.append("parsedPayload", args.parsedPayload);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find a VAA by ID. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "findDuplicatedVaaById",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/:chain_id/:emitter/:seq/duplicated";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Find duplicated VAA by ID. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "parseVaa",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/parse";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Parse a VAA. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getVaaCounts",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/vaas/vaa-counts";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the total number of VAAs emitted for each blockchain. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getVersion",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/version";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get version/release information. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "getSecuredTokens",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/wormhole/assets/secured-tokens";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of tokens secured by Wormhole, including Native Token Transfers and Portal Bridge tokens completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "xChainActivity",
  z.object({
    timeSpan: z.string().optional().describe("Query param: timeSpan"),
    by: z.string().optional().describe("Query param: by"),
    apps: z.string().optional().describe("Query param: apps")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/x-chain-activity";
      const params = new URLSearchParams();
    if (args.timeSpan) params.append("timeSpan", args.timeSpan);
    if (args.by) params.append("by", args.by);
    if (args.apps) params.append("apps", args.apps);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns a list of chain pairs by origin chain and destination chain.
The list could be rendered by notional or transaction count.
The volume is calculated using the notional price of the symbol at the day the VAA was emitted. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "xChainActivityTops",
  z.object({
    timespan: z.string().optional().describe("Query param: timespan"),
    from: z.string().optional().describe("Query param: from"),
    to: z.string().optional().describe("Query param: to"),
    appId: z.string().optional().describe("Query param: appId"),
    sourceChain: z.string().optional().describe("Query param: sourceChain"),
    targetChain: z.string().optional().describe("Query param: targetChain")
  }),
  async (args) => {
    try {
      let finalPath = "/api/v1/x-chain-activity/tops";
      const params = new URLSearchParams();
    if (args.timespan) params.append("timespan", args.timespan);
    if (args.from) params.append("from", args.from);
    if (args.to) params.append("to", args.to);
    if (args.appId) params.append("appId", args.appId);
    if (args.sourceChain) params.append("sourceChain", args.sourceChain);
    if (args.targetChain) params.append("targetChain", args.targetChain);
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Search for a specific period of time the number of transactions and the volume. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "swagger",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/swagger.json";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Returns the swagger specification for this API. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "governorAvailableNotionalByChain",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/v1/governor/available_notional_by_chain";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get available notional by chainID
Since from the wormhole-explorer point of view it is not a node, but has the information of all nodes,
in order to build the endpoints it was assumed:
There are N number of remainingAvailableNotional values in the GovernorConfig collection. N = number of guardians
for a chainID. The smallest remainingAvailableNotional value for a chainID is used for the endpoint response. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansEnqueuedVaas",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/v1/governor/enqueued_vaas";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get enqueued VAAs completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansIsVaaEnqueued",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/v1/governor/is_vaa_enqueued/:chain_id/:emitter/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Check if vaa is enqueued completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansTokenList",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/v1/governor/token_list";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get token list
Since from the wormhole-explorer point of view it is not a node, but has the information of all nodes,
in order to build the endpoints it was assumed:
For tokens with the same originChainId and originAddress and different price values for each node,
the price that has most occurrences in all the nodes for an originChainId and originAddress is returned. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardianSet",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/v1/guardianset/current";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get current guardian set. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansHearbeats",
  z.object({
    // no params
  }),
  async (args) => {
    try {
      let finalPath = "/v1/heartbeats";
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `Get heartbeats for guardians completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansFindSignedBatchVaa",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/v1/signed_batch_vaa/:chain_id/:emitter/sequence/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `get a batch of VAA []byte from a chainID, emitter address and sequence. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);

server.tool(
  "guardiansFindSignedVaa",
  z.object({
    chain_id: z.string().describe("Path param: chain_id"),
    emitter: z.string().describe("Path param: emitter"),
    seq: z.string().describe("Path param: seq")
  }),
  async (args) => {
    try {
      let finalPath = "/v1/signed_vaa/:chain_id/:emitter/:seq";
    finalPath = finalPath.replace(":chain_id", args.chain_id);
    finalPath = finalPath.replace(":emitter", args.emitter);
    finalPath = finalPath.replace(":seq", args.seq);
      const params = new URLSearchParams();
      const fullUrl = `https://api.wormholescan.io${finalPath}?${params.toString()}`;

      const res = await fetch(fullUrl);
      const data = await res.json();

      return {
        content: [
          { type: "text", text: `get a VAA []byte from a chainID, emitter address and sequence. completed.` },
          { type: "json", json: data }
        ]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    }
  }
);


const transport = new StdioServerTransport();
await server.connect(transport);
