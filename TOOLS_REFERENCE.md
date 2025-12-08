# Web Scraping Tools Reference

This guide helps you choose the right tool for scraping API documentation when building MCP servers.

## Available Tools Overview

| Tool | Best For | Speed | Complexity | JavaScript Support |
|------|----------|-------|------------|-------------------|
| `mcp__fetch__fetch` | Simple static pages | ⚡⚡⚡ | Low | ❌ |
| `mcp__hyperbrowserAI__scrape_webpage` | Single complex pages | ⚡⚡ | Medium | ✅ |
| `mcp__hyperbrowserAI__crawl_webpages` | Multi-page sites | ⚡ | Medium | ✅ |
| `mcp__hyperbrowserAI__extract_structured_data` | Structured extraction | ⚡⚡ | High | ✅ |

---

## Tool #1: mcp__fetch__fetch

### Description
Fetches a URL and converts HTML to markdown. No JavaScript rendering. Fast and simple.

### When to Use
- API documentation is on a single static HTML page
- No JavaScript required to view content
- Simple documentation sites
- Quick initial exploration

### When NOT to Use
- Documentation requires JavaScript to load
- Content is dynamically loaded
- Need to navigate multiple pages
- Need structured data extraction

### Parameters
```typescript
{
  url: string;              // URL to fetch
  max_length?: number;      // Max chars to return (default: 5000)
  start_index?: number;     // Start position for pagination
  raw?: boolean;            // Return raw HTML instead of markdown
}
```

### Example Usage
```typescript
// Fetch simple API docs
{
  url: "https://api-docs.example.com/reference",
  max_length: 10000
}
```

### Output Format
- Returns markdown-formatted content
- Preserves headings, lists, links, code blocks
- No images or screenshots

### Pros
- ⚡ Very fast
- 💰 Free/low cost
- 📝 Clean markdown output
- 🎯 Simple to use

### Cons
- ❌ No JavaScript rendering
- ❌ Single page only
- ❌ No structured extraction
- ❌ Limited to static content

---

## Tool #2: mcp__hyperbrowserAI__scrape_webpage

### Description
Scrapes a single webpage with full JavaScript rendering. Returns content in various formats.

### When to Use
- Documentation on a single page with JavaScript
- Need screenshots of documentation
- Want to extract all links from a page
- Documentation has interactive elements

### When NOT to Use
- Need to crawl multiple pages
- Need structured data extraction with schema
- Simple static pages (use fetch instead)

### Parameters
```typescript
{
  url: string;                    // URL to scrape
  outputFormat: string[];         // ["markdown" | "html" | "links" | "screenshot"]
  sessionOptions?: {
    useProxy?: boolean;           // Use proxy (default: false)
    useStealth?: boolean;         // Stealth mode (default: false)
    solveCaptchas?: boolean;      // Solve captchas (default: false)
    acceptCookies?: boolean;      // Accept cookies (default: false)
  }
}
```

### Example Usage
```typescript
// Scrape single-page API docs with JavaScript
{
  url: "https://modern-api-docs.example.com",
  outputFormat: ["markdown", "links"]
}

// Get screenshots of documentation
{
  url: "https://api-docs.example.com",
  outputFormat: ["screenshot", "markdown"]
}
```

### Output Formats

#### markdown
- Clean text representation
- Preserves structure
- Good for AI processing

#### html
- Raw HTML content
- Useful for custom parsing
- Includes all tags and attributes

#### links
- All hyperlinks found on page
- Useful for discovering related pages
- Helps map documentation structure

#### screenshot
- Visual representation
- Useful for UI-heavy docs
- Can see layouts and diagrams

### Pros
- ✅ JavaScript rendering
- 📸 Can capture screenshots
- 🔗 Extracts links
- 🎨 Handles dynamic content

### Cons
- 💰 May have costs
- 🐌 Slower than fetch
- 📄 Single page only
- 🎯 No structured extraction

---

## Tool #3: mcp__hyperbrowserAI__crawl_webpages

### Description
Crawls a website starting from a URL, following links to gather content from multiple pages.

### When to Use
- API documentation spans multiple pages
- Need to gather all documentation pages
- Documentation has separate pages per endpoint
- Want comprehensive site scraping

### When NOT to Use
- Documentation is on a single page
- Need precise structured data extraction
- Have specific pages to scrape (use scrape_webpage multiple times)

### Parameters
```typescript
{
  url: string;                    // Starting URL
  followLinks: boolean;           // Whether to follow links
  maxPages: number;               // Max pages to crawl (1-100)
  outputFormat: string[];         // Output formats
  ignoreSitemap?: boolean;        // Ignore sitemap (default: false)
  sessionOptions?: {              // Same as scrape_webpage
    useProxy?: boolean;
    useStealth?: boolean;
    solveCaptchas?: boolean;
    acceptCookies?: boolean;
  }
}
```

### Example Usage
```typescript
// Crawl multi-page API documentation
{
  url: "https://api-docs.example.com",
  followLinks: true,
  maxPages: 50,
  outputFormat: ["markdown", "links"]
}

// Limited crawl for exploration
{
  url: "https://api-docs.example.com",
  followLinks: true,
  maxPages: 10,
  outputFormat: ["markdown"]
}
```

### Crawling Behavior
- Starts at the provided URL
- Follows links found on each page
- Respects `maxPages` limit
- Can use sitemap if available
- Returns combined results from all pages

### Pros
- 📚 Gathers multiple pages
- 🔗 Follows navigation automatically
- 📖 Comprehensive coverage
- 🗺️ Can use sitemaps

### Cons
- 💰 Higher cost (multiple pages)
- 🐌 Slower (multiple requests)
- 🎯 No structured extraction
- ⚠️ May gather irrelevant pages

---

## Tool #4: mcp__hyperbrowserAI__extract_structured_data

### Description
Extracts structured data from webpages using a JSON schema. Returns data in specified format.

### When to Use
- **THIS IS THE PRIMARY TOOL FOR ENDPOINT EXTRACTION**
- Need structured API endpoint data
- Want to extract specific fields
- Need consistent data format
- Building tools from documentation

### When NOT to Use
- Just want to read documentation
- Don't need structured output
- Exploring documentation structure

### Parameters
```typescript
{
  urls: string[];                 // Array of URLs to extract from
  prompt: string;                 // What to extract
  schema?: object;                // JSON schema for output
  sessionOptions?: {
    useProxy?: boolean;
    useStealth?: boolean;
    solveCaptchas?: boolean;
    acceptCookies?: boolean;
  }
}
```

### Example Usage

#### Extract API Endpoints
```typescript
{
  urls: ["https://api-docs.example.com/reference"],
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
                  location: { type: "string" }
                }
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

#### Extract Authentication Info
```typescript
{
  urls: ["https://api-docs.example.com/auth"],
  prompt: "Extract authentication requirements including auth type, where to send credentials, and any special headers needed",
  schema: {
    type: "object",
    properties: {
      authenticationType: { type: "string" },
      headerName: { type: "string" },
      headerFormat: { type: "string" },
      example: { type: "string" }
    }
  }
}
```

### Schema Design Tips

1. **Be Specific**: Define exact properties needed
2. **Use Arrays**: For multiple items (endpoints, parameters)
3. **Nested Objects**: For complex structures (request bodies, responses)
4. **Required Fields**: Mark critical fields in schema
5. **Descriptions**: Help AI understand what to extract

### Pros
- 🎯 Precise data extraction
- 📊 Structured output
- 🔧 JSON Schema validation
- 🤖 AI-powered extraction
- ⚡ Best for building tools

### Cons
- 💰 May have costs
- 🧠 Requires schema design
- 🎨 Complex setup
- 📝 Needs good prompt

---

## Decision Flow Chart

```
Start: Need to scrape API docs

├─ Is it a single page?
│  ├─ Yes: Is it static HTML?
│  │  ├─ Yes: Use mcp__fetch__fetch
│  │  └─ No (JS required): Use mcp__hyperbrowserAI__scrape_webpage
│  │
│  └─ No (multiple pages): Do you need structured data?
│     ├─ Yes: Use mcp__hyperbrowserAI__extract_structured_data
│     │      (with multiple URLs or after crawling)
│     └─ No: Use mcp__hyperbrowserAI__crawl_webpages

After initial scraping, ALWAYS use:
└─ mcp__hyperbrowserAI__extract_structured_data
   (to extract structured endpoint data for tool creation)
```

---

## Recommended Workflow

### Step 1: Exploration
**Goal**: Understand documentation structure

**Use**: `mcp__fetch__fetch` or `mcp__hyperbrowserAI__scrape_webpage`

```typescript
// Quick look at docs
{
  url: "https://api-docs.example.com",
  max_length: 5000
}
```

### Step 2: Complete Gathering
**Goal**: Get all documentation pages

**Single Page**: Use `scrape_webpage`
```typescript
{
  url: "https://api-docs.example.com",
  outputFormat: ["markdown"]
}
```

**Multiple Pages**: Use `crawl_webpages`
```typescript
{
  url: "https://api-docs.example.com",
  followLinks: true,
  maxPages: 50,
  outputFormat: ["markdown", "links"]
}
```

### Step 3: Structured Extraction (CRITICAL)
**Goal**: Extract API endpoints in structured format

**Use**: `extract_structured_data` with endpoint schema

```typescript
{
  urls: ["https://api-docs.example.com/reference"],
  prompt: "Extract all API endpoints with complete details",
  schema: {
    // Use templates/endpoint-extraction-schema.json
  }
}
```

### Step 4: Validation
**Goal**: Ensure all endpoints captured

- Review extracted data
- Check for missing endpoints
- Verify parameter details
- Confirm response schemas

---

## Cost Considerations

### Free/Low Cost
- `mcp__fetch__fetch` - Free, no limits
- Simple static pages - Use fetch

### Medium Cost
- `mcp__hyperbrowserAI__scrape_webpage` - Per page
- Single complex pages - Worth the cost

### Higher Cost
- `mcp__hyperbrowserAI__crawl_webpages` - Multiple pages
- `mcp__hyperbrowserAI__extract_structured_data` - AI processing
- Multi-page docs - Invest in comprehensive scraping

### Cost Optimization Tips
1. Use `fetch` first to explore
2. Use `scrape_webpage` for JS-heavy single pages
3. Use `crawl_webpages` with appropriate `maxPages`
4. Use `extract_structured_data` only on relevant pages
5. Save extracted data to avoid re-scraping

---

## Common Patterns

### Pattern 1: Simple Static Docs
```
fetch → extract_structured_data
```

### Pattern 2: Single Complex Page
```
scrape_webpage → extract_structured_data
```

### Pattern 3: Multi-Page Docs
```
crawl_webpages → extract_structured_data (on discovered pages)
```

### Pattern 4: Large Documentation Site
```
1. fetch (explore)
2. scrape_webpage (key pages with links)
3. crawl_webpages (specific sections)
4. extract_structured_data (all API reference pages)
```

---

## Examples by Documentation Type

### REST API with OpenAPI/Swagger
**Best**: `extract_structured_data` on OpenAPI spec endpoint
```typescript
{
  urls: ["https://api.example.com/openapi.json"],
  prompt: "Parse OpenAPI spec and extract all endpoints",
  schema: { /* endpoint schema */ }
}
```

### Multi-Page REST Docs (Stripe-style)
**Best**: `crawl_webpages` then `extract_structured_data`
```typescript
// Step 1: Crawl
{
  url: "https://stripe.com/docs/api",
  followLinks: true,
  maxPages: 30,
  outputFormat: ["markdown", "links"]
}

// Step 2: Extract from discovered pages
{
  urls: [/* all API reference page URLs */],
  prompt: "Extract endpoints...",
  schema: { /* endpoint schema */ }
}
```

### Single-Page REST Docs
**Best**: `scrape_webpage` then `extract_structured_data`
```typescript
// Step 1: Scrape
{
  url: "https://api-docs.example.com",
  outputFormat: ["markdown"]
}

// Step 2: Extract
{
  urls: ["https://api-docs.example.com"],
  prompt: "Extract all endpoints...",
  schema: { /* endpoint schema */ }
}
```

### GraphQL API
**Best**: Introspection query if available, otherwise `extract_structured_data`
```typescript
{
  urls: ["https://graphql-docs.example.com"],
  prompt: "Extract GraphQL queries, mutations, and their arguments",
  schema: {
    type: "object",
    properties: {
      queries: { /* schema */ },
      mutations: { /* schema */ }
    }
  }
}
```

---

## Troubleshooting

### Problem: Content not loading
**Solution**: Use `scrape_webpage` instead of `fetch` (needs JS rendering)

### Problem: Missing some endpoints
**Solution**: Use `crawl_webpages` to discover all pages, then extract

### Problem: Unstructured output
**Solution**: Use `extract_structured_data` with detailed schema

### Problem: Too many irrelevant pages
**Solution**: Reduce `maxPages` or use specific URLs with `extract_structured_data`

### Problem: Incomplete extraction
**Solution**: Refine prompt and schema, or crawl more pages

---

## Best Practices

1. **Start Simple**: Use `fetch` first to explore
2. **Be Specific**: Use targeted URLs when possible
3. **Save Data**: Save extracted data to JSON files
4. **Validate**: Review extracted data before implementing tools
5. **Iterate**: Refine schemas based on results
6. **Document**: Note which tools and URLs worked best

---

## Quick Reference Table

| Scenario | Tool | Parameters |
|----------|------|------------|
| Quick exploration | `fetch` | url, max_length: 5000 |
| Single static page | `fetch` | url, max_length: 10000 |
| Single JS page | `scrape_webpage` | url, outputFormat: ["markdown"] |
| Multiple pages | `crawl_webpages` | url, followLinks: true, maxPages: 50 |
| Extract endpoints | `extract_structured_data` | urls, prompt, schema |
| Get page links | `scrape_webpage` | url, outputFormat: ["links"] |
| Screenshot docs | `scrape_webpage` | url, outputFormat: ["screenshot"] |

---

*Use this reference every time you start scraping API documentation for an MCP server.*
