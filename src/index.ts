interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * passive-aggression MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Detect passive aggression in text. Scores severity, identifies phrases, translat
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'passive_aggression_detect',
    description: 'Detect passive aggression in text. Scores severity, identifies phrases, translates to plain English, suggests a response.',
    inputSchema: {
      type: 'object' as const,
      properties: {"content": {"type": "string", "description": "Text to analyze"}, "context": {"type": "string", "description": "Communication channel", "enum": ["email", "slack", "text", "review"]}, "relationship": {"type": "string", "description": "Your relationship to the sender", "enum": ["boss", "coworker", "ex", "vendor", "mom", "investor", "self"]}},
      required: ["content"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('passive-aggression API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'passive_aggression_detect':
      return callApi('https://api.stupidapis.com/passive-aggression/detect', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
