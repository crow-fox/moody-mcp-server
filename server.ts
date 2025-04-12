import { McpServer } from "npm:@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "npm:zod";
import { formatMoodyResult, runMoody } from "./moody.ts";

const server = new McpServer({
  name: "むらっけ MCP Server",
  version: "0.0.1",
});

server.tool(
  "playMoody",
  "むらっけを指定した回数発動させる",
  {
    count: z.number().min(1).max(10).describe("発動回数"),
  },
  ({ count }) => {
    return {
      content: [
        {
          type: "text",
          text: formatMoodyResult(runMoody(count)),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.info("Server started. Waiting for client connection...");
}

await main().catch((error) => {
  console.error("むらっけ MCP Server Error: ", error);
  Deno.exit(1);
});
