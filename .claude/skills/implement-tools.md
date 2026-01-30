# Implement MCP Tools

**Description:** Implement MCP server tools from extracted endpoint data.

**Usage:** `/implement-tools <service-name>`

**Examples:**
- `/implement-tools stripe`
- `/implement-tools github`

---

## Workflow

This skill handles Phase 4 of MCP server creation: implementing tool definitions and handlers.

### Step 1: Load Endpoint Data

Read `mcp-servers/mcp-server-{service-name}/data/endpoints.json`

Validate:
- [ ] File exists and is valid JSON
- [ ] Contains endpoints array
- [ ] Each endpoint has required fields (name, method, path)

### Step 2: Generate Tool Definitions

For each endpoint in the data, create a tool definition:

```typescript
{
  name: "endpoint_name",  // snake_case from endpoint.name
  description: "endpoint.description",
  inputSchema: {
    type: "object",
    properties: {
      // Map each parameter from endpoint.parameters
      paramName: {
        type: "parameter.type",
        description: "parameter.description"
      }
    },
    required: [/* required parameter names */]
  }
}
```

**Naming Convention:**
- Convert to snake_case
- Use descriptive names (e.g., `get_user`, `create_payment`)
- Prefix with resource if needed (e.g., `user_get`, `payment_create`)

### Step 3: Generate Tool Handlers

For each tool, create a handler method:

```typescript
private async handleToolName(args: any): Promise<any> {
  // 1. Validate required parameters
  const requiredParams = ['param1', 'param2'];
  for (const param of requiredParams) {
    if (!args[param]) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Missing required parameter: ${param}`
      );
    }
  }

  // 2. Build API request
  // For path parameters, substitute in URL
  // For query parameters, add to params
  // For body parameters, add to data

  const method = "GET|POST|PUT|DELETE";
  let url = endpoint.path;

  // Replace path parameters
  for (const param of pathParams) {
    url = url.replace(`{${param}}`, args[param]);
  }

  // 3. Make API call
  const response = await this.axiosInstance.request({
    method,
    url,
    params: queryParams,
    data: bodyParams
  });

  // 4. Format response
  return {
    content: [{
      type: "text",
      text: JSON.stringify(response.data, null, 2)
    }]
  };
}
```

### Step 4: Update TOOLS Array

Add all tool definitions to the `TOOLS` array in `src/index.ts`:

```typescript
const TOOLS = [
  {
    name: "tool_1",
    description: "...",
    inputSchema: { ... }
  },
  {
    name: "tool_2",
    description: "...",
    inputSchema: { ... }
  },
  // ... all tools
];
```

### Step 5: Update Switch Statement

Add cases for each tool in the `CallToolRequestSchema` handler:

```typescript
switch (name) {
  case "tool_1":
    return await this.handleTool1(args);
  case "tool_2":
    return await this.handleTool2(args);
  // ... all tools
  default:
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${name}`
    );
}
```

### Step 6: Create Type Definitions

Create `src/types.ts` with TypeScript interfaces:

```typescript
// Request argument types
export interface Tool1Args {
  param1: string;
  param2?: number;
}

export interface Tool2Args {
  param1: string;
}

// API response types
export interface ApiResponse {
  // Based on API documentation
}
```

### Step 7: Add Error Handling

Implement comprehensive error handling:

```typescript
private async makeApiRequest(
  method: string,
  endpoint: string,
  data?: any,
  params?: any
): Promise<any> {
  try {
    const response = await this.axiosInstance.request({
      method,
      url: endpoint,
      data,
      params
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      // Authentication errors
      if (status === 401 || status === 403) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Authentication failed: ${message}. Check your API key.`
        );
      }

      // Not found
      if (status === 404) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Resource not found: ${message}`
        );
      }

      // Rate limiting
      if (status === 429) {
        throw new McpError(
          ErrorCode.InternalError,
          `Rate limit exceeded: ${message}`
        );
      }

      // Bad request
      if (status === 400) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Invalid request: ${message}`
        );
      }

      // Server errors
      if (status >= 500) {
        throw new McpError(
          ErrorCode.InternalError,
          `Server error: ${message}`
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

### Step 8: Build and Verify

```bash
npm run build
```

Check for:
- [ ] TypeScript compilation successful
- [ ] No type errors
- [ ] All imports resolved
- [ ] dist/index.js created

### Step 9: Update README

Document each tool in README.md:

```markdown
### tool_name

**Description:** What the tool does

**Parameters:**
- `param1` (required, string): Description
- `param2` (optional, number): Description

**Example:**
\`\`\`json
{
  "param1": "value1",
  "param2": 42
}
\`\`\`

**Returns:** Description of response
```

---

## Implementation Patterns

### Pattern 1: Simple GET Request
```typescript
private async handleGetResource(args: { id: string }) {
  const response = await this.axiosInstance.get(`/resources/${args.id}`);
  return {
    content: [{
      type: "text",
      text: JSON.stringify(response.data, null, 2)
    }]
  };
}
```

### Pattern 2: POST with Body
```typescript
private async handleCreateResource(args: { name: string; data: any }) {
  const response = await this.axiosInstance.post('/resources', {
    name: args.name,
    ...args.data
  });
  return {
    content: [{
      type: "text",
      text: JSON.stringify(response.data, null, 2)
    }]
  };
}
```

### Pattern 3: Pagination
```typescript
private async handleListResources(args: { page?: number; per_page?: number }) {
  const page = args.page || 1;
  const perPage = args.per_page || 20;

  const response = await this.axiosInstance.get('/resources', {
    params: { page, per_page: perPage }
  });

  const hasNextPage = response.data.length === perPage;

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        items: response.data,
        page,
        hasNextPage,
        nextPageHint: hasNextPage ? `Use page=${page + 1}` : null
      }, null, 2)
    }]
  };
}
```

---

## Output

**Files Modified:**
- `src/index.ts` - Tool definitions and handlers added
- `src/types.ts` - Type definitions created
- `README.md` - Tools documented

**Summary Report:**
- Total tools implemented: X
- GET endpoints: X
- POST endpoints: X
- PUT endpoints: X
- DELETE endpoints: X
- Build status: ✅ Success

**Next Steps:**
- Use `/test-mcp-server {service-name}` to test implementation
- Or manually test with MCP Inspector

---

## Error Handling

- If endpoint data invalid, report specific issues
- If TypeScript errors, provide detailed error messages
- If build fails, show compilation errors
- Save progress even if some tools fail to implement

---

## Notes

- Generate all tools at once for consistency
- Follow naming conventions strictly
- Include comprehensive error handling
- Document all tools in README
- Test build after implementation
