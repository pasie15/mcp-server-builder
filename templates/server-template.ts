#!/usr/bin/env node

/**
 * MCP Server Template
 *
 * Replace placeholders:
 * - {SERVICE_NAME} - Service name in PascalCase (e.g., OpenWeather)
 * - {service-name} - Service name in kebab-case (e.g., open-weather)
 * - {SERVICE} - Service name in UPPERCASE for env vars (e.g., OPENWEATHER)
 * - {BASE_URL} - Default API base URL (e.g., https://api.openweathermap.org)
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios, { AxiosInstance, AxiosError } from "axios";

// ============================================================================
// Configuration
// ============================================================================

interface ServerConfig {
  apiKey?: string;
  baseUrl: string;
  timeout?: number;
}

// ============================================================================
// Tool Definitions
// ============================================================================

const TOOLS = [
  {
    name: "example_tool",
    description: "Example tool description - what it does",
    inputSchema: {
      type: "object",
      properties: {
        exampleParam: {
          type: "string",
          description: "Example parameter description",
        },
        optionalParam: {
          type: "string",
          description: "Optional parameter description",
        },
      },
      required: ["exampleParam"],
    },
  },
  // Add more tool definitions here...
];

// ============================================================================
// Main Server Class
// ============================================================================

class {SERVICE_NAME}MCPServer {
  private server: Server;
  private axiosInstance: AxiosInstance;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;

    // Initialize axios instance with authentication
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey && {
          // Adjust based on API requirements:
          // Bearer token: Authorization: `Bearer ${config.apiKey}`
          // API key header: "X-API-Key": config.apiKey
          // Or custom header name
          Authorization: `Bearer ${config.apiKey}`
        }),
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
          // Add other capabilities if needed:
          // resources: {},
          // prompts: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  /**
   * Set up request handlers for the MCP server
   */
  private setupHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: TOOLS,
      })
    );

    // Handle tool execution
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const { name, arguments: args } = request.params;

        try {
          switch (name) {
            case "example_tool":
              return await this.handleExampleTool(args);

            // Add more tool handlers here...

            default:
              throw new McpError(
                ErrorCode.MethodNotFound,
                `Unknown tool: ${name}`
              );
          }
        } catch (error) {
          if (error instanceof McpError) {
            throw error;
          }

          // Handle axios errors
          if (axios.isAxiosError(error)) {
            throw this.handleAxiosError(error);
          }

          // Handle other errors
          throw new McpError(
            ErrorCode.InternalError,
            `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }
    );

    // Optional: Add resource handlers
    // this.server.setRequestHandler(
    //   ListResourcesRequestSchema,
    //   async () => ({
    //     resources: []
    //   })
    // );

    // Optional: Add prompt handlers
    // this.server.setRequestHandler(
    //   ListPromptsRequestSchema,
    //   async () => ({
    //     prompts: []
    //   })
    // );
  }

  /**
   * Set up global error handling
   */
  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  // ==========================================================================
  // Tool Handlers
  // ==========================================================================

  /**
   * Example tool handler
   */
  private async handleExampleTool(args: any): Promise<any> {
    // Validate required parameters
    if (!args.exampleParam) {
      throw new McpError(
        ErrorCode.InvalidParams,
        "exampleParam is required"
      );
    }

    // Make API request
    const response = await this.axiosInstance.get("/endpoint", {
      params: {
        param: args.exampleParam,
      },
    });

    // Format and return response
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }

  // Add more tool handlers here following the same pattern...

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  /**
   * Make a generic API request with error handling
   */
  private async makeApiRequest(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    endpoint: string,
    data?: any,
    params?: any
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleAxiosError(error);
      }
      throw error;
    }
  }

  /**
   * Handle Axios errors and convert to MCP errors
   */
  private handleAxiosError(error: AxiosError): McpError {
    const status = error.response?.status;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "API request failed";

    if (status === 401 || status === 403) {
      return new McpError(
        ErrorCode.InvalidRequest,
        `Authentication failed: ${message}. Check your API key.`
      );
    }

    if (status === 404) {
      return new McpError(
        ErrorCode.InvalidRequest,
        `Resource not found: ${message}`
      );
    }

    if (status === 429) {
      return new McpError(
        ErrorCode.InternalError,
        `Rate limit exceeded: ${message}`
      );
    }

    if (status === 400) {
      return new McpError(
        ErrorCode.InvalidParams,
        `Invalid request: ${message}`
      );
    }

    if (status && status >= 500) {
      return new McpError(
        ErrorCode.InternalError,
        `Server error: ${message}`
      );
    }

    return new McpError(
      ErrorCode.InternalError,
      `API request failed: ${message}`
    );
  }

  /**
   * Format response as markdown table (useful for array responses)
   */
  private formatAsTable(items: any[]): string {
    if (items.length === 0) {
      return "No items found.";
    }

    const keys = Object.keys(items[0]);
    const header = `| ${keys.join(" | ")} |`;
    const separator = `| ${keys.map(() => "---").join(" | ")} |`;
    const rows = items.map(
      (item) => `| ${keys.map((k) => String(item[k] ?? "")).join(" | ")} |`
    );

    return [header, separator, ...rows].join("\n");
  }

  /**
   * Start the MCP server
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("{SERVICE_NAME} MCP Server running on stdio");
  }
}

// ============================================================================
// Main Execution
// ============================================================================

// Load configuration from environment variables
const config: ServerConfig = {
  apiKey: process.env.{SERVICE}_API_KEY,
  baseUrl: process.env.{SERVICE}_BASE_URL || "{BASE_URL}",
  timeout: process.env.{SERVICE}_TIMEOUT
    ? parseInt(process.env.{SERVICE}_TIMEOUT, 10)
    : 30000,
};

// Validate required configuration
if (!config.apiKey) {
  console.error(
    "Error: {SERVICE}_API_KEY environment variable is required"
  );
  process.exit(1);
}

// Start the server
const server = new {SERVICE_NAME}MCPServer(config);
server.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
