# Claude Code Memory: MCP Server Builder

## Purpose
This is a comprehensive toolkit for building Model Context Protocol (MCP) servers from API documentation. All MCP server projects should be created in the `mcp-servers/` directory.

**Version:** 2.0.0 (Enhanced)
**Last Updated:** 2026-01-30

---

## Table of Contents
1. [Core Knowledge](#core-knowledge)
2. [Complete Workflow (All Phases)](#complete-workflow)
3. [Templates & Code](#templates--code)
4. [Authentication Patterns](#authentication-patterns)
5. [Parameter Handling](#parameter-handling)
6. [Tool Generation Algorithm](#tool-generation-algorithm)
7. [Error Handling Patterns](#error-handling-patterns)
8. [Testing & Debugging](#testing--debugging)
9. [Advanced Patterns](#advanced-patterns)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## Core Knowledge

### Project Organization
- **Root Directory**: MCP Server Builder (this knowledgebase)
- **MCP Servers Location**: `mcp-servers/` directory (all new servers go here)
- **Templates**: `templates/` directory contains reusable code
- **Data**: Extracted endpoint data stored in project's `data/` folder

### Essential File Structure
```
mcp-servers/mcp-server-{service-name}/
├── src/
│   ├── index.ts              # Main MCP server
│   ├── types.ts              # TypeScript types
│   └── tools/                # Individual tool implementations
├── data/
│   └── endpoints.json        # Extracted API endpoint data
├── package.json              # Package config (type: "module")
├── tsconfig.json             # TS config (Node16 module)
├── README.md                 # Documentation
├── PROJECT_INFO.md           # Project metadata
├── PROJECT_CHECKLIST.md      # Progress tracking
├── .gitignore                # Excludes node_modules, dist
└── LICENSE                   # MIT recommended
```

---

## Complete Workflow

### Phase 1: API Documentation Scraping

**Tools Available:**
1. `mcp__fetch__fetch` - Simple static pages, fast
2. `mcp__hyperbrowserAI__scrape_webpage` - Single JS pages
3. `mcp__hyperbrowserAI__crawl_webpages` - Multi-page sites
4. `mcp__hyperbrowserAI__extract_structured_data` - Structured extraction (**PRIMARY TOOL**)

**Decision Tree:**
```
Documentation Type
├─ Single static page → mcp__fetch__fetch
├─ Single JS page → mcp__hyperbrowserAI__scrape_webpage
├─ Multiple pages → mcp__hyperbrowserAI__crawl_webpages
└─ ALWAYS follow with → mcp__hyperbrowserAI__extract_structured_data
```

**Complete Extraction Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "serviceName": {
      "type": "string",
      "description": "Name of the API service"
    },
    "baseUrl": {
      "type": "string",
      "description": "Base URL for the API"
    },
    "authentication": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["bearer", "apiKey", "oauth2", "basic", "none"]
        },
        "location": {
          "type": "string",
          "enum": ["header", "query", "body"]
        },
        "parameterName": {
          "type": "string",
          "description": "e.g., 'Authorization', 'api_key', 'X-API-Key'"
        },
        "scheme": {
          "type": "string",
          "description": "e.g., 'Bearer', 'Basic'"
        }
      }
    },
    "endpoints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "displayName": { "type": "string" },
          "description": { "type": "string" },
          "method": {
            "type": "string",
            "enum": ["GET", "POST", "PUT", "PATCH", "DELETE"]
          },
          "path": {
            "type": "string",
            "description": "Use {param} for path parameters"
          },
          "parameters": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "type": { "type": "string" },
                "required": { "type": "boolean" },
                "description": { "type": "string" },
                "location": {
                  "type": "string",
                  "enum": ["path", "query", "header", "body"]
                },
                "default": {},
                "enum": { "type": "array" },
                "format": { "type": "string" }
              },
              "required": ["name", "type", "required", "location"]
            }
          },
          "requestBody": {
            "type": "object",
            "properties": {
              "contentType": { "type": "string" },
              "required": { "type": "boolean" },
              "schema": { "type": "object" },
              "example": {}
            }
          },
          "responses": {
            "type": "object",
            "additionalProperties": {
              "type": "object",
              "properties": {
                "description": { "type": "string" },
                "contentType": { "type": "string" },
                "schema": { "type": "object" },
                "example": {}
              }
            }
          },
          "rateLimit": {
            "type": "object",
            "properties": {
              "requests": { "type": "number" },
              "period": { "type": "string" }
            }
          },
          "deprecated": { "type": "boolean" },
          "tags": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["name", "description", "method", "path"]
      }
    }
  },
  "required": ["serviceName", "baseUrl", "endpoints"]
}
```

### Phase 2: Project Setup

**Complete Commands:**
```bash
cd mcp-servers
mkdir mcp-server-{service-name}
cd mcp-server-{service-name}
npm init -y
npm install @modelcontextprotocol/sdk axios
npm install -D typescript @types/node
mkdir -p src/tools data
cp ../../templates/server-template.ts src/index.ts
cp ../../templates/PROJECT_INFO.md ./
cp ../../templates/PROJECT_CHECKLIST.md ./
```

**Complete package.json Template:**
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
    "watch": "tsc --watch",
    "dev": "tsc --watch"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "{service-name}",
    "ai",
    "llm",
    "claude"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/{username}/mcp-server-{service-name}.git"
  },
  "bugs": {
    "url": "https://github.com/{username}/mcp-server-{service-name}/issues"
  },
  "homepage": "https://github.com/{username}/mcp-server-{service-name}#readme",
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
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

**Complete tsconfig.json:**
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
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Complete .gitignore:**
```
# Dependencies
node_modules/

# Build output
dist/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
.Spotlight-V100
.Trashes

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/
*.lcov

# Temporary files
*.tmp
.cache/
```

---

## Templates & Code

### Complete Server Template Structure

The server template (`templates/server-template.ts`) includes:

**1. Imports & Configuration**
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
import axios, { AxiosInstance, AxiosError } from "axios";

interface ServerConfig {
  apiKey?: string;
  baseUrl: string;
  timeout?: number;
}
```

**2. Tool Definitions Array**
```typescript
const TOOLS = [
  {
    name: "tool_name",
    description: "What it does",
    inputSchema: {
      type: "object",
      properties: {
        param1: {
          type: "string",
          description: "Param description"
        }
      },
      required: ["param1"]
    }
  }
];
```

**3. Server Class with Handlers**
```typescript
class ServiceMCPServer {
  private server: Server;
  private axiosInstance: AxiosInstance;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey && {
          Authorization: `Bearer ${config.apiKey}`
        })
      }
    });

    this.server = new Server(
      { name: "mcp-server-name", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "tool_name":
            return await this.handleToolName(args);
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        if (error instanceof McpError) throw error;
        if (axios.isAxiosError(error)) throw this.handleAxiosError(error);
        throw new McpError(ErrorCode.InternalError, String(error));
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP Server running on stdio");
  }
}
```

---

## Authentication Patterns

### 1. Bearer Token (Most Common)
```typescript
headers: {
  "Authorization": `Bearer ${config.apiKey}`
}
```

**Environment Variable:**
```bash
SERVICE_API_KEY="your-token-here"
```

### 2. API Key in Header
```typescript
headers: {
  "X-API-Key": config.apiKey
  // or
  "api-key": config.apiKey
}
```

### 3. API Key in Query Parameter
```typescript
params: {
  api_key: config.apiKey
  // or
  apikey: config.apiKey
}
```

### 4. Basic Authentication
```typescript
headers: {
  "Authorization": `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
}
```

**Environment Variables:**
```bash
SERVICE_USERNAME="username"
SERVICE_PASSWORD="password"
```

### 5. OAuth 2.0 (Complex)
```typescript
// Requires token refresh logic
private async refreshToken(): Promise<string> {
  const response = await axios.post('/oauth/token', {
    grant_type: 'client_credentials',
    client_id: this.config.clientId,
    client_secret: this.config.clientSecret
  });
  return response.data.access_token;
}
```

### 6. Custom Authentication
```typescript
// Some APIs use custom headers
headers: {
  "X-Custom-Auth": config.authToken,
  "X-Client-ID": config.clientId
}
```

---

## Parameter Handling

### Path Parameters
```typescript
// Endpoint: GET /users/{userId}/posts/{postId}
private async handleGetUserPost(args: { userId: string; postId: string }) {
  const url = `/users/${args.userId}/posts/${args.postId}`;
  const response = await this.axiosInstance.get(url);
  return this.formatResponse(response.data);
}
```

### Query Parameters
```typescript
// Endpoint: GET /users?page=1&limit=10&filter=active
private async handleListUsers(args: {
  page?: number;
  limit?: number;
  filter?: string
}) {
  const response = await this.axiosInstance.get('/users', {
    params: {
      page: args.page || 1,
      limit: args.limit || 10,
      ...(args.filter && { filter: args.filter })
    }
  });
  return this.formatResponse(response.data);
}
```

### Request Body (JSON)
```typescript
// Endpoint: POST /users
private async handleCreateUser(args: {
  name: string;
  email: string;
  metadata?: Record<string, any>
}) {
  const response = await this.axiosInstance.post('/users', {
    name: args.name,
    email: args.email,
    ...(args.metadata && { metadata: args.metadata })
  });
  return this.formatResponse(response.data);
}
```

### Nested Objects
```typescript
// Complex nested structure
inputSchema: {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        name: { type: "string" },
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" },
            zipCode: { type: "string" }
          }
        }
      }
    }
  }
}
```

### Arrays
```typescript
// Array parameters
inputSchema: {
  type: "object",
  properties: {
    tags: {
      type: "array",
      items: { type: "string" },
      description: "List of tags"
    },
    ids: {
      type: "array",
      items: { type: "number" },
      description: "List of IDs"
    }
  }
}
```

### File Uploads (multipart/form-data)
```typescript
private async handleUploadFile(args: {
  file: string; // Base64 or file path
  filename: string;
  metadata?: Record<string, any>
}) {
  const FormData = (await import('form-data')).default;
  const formData = new FormData();

  // If base64
  const buffer = Buffer.from(args.file, 'base64');
  formData.append('file', buffer, args.filename);

  if (args.metadata) {
    Object.entries(args.metadata).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  const response = await this.axiosInstance.post('/upload', formData, {
    headers: {
      ...formData.getHeaders()
    }
  });

  return this.formatResponse(response.data);
}
```

---

## Tool Generation Algorithm

### Step-by-Step Process

**1. Read Endpoint Data**
```typescript
const endpoints = JSON.parse(fs.readFileSync('data/endpoints.json', 'utf-8'));
```

**2. For Each Endpoint, Generate Tool Definition**
```typescript
function generateToolDefinition(endpoint: Endpoint): ToolDefinition {
  const name = endpoint.name; // Already snake_case from extraction

  const properties: Record<string, any> = {};
  const required: string[] = [];

  // Add parameters
  endpoint.parameters?.forEach(param => {
    properties[param.name] = {
      type: param.type,
      description: param.description
    };

    if (param.enum) {
      properties[param.name].enum = param.enum;
    }

    if (param.required) {
      required.push(param.name);
    }
  });

  return {
    name,
    description: endpoint.description,
    inputSchema: {
      type: "object",
      properties,
      required
    }
  };
}
```

**3. Generate Handler Method**
```typescript
function generateHandler(endpoint: Endpoint): string {
  const methodName = `handle${pascalCase(endpoint.name)}`;

  // Separate parameters by location
  const pathParams = endpoint.parameters.filter(p => p.location === 'path');
  const queryParams = endpoint.parameters.filter(p => p.location === 'query');
  const bodyParams = endpoint.parameters.filter(p => p.location === 'body');

  // Build URL with path parameters
  let url = endpoint.path;
  pathParams.forEach(param => {
    url = url.replace(`{${param.name}}`, `\${args.${param.name}}`);
  });

  // Build method call
  let code = `private async ${methodName}(args: any) {\n`;

  // Validate required parameters
  const requiredParams = endpoint.parameters.filter(p => p.required);
  requiredParams.forEach(param => {
    code += `  if (!args.${param.name}) throw new McpError(ErrorCode.InvalidParams, "${param.name} is required");\n`;
  });

  // Build request
  code += `  const response = await this.axiosInstance.request({\n`;
  code += `    method: "${endpoint.method}",\n`;
  code += `    url: \`${url}\`,\n`;

  if (queryParams.length > 0) {
    code += `    params: {\n`;
    queryParams.forEach(param => {
      code += `      ${param.name}: args.${param.name},\n`;
    });
    code += `    },\n`;
  }

  if (bodyParams.length > 0 || endpoint.method !== 'GET') {
    code += `    data: {\n`;
    bodyParams.forEach(param => {
      code += `      ${param.name}: args.${param.name},\n`;
    });
    code += `    }\n`;
  }

  code += `  });\n`;
  code += `  return this.formatResponse(response.data);\n`;
  code += `}\n`;

  return code;
}
```

**4. Add to TOOLS Array**
```typescript
const TOOLS = endpoints.endpoints.map(generateToolDefinition);
```

**5. Add to Switch Statement**
```typescript
switch (name) {
  ${endpoints.endpoints.map(e => `
    case "${e.name}":
      return await this.handle${pascalCase(e.name)}(args);
  `).join('\n')}
  default:
    throw new McpError(ErrorCode.MethodNotFound, \`Unknown tool: \${name}\`);
}
```

---

## Error Handling Patterns

### Complete Error Handler
```typescript
private handleAxiosError(error: AxiosError): McpError {
  const status = error.response?.status;
  const message = (error.response?.data as any)?.message || error.message;

  // Authentication errors
  if (status === 401 || status === 403) {
    return new McpError(
      ErrorCode.InvalidRequest,
      `Authentication failed: ${message}. Check your API key.`
    );
  }

  // Not found
  if (status === 404) {
    return new McpError(
      ErrorCode.InvalidRequest,
      `Resource not found: ${message}`
    );
  }

  // Rate limiting
  if (status === 429) {
    const retryAfter = error.response?.headers['retry-after'];
    return new McpError(
      ErrorCode.InternalError,
      `Rate limit exceeded: ${message}${retryAfter ? `. Retry after ${retryAfter} seconds` : ''}`
    );
  }

  // Bad request
  if (status === 400) {
    return new McpError(
      ErrorCode.InvalidParams,
      `Invalid request: ${message}`
    );
  }

  // Conflict
  if (status === 409) {
    return new McpError(
      ErrorCode.InvalidRequest,
      `Conflict: ${message}`
    );
  }

  // Unprocessable Entity
  if (status === 422) {
    return new McpError(
      ErrorCode.InvalidParams,
      `Validation failed: ${message}`
    );
  }

  // Server errors
  if (status && status >= 500) {
    return new McpError(
      ErrorCode.InternalError,
      `Server error: ${message}`
    );
  }

  // Network errors
  if (error.code === 'ECONNREFUSED') {
    return new McpError(
      ErrorCode.InternalError,
      'Cannot connect to API server'
    );
  }

  if (error.code === 'ETIMEDOUT') {
    return new McpError(
      ErrorCode.InternalError,
      'Request timeout'
    );
  }

  // Generic error
  return new McpError(
    ErrorCode.InternalError,
    `API request failed: ${message}`
  );
}
```

### Retry Logic for Transient Errors
```typescript
private async makeRequestWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Don't retry client errors (except 429)
        if (status && status >= 400 && status < 500 && status !== 429) {
          throw error;
        }

        // Last attempt
        if (i === maxRetries - 1) {
          throw error;
        }

        // Exponential backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

## Testing & Debugging

### MCP Inspector Testing

**Start Inspector:**
```bash
cd mcp-servers/mcp-server-{service-name}
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

**Test Checklist:**
- [ ] Server connects successfully
- [ ] All tools listed correctly
- [ ] Tool names are snake_case
- [ ] Descriptions are clear
- [ ] Input schemas are complete
- [ ] Required parameters marked
- [ ] Optional parameters work
- [ ] Invalid inputs produce clear errors
- [ ] API calls succeed (with valid credentials)
- [ ] Responses are properly formatted
- [ ] Error messages are helpful

### Debugging Techniques

**1. Add Debug Logging**
```typescript
private async handleToolName(args: any) {
  console.error('[DEBUG] Tool called:', 'tool_name');
  console.error('[DEBUG] Args:', JSON.stringify(args, null, 2));

  try {
    const response = await this.axiosInstance.get('/endpoint');
    console.error('[DEBUG] Response:', response.status);
    return this.formatResponse(response.data);
  } catch (error) {
    console.error('[DEBUG] Error:', error);
    throw error;
  }
}
```

**2. Test with curl**
```bash
# Test API directly
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/endpoint
```

**3. Check Environment Variables**
```typescript
console.error('API Key present:', !!process.env.SERVICE_API_KEY);
console.error('Base URL:', process.env.SERVICE_BASE_URL || 'default');
```

**4. Validate Axios Configuration**
```typescript
console.error('Axios config:', {
  baseURL: this.axiosInstance.defaults.baseURL,
  headers: this.axiosInstance.defaults.headers,
  timeout: this.axiosInstance.defaults.timeout
});
```

### Common Issues & Solutions

**Issue: "Module not found"**
```typescript
// ❌ Wrong
import { Server } from "@modelcontextprotocol/sdk/server/index";

// ✅ Correct
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
```

**Issue: "Cannot read property of undefined"**
```typescript
// ❌ Wrong
const name = args.user.name;

// ✅ Correct
const name = args.user?.name;
if (!name) throw new McpError(ErrorCode.InvalidParams, 'user.name is required');
```

**Issue: "401 Unauthorized"**
```bash
# Check environment variable
echo $SERVICE_API_KEY

# Test with Inspector
SERVICE_API_KEY="your-key" npx @modelcontextprotocol/inspector node dist/index.js
```

---

## Advanced Patterns

### 1. Pagination with Cursor
```typescript
private async handleListWithCursor(args: {
  cursor?: string;
  limit?: number;
}) {
  const response = await this.axiosInstance.get('/items', {
    params: {
      cursor: args.cursor,
      limit: args.limit || 20
    }
  });

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        items: response.data.items,
        nextCursor: response.data.next_cursor,
        hasMore: !!response.data.next_cursor,
        hint: response.data.next_cursor
          ? `To get more results, use cursor: "${response.data.next_cursor}"`
          : null
      }, null, 2)
    }]
  };
}
```

### 2. Response Caching
```typescript
private cache: Map<string, { data: any; timestamp: number }> = new Map();

private async handleWithCache(args: any) {
  const cacheKey = JSON.stringify(args);
  const cached = this.cache.get(cacheKey);

  // Cache for 5 minutes
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    return this.formatResponse(cached.data);
  }

  const response = await this.axiosInstance.get('/endpoint', { params: args });
  this.cache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now()
  });

  return this.formatResponse(response.data);
}
```

### 3. Batch Operations
```typescript
private async handleBatchCreate(args: { items: any[] }) {
  const results = await Promise.allSettled(
    args.items.map(item =>
      this.axiosInstance.post('/items', item)
    )
  );

  const succeeded = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        total: results.length,
        succeeded: succeeded.length,
        failed: failed.length,
        results: succeeded.map((r: any) => r.value.data),
        errors: failed.map((r: any) => r.reason.message)
      }, null, 2)
    }]
  };
}
```

### 4. Webhook Resources
```typescript
// Add to server capabilities
capabilities: {
  tools: {},
  resources: {}
}

// Add resource handler
this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "webhook://events/recent",
      mimeType: "application/json",
      name: "Recent Webhook Events",
      description: "Last 10 webhook events received"
    }
  ]
}));

this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "webhook://events/recent") {
    return {
      contents: [{
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify(this.recentWebhookEvents, null, 2)
      }]
    };
  }
});
```

### 5. Streaming Responses (SSE)
```typescript
private async handleStreamingRequest(args: any) {
  const response = await this.axiosInstance.get('/stream', {
    responseType: 'stream',
    params: args
  });

  let data = '';

  return new Promise((resolve, reject) => {
    response.data.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });

    response.data.on('end', () => {
      resolve(this.formatResponse({ stream: data }));
    });

    response.data.on('error', reject);
  });
}
```

### 6. Markdown Table Formatting
```typescript
private formatAsTable(items: any[]): string {
  if (items.length === 0) return "No items found.";

  const keys = Object.keys(items[0]);
  const header = `| ${keys.join(" | ")} |`;
  const separator = `| ${keys.map(() => "---").join(" | ")} |`;
  const rows = items.map(item =>
    `| ${keys.map(k => {
      const value = item[k];
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    }).join(" | ")} |`
  );

  return [header, separator, ...rows].join("\n");
}
```

---

## Troubleshooting Guide

### Build Issues

**TypeScript Errors:**
```bash
# Clear build cache
rm -rf dist/
rm tsconfig.tsbuildinfo

# Reinstall dependencies
rm -rf node_modules/
npm install

# Rebuild
npm run build
```

**Module Resolution:**
- Ensure all imports end with `.js`
- Check `"type": "module"` in package.json
- Verify `"module": "Node16"` in tsconfig.json

### Runtime Issues

**Server Won't Connect:**
1. Check shebang: `#!/usr/bin/env node` at top of dist/index.js
2. Set permissions: `chmod +x dist/index.js`
3. Test standalone: `node dist/index.js`
4. Check for TypeScript errors in build

**API Calls Failing:**
1. Verify environment variables set
2. Check API key format
3. Test API with curl
4. Check rate limits
5. Verify base URL correct

**Tools Not Appearing:**
1. Check TOOLS array populated
2. Verify ListToolsRequestSchema handler
3. Check for duplicate tool names
4. Verify inputSchema is valid JSON Schema

### Publishing Issues

**npm Publish Fails:**
- Package name taken: Choose different name
- Not authenticated: Run `npm login`
- Version exists: Increment with `npm version patch`
- Files missing: Check `files` array in package.json

**GitHub Push Fails:**
- Authentication: Verify GITHUB_TOKEN
- Repository exists: Check repository name
- File too large: Check .gitignore

---

## Configuration Examples

### Claude Desktop
**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Config:**
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

### Cline (VS Code)
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

### Continue.dev
```json
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
```

---

## Quality Checklist

Before publishing v1.0.0:
- [ ] All endpoints documented in README
- [ ] TypeScript types for all parameters
- [ ] Error handling for all scenarios
- [ ] Config examples for all MCP clients
- [ ] GitHub repository with complete docs
- [ ] npm package with proper keywords
- [ ] MCP Inspector testing completed
- [ ] Tested with at least one MCP client
- [ ] LICENSE file (MIT)
- [ ] .gitignore complete
- [ ] package.json keywords set
- [ ] npm badge in README
- [ ] Shebang in dist/index.js
- [ ] All imports use .js extension
- [ ] No hardcoded secrets

---

## Resources

### Documentation
- [MCP Official Documentation](https://modelcontextprotocol.io)
- [MCP SDK GitHub](https://github.com/modelcontextprotocol/sdk)
- [MCP Servers Examples](https://github.com/modelcontextprotocol/servers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

### Local Files
- `KNOWLEDGEBASE.md` - Complete guide
- `QUICK_START.md` - Quick reference
- `TOOLS_REFERENCE.md` - Web scraping tools
- `WORKFLOW.md` - Visual workflow
- `templates/server-template.ts` - Full server template
- `templates/endpoint-extraction-schema.json` - Complete schema
- `templates/PROJECT_INFO.md` - Project tracking
- `templates/PROJECT_CHECKLIST.md` - Progress checklist

---

## Critical Reminders

1. **Always use mcp-servers/ directory** for new projects
2. **Always extract structured data** using complete schema
3. **Always include .js extensions** in imports
4. **Always test with MCP Inspector** before publishing
5. **Always use "type": "module"** in package.json
6. **Always include shebang** in dist/index.js
7. **Always save extracted data** to data/ folder
8. **Always copy templates** before customizing
9. **Always track progress** in PROJECT_CHECKLIST.md
10. **Always validate authentication** pattern matches API docs
11. **Never commit secrets** (.env files)
12. **Never skip testing** before publishing
13. **Always handle errors** comprehensively
14. **Always document tools** in README

---

## Version History

- **v2.0.0** (2026-01-30): Comprehensive enhancement
  - Added complete server template
  - Added full extraction schema
  - Added authentication patterns for all types
  - Added parameter handling for all scenarios
  - Added tool generation algorithm
  - Added complete error handling
  - Added debugging guide
  - Added advanced patterns (caching, streaming, webhooks)
  - Added complete package.json template
  - Added complete tsconfig.json
  - Added file upload handling
  - Added retry logic
  - Added troubleshooting guide

- **v1.0.0** (2026-01-30): Initial compilation
  - Basic workflow
  - Core patterns
  - Configuration examples

---

*This is the definitive, comprehensive guide for MCP server development.*
