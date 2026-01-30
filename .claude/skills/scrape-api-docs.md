# Scrape API Documentation

**Description:** Scrape and extract structured endpoint data from API documentation.

**Usage:** `/scrape-api-docs <api-docs-url> [service-name]`

**Examples:**
- `/scrape-api-docs https://docs.stripe.com/api stripe`
- `/scrape-api-docs https://api.github.com/docs`

---

## Workflow

This skill handles Phase 1 of MCP server creation: scraping API documentation and extracting structured endpoint data.

### Step 1: Analyze Documentation Structure

First, do a quick exploration to understand the documentation:

```typescript
// Use mcp__fetch__fetch for quick analysis
{
  url: "<api-docs-url>",
  max_length: 5000
}
```

Determine:
- Is it single page or multi-page?
- Does it require JavaScript rendering?
- What's the authentication method?
- What's the base API URL?

### Step 2: Choose Scraping Strategy

**Decision Tree:**
- Single static page → Use `mcp__fetch__fetch`
- Single JS page → Use `mcp__hyperbrowserAI__scrape_webpage`
- Multiple pages → Use `mcp__hyperbrowserAI__crawl_webpages`

**For Multi-Page Documentation:**
```typescript
{
  url: "<api-docs-url>",
  followLinks: true,
  maxPages: 50,
  outputFormat: ["markdown", "links"]
}
```

### Step 3: Extract Structured Endpoint Data

**THIS IS THE CRITICAL STEP** - Always use `extract_structured_data`:

```typescript
{
  urls: ["<api-reference-url>"],
  prompt: "Extract all API endpoints including method, path, parameters with their types and requirements, request body schema, and response schemas",
  schema: {
    type: "object",
    properties: {
      serviceName: { type: "string" },
      baseUrl: { type: "string" },
      authentication: {
        type: "object",
        properties: {
          type: { type: "string" },
          location: { type: "string" },
          parameterName: { type: "string" }
        }
      },
      endpoints: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            displayName: { type: "string" },
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
                  location: { type: "string" }
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
              type: "object"
            }
          }
        }
      }
    }
  }
}
```

### Step 4: Save Extracted Data

Save the extracted endpoint data to a file:
- If service-name provided: `data/{service-name}-endpoints.json`
- Otherwise: `data/endpoints-{timestamp}.json`

### Step 5: Validate & Report

Review the extracted data:
- Count of endpoints found
- Authentication method identified
- Base URL identified
- Any missing or incomplete data

Provide a summary report to the user with:
- Number of endpoints extracted
- Authentication details
- Base URL
- Recommended next steps

---

## Output

The skill saves extracted data and provides:

1. **File Created:** `data/{service-name}-endpoints.json`
2. **Summary Report:**
   - Total endpoints: X
   - Authentication: [type]
   - Base URL: [url]
   - Status: Ready for MCP server creation

3. **Next Steps:**
   - Use `/create-mcp-server {service-name}` to create the project
   - Or manually create using the saved endpoint data

---

## Error Handling

- If scraping fails, try alternative scraping tool
- If extraction incomplete, refine schema and retry
- If multiple pages, ensure all relevant pages crawled
- Save partial data if full extraction fails

---

## Notes

- Always save extracted data before proceeding
- Validate that critical fields (method, path, parameters) are present
- Check for pagination in API docs that might indicate more endpoints
- Document any manual adjustments needed in the saved file
