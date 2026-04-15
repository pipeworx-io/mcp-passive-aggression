# mcp-passive-aggression

passive-aggression MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `passive_aggression_detect` | Detect passive aggression in text. Scores severity, identifies phrases, translates to plain English, suggests a response. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "passive-aggression": {
      "url": "https://gateway.pipeworx.io/passive-aggression/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use passive-aggression
```

## License

MIT
