# MCP Server Creation Workflow

Visual workflow diagram for creating MCP servers from API documentation.

## Complete Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   START: API Documentation URL                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: DOCUMENTATION SCRAPING               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: Analyze Documentation                                   │
│  ├─ Visit API documentation URL                                  │
│  ├─ Determine structure (single page / multi-page)              │
│  ├─ Identify authentication method                              │
│  └─ Note rate limits and base URL                               │
│                                                                  │
│  Step 2: Choose Scraping Tool                                    │
│  ├─ Single static page → use mcp__fetch__fetch                  │
│  ├─ Single JS page → use mcp__hyperbrowserAI__scrape_webpage    │
│  └─ Multiple pages → use mcp__hyperbrowserAI__crawl_webpages    │
│                                                                  │
│  Step 3: Execute Scraping                                        │
│  ├─ Scrape all documentation pages                              │
│  ├─ Extract page links and structure                            │
│  └─ Save raw documentation content                              │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PHASE 2: STRUCTURED EXTRACTION                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 4: Extract Endpoints                                       │
│  ├─ Use mcp__hyperbrowserAI__extract_structured_data            │
│  ├─ Apply endpoint extraction JSON schema                       │
│  └─ Target all API reference pages                              │
│                                                                  │
│  Step 5: Process Extracted Data                                  │
│  ├─ Review all endpoints found                                   │
│  ├─ Validate parameter definitions                              │
│  ├─ Check response schemas                                       │
│  └─ Save to data/{service-name}-endpoints.json                  │
│                                                                  │
│  Step 6: Design Tool Mapping                                     │
│  ├─ Map each endpoint to MCP tool                               │
│  ├─ Define tool names (snake_case)                              │
│  ├─ Plan input schemas                                           │
│  └─ Plan response formatting                                     │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: PROJECT SETUP                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 7: Initialize Project                                      │
│  ├─ mkdir mcp-server-{service-name}                             │
│  ├─ npm init -y                                                  │
│  ├─ Install dependencies:                                        │
│  │   ├─ @modelcontextprotocol/sdk                               │
│  │   ├─ axios                                                    │
│  │   ├─ typescript (dev)                                        │
│  │   └─ @types/node (dev)                                       │
│  └─ Create directory structure                                   │
│                                                                  │
│  Step 8: Create Configuration Files                              │
│  ├─ package.json (with bin configuration)                       │
│  ├─ tsconfig.json (Node16 module)                               │
│  ├─ .gitignore                                                   │
│  └─ LICENSE (MIT recommended)                                    │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PHASE 4: IMPLEMENTATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 9: Create Server Foundation                                │
│  ├─ Copy templates/server-template.ts to src/index.ts           │
│  ├─ Replace placeholders:                                        │
│  │   ├─ {SERVICE_NAME}                                          │
│  │   ├─ {service-name}                                          │
│  │   ├─ {SERVICE}                                               │
│  │   └─ {BASE_URL}                                              │
│  └─ Configure authentication                                     │
│                                                                  │
│  Step 10: Implement Tool Definitions                             │
│  ├─ For each endpoint in extracted data:                        │
│  │   ├─ Create tool definition object                           │
│  │   ├─ Define name (snake_case)                                │
│  │   ├─ Write clear description                                 │
│  │   ├─ Build inputSchema from parameters                       │
│  │   └─ Mark required fields                                    │
│  └─ Add all tools to TOOLS array                                │
│                                                                  │
│  Step 11: Implement Tool Handlers                                │
│  ├─ For each tool:                                               │
│  │   ├─ Create handler method                                   │
│  │   ├─ Validate required parameters                            │
│  │   ├─ Build API request                                       │
│  │   ├─ Handle response                                         │
│  │   ├─ Format output                                           │
│  │   └─ Add error handling                                      │
│  └─ Add case to switch statement                                │
│                                                                  │
│  Step 12: Add Type Definitions (src/types.ts)                   │
│  ├─ Define request types                                         │
│  ├─ Define response types                                        │
│  ├─ Define tool argument types                                   │
│  └─ Export all types                                             │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 5: TESTING                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 13: Build Project                                          │
│  ├─ Run: npm run build                                           │
│  ├─ Check for TypeScript errors                                 │
│  ├─ Verify dist/ directory created                              │
│  └─ Verify shebang in dist/index.js                             │
│                                                                  │
│  Step 14: Test with MCP Inspector                                │
│  ├─ Run: npx @modelcontextprotocol/inspector \                  │
│  │        node dist/index.js                                    │
│  ├─ Verify all tools listed                                      │
│  ├─ Test each tool with sample data                             │
│  ├─ Verify API calls succeed                                     │
│  └─ Check response formatting                                    │
│                                                                  │
│  Step 15: Fix Issues                                             │
│  ├─ Debug any failing tools                                      │
│  ├─ Improve error messages                                       │
│  ├─ Adjust response formatting                                   │
│  └─ Rebuild and retest                                           │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 6: DOCUMENTATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 16: Write README.md                                        │
│  ├─ Project title and description                               │
│  ├─ Features list                                                │
│  ├─ Installation instructions                                    │
│  ├─ Configuration section:                                       │
│  │   ├─ Environment variables                                   │
│  │   ├─ Claude Desktop config                                   │
│  │   ├─ Cline config                                            │
│  │   ├─ Continue.dev config                                     │
│  │   └─ Config file locations                                   │
│  ├─ Available tools section:                                     │
│  │   └─ Each tool with parameters and examples                  │
│  ├─ Development section                                          │
│  ├─ Authentication section                                       │
│  ├─ Rate limits section                                          │
│  ├─ Contributing guidelines                                      │
│  ├─ License information                                          │
│  └─ Links and support                                            │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PHASE 7: GITHUB REPOSITORY                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 17: Create GitHub Repository                               │
│  ├─ Use: mcp__github__create_repository                         │
│  ├─ Name: mcp-server-{service-name}                             │
│  ├─ Description: MCP server for {Service Name} API              │
│  └─ Public repository                                            │
│                                                                  │
│  Step 18: Push Code to GitHub                                    │
│  ├─ Use: mcp__github__push_files                                │
│  ├─ Push all project files:                                      │
│  │   ├─ src/                                                     │
│  │   ├─ package.json                                             │
│  │   ├─ tsconfig.json                                            │
│  │   ├─ README.md                                                │
│  │   ├─ .gitignore                                               │
│  │   └─ LICENSE                                                  │
│  └─ Commit message: "Initial commit: MCP server implementation"│
│                                                                  │
│  Step 19: Verify Repository                                      │
│  ├─ Visit repository URL                                         │
│  ├─ Check all files uploaded                                     │
│  ├─ Verify README displays correctly                            │
│  └─ Check repository settings                                    │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PHASE 8: NPM PUBLISHING                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 20: Prepare for Publishing                                 │
│  ├─ Verify npm authentication: npm whoami                       │
│  ├─ Check package name availability                             │
│  ├─ Ensure version is 1.0.0                                     │
│  ├─ Verify package.json metadata complete                       │
│  └─ Final build: npm run build                                  │
│                                                                  │
│  Step 21: Publish to npm                                         │
│  ├─ Dry run: npm pack --dry-run                                 │
│  ├─ Publish: npm publish --access public                        │
│  └─ Note npm package URL                                         │
│                                                                  │
│  Step 22: Verify Publication                                     │
│  ├─ Visit npmjs.com package page                                │
│  ├─ Test installation: npm install -g mcp-server-{service}     │
│  ├─ Test execution: mcp-server-{service} --help                │
│  └─ Uninstall test: npm uninstall -g mcp-server-{service}      │
│                                                                  │
│  Step 23: Update Documentation                                   │
│  ├─ Add npm badge to README                                     │
│  ├─ Add npm link to package.json                                │
│  ├─ Push updates to GitHub                                      │
│  └─ Create GitHub release v1.0.0                                │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PHASE 9: INTEGRATION TESTING                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 24: Test with Claude Desktop                               │
│  ├─ Add to claude_desktop_config.json                           │
│  ├─ Restart Claude Desktop                                      │
│  ├─ Verify server shows up                                       │
│  ├─ Test tools in conversation                                   │
│  └─ Verify API responses                                         │
│                                                                  │
│  Step 25: Test with Other Clients (Optional)                     │
│  ├─ Configure for Cline                                          │
│  ├─ Configure for Continue.dev                                   │
│  └─ Test custom MCP clients                                      │
│                                                                  │
│  Step 26: Document Configuration                                 │
│  ├─ Add working config examples to README                       │
│  ├─ Document any issues encountered                             │
│  └─ Update troubleshooting section                              │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 10: RELEASE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 27: Create Release                                         │
│  ├─ Create GitHub release v1.0.0                                │
│  ├─ Write release notes                                          │
│  ├─ Attach built assets if needed                               │
│  └─ Publish release                                              │
│                                                                  │
│  Step 28: Community Announcement (Optional)                      │
│  ├─ Share on MCP community channels                             │
│  ├─ Post on relevant forums                                      │
│  └─ Update personal project list                                │
│                                                                  │
│  Step 29: Monitor and Maintain                                   │
│  ├─ Watch GitHub issues                                          │
│  ├─ Monitor npm downloads                                        │
│  ├─ Plan updates as API changes                                 │
│  └─ Respond to user feedback                                     │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                           SUCCESS!                               │
│         MCP Server Published and Available to Users              │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Decision Trees

### 1. Which Scraping Tool Should I Use?

```
Is documentation on multiple pages?
├─ YES → Use mcp__hyperbrowserAI__crawl_webpages
│        Set maxPages appropriately (10-100)
│        Get outputFormat: ["markdown", "links"]
│
└─ NO (single page) → Does it need JavaScript?
   ├─ YES → Use mcp__hyperbrowserAI__scrape_webpage
   │        Get outputFormat: ["markdown"]
   │
   └─ NO → Use mcp__fetch__fetch
            Fast and simple

ALWAYS FOLLOW WITH:
└─ Use mcp__hyperbrowserAI__extract_structured_data
   To get structured endpoint data
```

### 2. How Should I Structure Tool Handlers?

```
For each API endpoint:

1. CREATE TOOL DEFINITION
   ├─ name: endpoint_name (snake_case)
   ├─ description: Clear explanation
   └─ inputSchema:
      ├─ type: "object"
      ├─ properties: { param definitions }
      └─ required: [required param names]

2. IMPLEMENT HANDLER METHOD
   ├─ Validate required parameters
   ├─ Build API request (GET/POST/PUT/DELETE)
   ├─ Make API call with this.axiosInstance
   ├─ Handle response
   ├─ Format output (JSON stringify)
   └─ Return MCP tool response format

3. ADD TO SWITCH
   └─ Add case to CallToolRequestSchema handler
```

### 3. Error Handling Priority

```
Check errors in this order:

1. Parameter Validation
   └─ Missing required params → ErrorCode.InvalidParams

2. Authentication
   └─ 401/403 status → ErrorCode.InvalidRequest
      (suggest checking API key)

3. Not Found
   └─ 404 status → ErrorCode.InvalidRequest
      (resource not found)

4. Rate Limiting
   └─ 429 status → ErrorCode.InternalError
      (rate limit exceeded)

5. Bad Request
   └─ 400 status → ErrorCode.InvalidParams
      (invalid request format)

6. Server Errors
   └─ 500+ status → ErrorCode.InternalError
      (server error)

7. Other Errors
   └─ Catch all → ErrorCode.InternalError
```

## Parallel Tasks

These tasks can be done simultaneously to save time:

```
During Implementation:
├─ Write tool handlers
├─ Write README documentation
└─ Create type definitions

During Testing:
├─ Test with MCP Inspector
├─ Write integration tests
└─ Update documentation with findings

During Publishing:
├─ Create GitHub repository
├─ Prepare npm package
└─ Write release notes
```

## Time-Saving Tips

1. **Copy Templates First**
   - Start with templates/server-template.ts
   - Use templates/PROJECT_CHECKLIST.md for tracking
   - Reference templates/endpoint-extraction-schema.json

2. **Batch Similar Operations**
   - Implement all GET endpoints together
   - Implement all POST endpoints together
   - Test all tools at once with MCP Inspector

3. **Automate Repetitive Tasks**
   - Use search/replace for placeholder substitution
   - Generate tool definitions from extracted data
   - Script common testing scenarios

4. **Verify Early and Often**
   - Build after each major change
   - Test tools as you implement them
   - Don't wait until the end to test

5. **Document While Building**
   - Write README sections as you implement features
   - Document issues immediately
   - Update examples with working configurations

## Common Failure Points

### ❌ Failure Point 1: Wrong Scraping Tool
**Problem**: Used fetch on JS-heavy page, got incomplete data
**Solution**: Consult TOOLS_REFERENCE.md, use appropriate tool

### ❌ Failure Point 2: Incomplete Endpoint Data
**Problem**: Missing parameters or response schemas
**Solution**: Review extracted data before implementation

### ❌ Failure Point 3: TypeScript Compilation Errors
**Problem**: Module resolution or import errors
**Solution**: Use .js extensions in imports, check tsconfig.json

### ❌ Failure Point 4: Authentication Not Working
**Problem**: API calls failing with 401
**Solution**: Verify env var names, check header format

### ❌ Failure Point 5: MCP Server Won't Connect
**Problem**: Claude Desktop can't connect to server
**Solution**: Check shebang, file permissions, test with Inspector first

### ❌ Failure Point 6: npm Publish Fails
**Problem**: Package name taken or auth issues
**Solution**: Check name availability, verify npm login

## Success Checklist

Use this final checklist before considering the project complete:

```
✅ All API endpoints extracted and documented
✅ TypeScript compiles with zero errors
✅ All tools tested with MCP Inspector
✅ README has complete setup instructions
✅ README has config examples for all major MCP clients
✅ GitHub repository created and code pushed
✅ npm package published successfully
✅ Package installable via: npm install -g mcp-server-{service}
✅ Tested with at least one MCP client (Claude Desktop)
✅ Error handling works for common scenarios
✅ LICENSE file included (MIT recommended)
✅ .gitignore excludes node_modules and dist
✅ package.json has correct keywords (mcp, model-context-protocol)
✅ GitHub release v1.0.0 created
✅ npm badge added to README
```

## Next Steps After Launch

1. **Monitor Usage**
   - Watch GitHub issues
   - Track npm downloads
   - Gather user feedback

2. **Plan Updates**
   - Monitor API changes
   - Add requested features
   - Improve error handling

3. **Build More Servers**
   - Apply learned patterns
   - Improve templates
   - Share knowledge

---

**Remember**: This workflow is iterative. Don't aim for perfection on the first try. Ship v1.0.0, then improve based on feedback.
