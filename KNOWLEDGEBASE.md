# MCP Server Builder Knowledgebase

## Overview
This knowledgebase provides comprehensive instructions for creating Model Context Protocol (MCP) servers from API documentation URLs. Each MCP server will be built as a standalone npm package using TypeScript and Node.js, published to both GitHub and npmjs.com.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Organization](#project-organization)
3. [Tools and Resources](#tools-and-resources)
4. [Phase 1: API Documentation Scraping](#phase-1-api-documentation-scraping)
5. [Phase 2: Data Processing and Tool Design](#phase-2-data-processing-and-tool-design)
6. [Phase 3: MCP Server Implementation](#phase-3-mcp-server-implementation)
7. [Phase 4: GitHub Repository Setup](#phase-4-github-repository-setup)
8. [Phase 5: NPM Package Publishing](#phase-5-npm-package-publishing)
9. [Configuration Templates](#configuration-templates)
10. [Testing and Validation](#testing-and-validation)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- Node.js v18+
- npm or yarn package manager
- Git installed and configured
- GitHub account with authentication token
- npmjs.com account with authentication token

### Environment Variables
```bash
GITHUB_TOKEN=<your_github_token>
NPM_TOKEN=<your_npm_token>
```

---

## Project Organization

### MCP Server Builder Directory Structure

The MCP Server Builder knowledgebase is organized as follows:

```
MCP Server Builder/
├── README.md                              # Project overview
├── KNOWLEDGEBASE.md                       # This comprehensive guide
├── QUICK_START.md                         # Quick reference guide
├── TOOLS_REFERENCE.md                     # Web scraping tools guide
├── WORKFLOW.md                            # Visual workflow diagrams
├── .gitignore                             # Git ignore rules
├── templates/                             # Reusable templates
│   ├── endpoint-extraction-schema.json    # JSON schema for extraction
│   ├── server-template.ts                 # MCP server template
│   ├── PROJECT_CHECKLIST.md               # Project tracking checklist
│   └── PROJECT_INFO.md                    # Project metadata template
├── data/                                  # Extracted endpoint data
│   └── example-endpoints.json             # Example endpoint data
└── mcp-servers/                           # 🎯 Your MCP server projects
    ├── README.md                          # MCP servers directory guide
    └── mcp-server-{service-name}/         # Individual MCP server projects
```

### The mcp-servers/ Directory

**All MCP servers you create should be stored in the `mcp-servers/` directory.** This keeps your projects organized and separate from the knowledgebase itself.

#### Creating a New MCP Server Project

1. **Navigate to the mcp-servers directory:**
   ```bash
   cd mcp-servers
   ```

2. **Create your project directory:**
   ```bash
   mkdir mcp-server-{service-name}
   cd mcp-server-{service-name}
   ```

3. **Initialize the project:**
   ```bash
   npm init -y
   npm install @modelcontextprotocol/sdk axios
   npm install -D typescript @types/node
   ```

4. **Create project structure:**
   ```bash
   mkdir src
   mkdir src/tools
   mkdir data
   ```

5. **Copy templates:**
   ```bash
   # Copy server template
   cp ../../templates/server-template.ts src/index.ts

   # Copy project checklist
   cp ../../templates/PROJECT_CHECKLIST.md ./

   # Copy project info template
   cp ../../templates/PROJECT_INFO.md ./

   # Copy other configuration files as needed
   ```

#### Project Structure for Each MCP Server

```
mcp-servers/mcp-server-{service-name}/
├── src/
│   ├── index.ts                   # Main server implementation
│   ├── types.ts                   # TypeScript type definitions
│   └── tools/                     # Individual tool implementations
│       ├── getTool.ts
│       ├── createTool.ts
│       └── ...
├── data/
│   └── endpoints.json             # Extracted endpoint data
├── dist/                          # Build output (gitignored)
├── node_modules/                  # Dependencies (gitignored)
├── package.json                   # Package configuration
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Server documentation
├── PROJECT_INFO.md                # Project metadata and tracking
├── PROJECT_CHECKLIST.md           # Progress tracking
├── .gitignore                     # Git ignore rules
└── LICENSE                        # License file (MIT recommended)
```

#### Storing Extracted Endpoint Data

When you extract API endpoint data during Phase 1, save it to:
```
mcp-servers/mcp-server-{service-name}/data/endpoints.json
```

This keeps the extracted data with the project for reference during implementation and future updates.

#### Project Metadata (PROJECT_INFO.md)

Each MCP server should have a `PROJECT_INFO.md` file (copied from templates) containing:
- Service details and API documentation links
- Implementation status and metrics
- npm and GitHub links
- Tools implemented
- Testing results
- Version history
- Development timeline
- Known issues

This helps you track the project's status and provides context when you return to it later.

#### Benefits of This Organization

1. **Separation of Concerns**: Knowledgebase separate from implementations
2. **Easy Navigation**: All MCP servers in one place
3. **Template Reuse**: Templates stay in one location
4. **Data Preservation**: Endpoint data stored with each project
5. **Version Control**: Each project can have its own git repository
6. **Progress Tracking**: Use PROJECT_CHECKLIST.md per project

#### Example: Creating a Weather API MCP Server

```bash
# From MCP Server Builder root
cd mcp-servers

# Create project
mkdir mcp-server-openweather
cd mcp-server-openweather

# Initialize
npm init -y
npm install @modelcontextprotocol/sdk axios
npm install -D typescript @types/node

# Create structure
mkdir -p src/tools data

# Copy templates
cp ../../templates/server-template.ts src/index.ts
cp ../../templates/PROJECT_CHECKLIST.md ./
cp ../../templates/PROJECT_INFO.md ./

# Start implementation (follow Phase 1 onwards)
```

---

## Tools and Resources

### Available MCP Tools for Web Scraping

#### 1. **mcp__hyperbrowserAI__scrape_webpage**
- **Best for**: Single page API documentation
- **Returns**: Markdown, HTML, links, or screenshots
- **Use when**: API docs are on a single page

#### 2. **mcp__hyperbrowserAI__crawl_webpages**
- **Best for**: Multi-page API documentation
- **Parameters**:
  - `url`: Starting URL
  - `followLinks`: true
  - `maxPages`: 10-100
  - `outputFormat`: ["markdown", "links"]
- **Use when**: API docs span multiple pages

#### 3. **mcp__hyperbrowserAI__extract_structured_data**
- **Best for**: Extracting specific API endpoint data
- **Parameters**:
  - `urls`: Array of documentation URLs
  - `prompt`: Description of what to extract
  - `schema`: JSON schema for structured output
- **Use when**: You need structured endpoint information

#### 4. **mcp__fetch__fetch**
- **Best for**: Simple HTML fetching with markdown conversion
- **Use when**: Basic documentation scraping without JS rendering

### Recommended Approach
1. Start with `scrape_webpage` or `fetch` to understand the documentation structure
2. If multi-page, use `crawl_webpages` to gather all pages
3. Use `extract_structured_data` with a JSON schema to extract API endpoints

---

## Phase 1: API Documentation Scraping

### Step 1.1: Initial Documentation Discovery

```typescript
// Use scrape_webpage to get initial structure
{
  url: "https://api-docs-url.com",
  outputFormat: ["markdown", "links"]
}
```

**Objective**: Understand the documentation layout, identify all relevant pages.

### Step 1.2: Comprehensive Crawling (if needed)

```typescript
// Use crawl_webpages for multi-page docs
{
  url: "https://api-docs-url.com",
  followLinks: true,
  maxPages: 50,
  outputFormat: ["markdown"]
}
```

**Objective**: Gather all documentation content.

### Step 1.3: Structured Endpoint Extraction

```typescript
// Use extract_structured_data to get API endpoints
{
  urls: ["https://api-docs-url.com/endpoints"],
  prompt: "Extract all API endpoints including method, path, parameters, request body schema, and response schema",
  schema: {
    type: "object",
    properties: {
      endpoints: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            method: { type: "string" },
            path: { type: "string" },
            parameters: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  type: { type: "string" },
                  required: { type: "boolean" },
                  description: { type: "string" },
                  location: { type: "string" } // query, path, header, body
                }
              }
            },
            requestBody: {
              type: "object",
              properties: {
                contentType: { type: "string" },
                schema: { type: "object" }
              }
            },
            responses: {
              type: "object",
              additionalProperties: {
                type: "object",
                properties: {
                  description: { type: "string" },
                  schema: { type: "object" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Objective**: Extract structured API endpoint data for tool creation.

### Step 1.4: Data Organization

Create a JSON file with all extracted endpoints:

```json
{
  "serviceName": "ServiceName",
  "baseUrl": "https://api.service.com",
  "authentication": {
    "type": "bearer|apiKey|oauth2",
    "location": "header|query",
    "parameterName": "Authorization|api_key"
  },
  "endpoints": [
    {
      "name": "get_user",
      "displayName": "Get User",
      "description": "Retrieves user information by ID",
      "method": "GET",
      "path": "/users/{userId}",
      "parameters": [
        {
          "name": "userId",
          "type": "string",
          "required": true,
          "description": "The unique user identifier",
          "location": "path"
        }
      ],
      "responses": {
        "200": {
          "description": "User retrieved successfully",
          "schema": {
            "type": "object",
            "properties": {
              "id": { "type": "string" },
              "name": { "type": "string" },
              "email": { "type": "string" }
            }
          }
        }
      }
    }
  ]
}
```

---

## Phase 2: Data Processing and Tool Design

### Step 2.1: Endpoint to Tool Mapping

Each API endpoint becomes an MCP tool following this structure:

```typescript
interface MCPTool {
  name: string;           // Unique tool identifier (snake_case)
  description: string;    // Clear description of what the tool does
  inputSchema: {          // JSON Schema for input parameters
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}
```

### Step 2.2: Parameter Conversion

Map API parameters to MCP tool input schema:

| API Parameter Location | MCP Input Schema Handling |
|------------------------|---------------------------|
| Path parameter         | Required property in inputSchema |
| Query parameter        | Optional/required property based on API spec |
| Header parameter       | Optional property (e.g., customHeaders) |
| Request body           | Nested object in inputSchema |

### Step 2.3: Tool Naming Convention

- Use snake_case: `get_user`, `create_order`, `delete_item`
- Prefix with service if needed: `stripe_create_customer`
- Be descriptive: `search_repositories` not `search`

---

## Phase 3: MCP Server Implementation

### Step 3.1: Project Structure

```
mcp-server-{service-name}/
├── src/
│   ├── index.ts           # Main MCP server entry point
│   ├── tools/             # Tool implementations
│   │   └── {toolName}.ts
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Helper functions
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
└── LICENSE
```

### Step 3.2: package.json Template

```json
{
  "name": "mcp-server-{service-name}",
  "version": "1.0.0",
  "description": "MCP server for {Service Name} API",
  "main": "dist/index.js",
  "type": "module",
  "bin": {
    "mcp-server-{service-name}": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build",
    "watch": "tsc --watch"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "{service-name}",
    "ai",
    "llm"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Step 3.3: tsconfig.json Template

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 3.4: Main Server Implementation (src/index.ts)

```typescript
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios, { AxiosInstance } from "axios";

// Configuration interface
interface ServerConfig {
  apiKey?: string;
  baseUrl: string;
  timeout?: number;
}

// Tool definitions
const TOOLS = [
  {
    name: "tool_name",
    description: "Tool description",
    inputSchema: {
      type: "object",
      properties: {
        // Define parameters
      },
      required: [],
    },
  },
  // Add more tools...
];

class ServiceMCPServer {
  private server: Server;
  private axiosInstance: AxiosInstance;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;

    // Initialize axios instance
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      },
    });

    // Initialize MCP server
    this.server = new Server(
      {
        name: "mcp-server-{service-name}",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "tool_name":
            return await this.handleToolName(args);
          // Add more cases...
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) throw error;

        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  private async handleToolName(args: any): Promise<any> {
    // Implement tool logic
    const response = await this.axiosInstance.get("/endpoint", {
      params: args,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Server running on stdio");
  }
}

// Main execution
const config: ServerConfig = {
  apiKey: process.env.SERVICE_API_KEY,
  baseUrl: process.env.SERVICE_BASE_URL || "https://api.service.com",
};

const server = new ServiceMCPServer(config);
server.run().catch(console.error);
```

### Step 3.5: Individual Tool Implementation Pattern

For complex servers, separate tools into individual files:

```typescript
// src/tools/getUserTool.ts
import { AxiosInstance } from "axios";

export async function getUserTool(
  axiosInstance: AxiosInstance,
  args: { userId: string }
) {
  const { userId } = args;

  const response = await axiosInstance.get(`/users/${userId}`);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
}

export const getUserToolDefinition = {
  name: "get_user",
  description: "Retrieves user information by ID",
  inputSchema: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The unique user identifier",
      },
    },
    required: ["userId"],
  },
};
```

### Step 3.6: Error Handling Best Practices

```typescript
private async makeApiRequest(
  method: string,
  endpoint: string,
  data?: any
): Promise<any> {
  try {
    const response = await this.axiosInstance.request({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 401) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          "Authentication failed. Check your API key."
        );
      } else if (status === 404) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          "Resource not found"
        );
      } else if (status === 429) {
        throw new McpError(
          ErrorCode.InternalError,
          "Rate limit exceeded"
        );
      }

      throw new McpError(
        ErrorCode.InternalError,
        `API request failed: ${message}`
      );
    }
    throw error;
  }
}
```

---

## Phase 4: GitHub Repository Setup

### Step 4.1: Repository Creation

Use the `mcp__github__create_repository` tool:

```typescript
{
  name: "mcp-server-{service-name}",
  description: "MCP server for {Service Name} API",
  private: false,
  autoInit: true
}
```

### Step 4.2: README.md Template

```markdown
# MCP Server for {Service Name}

Model Context Protocol (MCP) server implementation for the {Service Name} API.

## Features

- 🔧 {Number} API endpoints as MCP tools
- 🔐 Secure API key authentication
- 📝 Full TypeScript support
- ⚡ Built with the official MCP SDK

## Installation

### Via npm

\`\`\`bash
npm install -g mcp-server-{service-name}
\`\`\`

### From source

\`\`\`bash
git clone https://github.com/{username}/mcp-server-{service-name}.git
cd mcp-server-{service-name}
npm install
npm run build
\`\`\`

## Configuration

### Environment Variables

- `SERVICE_API_KEY` (required): Your {Service Name} API key
- `SERVICE_BASE_URL` (optional): Custom API base URL

### MCP Client Configuration

#### Claude Desktop

Add to your `claude_desktop_config.json`:

\`\`\`json
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  }
}
\`\`\`

**Configuration file locations:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

#### Cline (VS Code Extension)

Add to your MCP settings:

\`\`\`json
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  }
}
\`\`\`

#### Continue.dev

Add to your `config.json`:

\`\`\`json
{
  "mcpServers": [
    {
      "name": "{service-name}",
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  ]
}
\`\`\`

## Available Tools

### tool_name_1
**Description**: Brief description

**Parameters:**
- `param1` (required): Description
- `param2` (optional): Description

**Example:**
\`\`\`json
{
  "param1": "value1",
  "param2": "value2"
}
\`\`\`

[Add more tools...]

## Development

### Building

\`\`\`bash
npm run build
\`\`\`

### Watch Mode

\`\`\`bash
npm run watch
\`\`\`

### Testing Locally

\`\`\`bash
# Build the project
npm run build

# Test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
\`\`\`

## Authentication

Get your API key from [{Service Name} Dashboard](https://service.com/dashboard).

## Rate Limits

This server respects {Service Name} API rate limits. Refer to the [official documentation](https://docs.service.com/rate-limits) for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Links

- [{Service Name} API Documentation](https://docs.service.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)

## Support

For issues related to:
- This MCP server: [Open an issue](https://github.com/{username}/mcp-server-{service-name}/issues)
- {Service Name} API: [{Service Name} Support](https://service.com/support)
- MCP Protocol: [MCP GitHub](https://github.com/modelcontextprotocol)
\`\`\`

### Step 4.3: .gitignore Template

```gitignore
# Dependencies
node_modules/

# Build output
dist/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/
```

### Step 4.4: LICENSE Template (MIT)

```
MIT License

Copyright (c) {YEAR} {YOUR_NAME}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 4.5: Push Files to GitHub

Use `mcp__github__push_files`:

```typescript
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

---

## Phase 5: NPM Package Publishing

### Step 5.1: Pre-Publishing Checklist

1. ✅ All TypeScript files compile without errors
2. ✅ package.json has correct metadata
3. ✅ README.md is comprehensive
4. ✅ LICENSE file is present
5. ✅ .gitignore excludes node_modules and dist
6. ✅ Built files are in dist/ directory

### Step 5.2: NPM Authentication

```bash
# Login to npm
npm login

# Or use token
npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

### Step 5.3: Publishing Commands

```bash
# Build the project
npm run build

# Verify package contents
npm pack --dry-run

# Publish to npm
npm publish --access public

# For scoped packages
npm publish --access public --scope=@your-scope
```

### Step 5.4: Version Management

Follow semantic versioning (semver):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes

```bash
# Increment version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Publish new version
npm publish
```

### Step 5.5: Post-Publishing

1. Verify package on npmjs.com: `https://www.npmjs.com/package/mcp-server-{service-name}`
2. Test installation: `npm install -g mcp-server-{service-name}`
3. Update GitHub repository with npm badge in README:

```markdown
[![npm version](https://badge.fury.io/js/mcp-server-{service-name}.svg)](https://www.npmjs.com/package/mcp-server-{service-name})
```

---

## Configuration Templates

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Cline Configuration

```json
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Local Development Configuration

```json
{
  "mcpServers": {
    "{service-name}": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"],
      "env": {
        "SERVICE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

---

## Testing and Validation

### Step 9.1: MCP Inspector Testing

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Test your server
npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web interface to:
- View all available tools
- Test tool calls with custom parameters
- Inspect request/response payloads
- Debug error handling

### Step 9.2: Integration Testing

Create a test script:

```typescript
// test-server.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function testServer() {
  const serverProcess = spawn("node", ["dist/index.js"], {
    env: {
      ...process.env,
      SERVICE_API_KEY: "test-key",
    },
  });

  const transport = new StdioClientTransport({
    reader: serverProcess.stdout,
    writer: serverProcess.stdin,
  });

  const client = new Client(
    {
      name: "test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await client.connect(transport);

  // List tools
  const tools = await client.listTools();
  console.log("Available tools:", tools);

  // Call a tool
  const result = await client.callTool({
    name: "tool_name",
    arguments: { param: "value" },
  });
  console.log("Tool result:", result);

  await client.close();
  serverProcess.kill();
}

testServer().catch(console.error);
```

### Step 9.3: Manual Testing Checklist

- [ ] Server starts without errors
- [ ] All tools are listed correctly
- [ ] Tool parameters validate properly
- [ ] API authentication works
- [ ] Error messages are clear and helpful
- [ ] Rate limiting is handled gracefully
- [ ] Responses are properly formatted

---

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors

**Solution**: Ensure `"type": "module"` is in package.json and use `.js` extensions in imports:
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
```

#### 2. TypeScript compilation errors

**Solution**: Check tsconfig.json has correct module settings:
```json
{
  "module": "Node16",
  "moduleResolution": "Node16"
}
```

#### 3. Server not connecting to MCP client

**Solution**:
- Verify the shebang line: `#!/usr/bin/env node`
- Check file permissions: `chmod +x dist/index.js`
- Test with MCP Inspector first

#### 4. API authentication failing

**Solution**:
- Verify environment variables are set correctly
- Check API key format matches service requirements
- Ensure headers are configured properly in axios instance

#### 5. NPM publish fails

**Solution**:
- Verify npm authentication: `npm whoami`
- Check package name availability: `npm view mcp-server-{service-name}`
- Ensure version is incremented from previous publish

#### 6. Tools not appearing in Claude

**Solution**:
- Restart Claude Desktop after config changes
- Check config file location is correct for your OS
- Verify JSON syntax in claude_desktop_config.json
- Check Claude Desktop logs for errors

---

## Advanced Topics

### Custom Response Formatting

For complex API responses, format them for better LLM consumption:

```typescript
private formatResponse(data: any): string {
  // For lists, create markdown tables
  if (Array.isArray(data)) {
    return this.formatAsTable(data);
  }

  // For objects, create structured text
  return this.formatAsStructuredText(data);
}

private formatAsTable(items: any[]): string {
  if (items.length === 0) return "No items found.";

  const keys = Object.keys(items[0]);
  const header = `| ${keys.join(" | ")} |`;
  const separator = `| ${keys.map(() => "---").join(" | ")} |`;
  const rows = items.map(
    item => `| ${keys.map(k => item[k]).join(" | ")} |`
  );

  return [header, separator, ...rows].join("\n");
}
```

### Pagination Handling

For APIs with paginated responses:

```typescript
private async handlePaginatedRequest(
  endpoint: string,
  args: { page?: number; per_page?: number }
): Promise<any> {
  const page = args.page || 1;
  const perPage = args.per_page || 20;

  const response = await this.axiosInstance.get(endpoint, {
    params: { page, per_page: perPage },
  });

  const hasNextPage = response.data.items.length === perPage;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          items: response.data.items,
          page,
          hasNextPage,
          nextPageHint: hasNextPage
            ? `Use page=${page + 1} to get more results`
            : null,
        }, null, 2),
      },
    ],
  };
}
```

### Webhook Support

For services with webhooks, consider adding a webhook resource:

```typescript
this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "webhook://events",
      mimeType: "application/json",
      name: "Recent webhook events",
      description: "Last 10 webhook events received",
    },
  ],
}));
```

---

## Workflow Summary

### Quick Reference: Creating an MCP Server

1. **Scrape API documentation** using web scraping tools
2. **Extract structured endpoint data** with JSON schema
3. **Create project structure** with TypeScript + Node.js
4. **Implement MCP server** with tool handlers
5. **Create GitHub repository** and push code
6. **Write comprehensive README** with config examples
7. **Build and test** with MCP Inspector
8. **Publish to npm** with proper versioning
9. **Verify installation** and update documentation

### Time Estimates

- Simple API (5-10 endpoints): ~2-3 hours
- Medium API (10-30 endpoints): ~4-6 hours
- Complex API (30+ endpoints): ~8-12 hours

### Quality Checklist

- [ ] All endpoints documented in README
- [ ] TypeScript types for all parameters
- [ ] Error handling for common scenarios
- [ ] Configuration examples for all major MCP clients
- [ ] GitHub repository with complete documentation
- [ ] Published npm package with proper keywords
- [ ] Testing with MCP Inspector completed
- [ ] Version 1.0.0 published

---

## Additional Resources

- [MCP Official Documentation](https://modelcontextprotocol.io)
- [MCP SDK GitHub](https://github.com/modelcontextprotocol/sdk)
- [MCP Servers Examples](https://github.com/modelcontextprotocol/servers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

## Appendix: Example Services

### Good Candidates for MCP Servers

- **REST APIs** with clear documentation
- **Services with API keys** for authentication
- **Public APIs** with generous rate limits
- **APIs with JSON responses**

### Examples
- Weather APIs (OpenWeatherMap, WeatherAPI)
- Database services (Airtable, Notion)
- Communication (Slack, Discord, Twilio)
- Developer tools (GitHub, GitLab, Linear)
- AI services (OpenAI, Anthropic, Hugging Face)
- Payment processors (Stripe, PayPal)
- Cloud storage (Dropbox, Google Drive)

---

*This knowledgebase is a living document. Update it as you learn new patterns and best practices for MCP server development.*
