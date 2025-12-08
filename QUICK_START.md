# Quick Start Guide: Creating MCP Servers from API Documentation

This guide provides a streamlined workflow for creating MCP servers. For detailed explanations, see [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md).

## Prerequisites
- [ ] Node.js v18+ installed
- [ ] GitHub account with token set in `GITHUB_TOKEN` env var
- [ ] npm account with token set in `NPM_TOKEN` env var
- [ ] API documentation URL ready

## Step-by-Step Workflow

### 1. Scrape API Documentation (5-15 minutes)

**Single Page Documentation:**
```typescript
// Use mcp__fetch__fetch or mcp__hyperbrowserAI__scrape_webpage
{
  url: "https://api-docs.example.com",
  outputFormat: ["markdown"]
}
```

**Multi-Page Documentation:**
```typescript
// Use mcp__hyperbrowserAI__crawl_webpages
{
  url: "https://api-docs.example.com",
  followLinks: true,
  maxPages: 50,
  outputFormat: ["markdown"]
}
```

### 2. Extract Structured Endpoint Data (10-20 minutes)

```typescript
// Use mcp__hyperbrowserAI__extract_structured_data
{
  urls: ["https://api-docs.example.com/reference"],
  prompt: "Extract all API endpoints with methods, paths, parameters, request/response schemas",
  schema: {
    // Use schema from templates/endpoint-extraction-schema.json
  }
}
```

**Save extracted data to:** `data/{service-name}-endpoints.json`

### 3. Create Project Structure (5 minutes)

**IMPORTANT: All MCP servers should be created in the `mcp-servers/` directory!**

```bash
# Navigate to mcp-servers directory
cd mcp-servers

# Create project
mkdir mcp-server-{service-name}
cd mcp-server-{service-name}

# Initialize
npm init -y
npm install @modelcontextprotocol/sdk axios
npm install -D typescript @types/node

# Create structure
mkdir -p src/tools data
```

**Files to create:**
- `src/index.ts` - Main server file (copy from `../../templates/server-template.ts`)
- `src/types.ts` - TypeScript types
- `src/tools/*.ts` - Individual tool implementations
- `package.json` - Package configuration
- `tsconfig.json` - TypeScript configuration
- `README.md` - Documentation
- `PROJECT_INFO.md` - Project metadata (copy from `../../templates/PROJECT_INFO.md`)
- `PROJECT_CHECKLIST.md` - Progress tracking (copy from `../../templates/PROJECT_CHECKLIST.md`)
- `.gitignore` - Git ignore rules
- `LICENSE` - License file

**Quick template copy:**
```bash
cp ../../templates/server-template.ts src/index.ts
cp ../../templates/PROJECT_INFO.md ./
cp ../../templates/PROJECT_CHECKLIST.md ./
```

**Use templates from KNOWLEDGEBASE.md sections 3.2, 3.3, 4.2, 4.3, 4.4**

### 4. Implement Tools (30-90 minutes depending on complexity)

For each endpoint in your extracted data:

1. Create tool definition:
```typescript
{
  name: "endpoint_name",
  description: "What it does",
  inputSchema: {
    type: "object",
    properties: {
      // Map API parameters here
    },
    required: ["required_params"]
  }
}
```

2. Implement handler:
```typescript
private async handleToolName(args: any) {
  const response = await this.axiosInstance.request({
    method: "GET",
    url: "/endpoint/path",
    params: args
  });

  return {
    content: [{
      type: "text",
      text: JSON.stringify(response.data, null, 2)
    }]
  };
}
```

3. Add to switch statement in `CallToolRequestSchema` handler

### 5. Build and Test Locally (10 minutes)

```bash
# Build
npm run build

# Test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

**Verify:**
- [ ] All tools are listed
- [ ] Tool parameters are correct
- [ ] API calls work with real credentials
- [ ] Error handling works
- [ ] Responses are properly formatted

### 6. Create GitHub Repository (5 minutes)

```typescript
// Use mcp__github__create_repository
{
  name: "mcp-server-{service-name}",
  description: "MCP server for {Service Name} API",
  private: false,
  autoInit: true
}
```

### 7. Push Code to GitHub (5 minutes)

```typescript
// Use mcp__github__push_files
{
  owner: "your-username",
  repo: "mcp-server-{service-name}",
  branch: "main",
  message: "Initial commit: MCP server implementation",
  files: [
    { path: "src/index.ts", content: "..." },
    { path: "package.json", content: "..." },
    { path: "tsconfig.json", content: "..." },
    { path: "README.md", content: "..." },
    { path: ".gitignore", content: "..." },
    { path: "LICENSE", content: "..." }
  ]
}
```

### 8. Publish to npm (5 minutes)

```bash
# Ensure you're logged in
npm whoami

# Build one more time
npm run build

# Verify package contents
npm pack --dry-run

# Publish
npm publish --access public
```

### 9. Verify Installation (5 minutes)

```bash
# Install globally
npm install -g mcp-server-{service-name}

# Test it works
mcp-server-{service-name} --help
```

### 10. Update README with npm Badge

Add to top of README.md:
```markdown
[![npm version](https://badge.fury.io/js/mcp-server-{service-name}.svg)](https://www.npmjs.com/package/mcp-server-{service-name})
```

## Configuration Example for Users

Add this section to your README:

### Claude Desktop
```json
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Config locations:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

## Quick Checklist

Before publishing:
- [ ] TypeScript compiles with no errors
- [ ] All tools tested with MCP Inspector
- [ ] README has complete setup instructions
- [ ] README includes config examples for Claude Desktop
- [ ] package.json has correct name, version, keywords
- [ ] LICENSE file included
- [ ] .gitignore excludes node_modules and dist
- [ ] GitHub repository created and code pushed
- [ ] npm publish successful
- [ ] Test installation from npm works

## Common Issues

### "Cannot find module" error
- Ensure all imports use `.js` extension
- Check `"type": "module"` in package.json

### Server won't connect to Claude
- Verify shebang: `#!/usr/bin/env node`
- Check file permissions: `chmod +x dist/index.js`
- Test with MCP Inspector first

### npm publish fails
- Increment version: `npm version patch`
- Check package name availability
- Verify authentication: `npm whoami`

## Time Estimates

- **Simple API (5-10 endpoints):** 1-2 hours total
- **Medium API (10-30 endpoints):** 2-4 hours total
- **Complex API (30+ endpoints):** 4-8 hours total

## Next Steps

After publishing:
1. Share on MCP community channels
2. Monitor for issues on GitHub
3. Update as API changes
4. Consider adding features:
   - Response caching
   - Better error messages
   - Pagination support
   - Webhook resources

## Resources

- Full documentation: [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md)
- Endpoint extraction schema: [templates/endpoint-extraction-schema.json](./templates/endpoint-extraction-schema.json)
- MCP SDK: https://github.com/modelcontextprotocol/sdk
- MCP Docs: https://modelcontextprotocol.io
