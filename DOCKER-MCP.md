npx @modelcontextprotocol/inspector uv --directory docker-mcp run docker-mcp

Para usá-lo:

Em desenvolvimento local (recomendado): Adicione ao Claude Desktop config (%APPDATA%/Claude/claude_desktop_config.json):
```json
{
  "mcpServers": {
    "docker-mcp": {
      "command": "uv",
      "args": ["--directory", "C:\\Users\\Douglas\\Documents\\php-react-postgre-claude-workspace\\docker-mcp", "run", "docker-mcp"]
    }
  }
}
```

Depois reinicie Claude Desktop para carregar o servidor MCP