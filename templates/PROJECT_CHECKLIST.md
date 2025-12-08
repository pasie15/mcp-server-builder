# MCP Server Project Checklist

**Project Name:** mcp-server-{service-name}
**Service:** {Service Name}
**API Documentation:** {URL}
**Started:** {Date}
**Status:** 🔨 In Progress / ✅ Complete

---

## Phase 1: Research & Planning

- [ ] API documentation URL identified
- [ ] Authentication method understood (API key / OAuth / Bearer)
- [ ] Rate limits documented
- [ ] Base URL identified
- [ ] Total endpoints counted: _____
- [ ] Special requirements noted (webhooks, file uploads, etc.)

---

## Phase 2: Documentation Scraping

- [ ] Documentation scraped using appropriate tool:
  - [ ] Single page scrape
  - [ ] Multi-page crawl
  - [ ] Structured extraction
- [ ] All API endpoints identified
- [ ] Endpoint data saved to: `data/{service-name}-endpoints.json`
- [ ] Request/response schemas documented
- [ ] Authentication details extracted
- [ ] Common parameters identified

---

## Phase 3: Project Setup

- [ ] Project directory created: `mcp-server-{service-name}/`
- [ ] npm initialized: `npm init -y`
- [ ] Dependencies installed:
  - [ ] `@modelcontextprotocol/sdk`
  - [ ] `axios`
- [ ] Dev dependencies installed:
  - [ ] `typescript`
  - [ ] `@types/node`
- [ ] Directory structure created:
  - [ ] `src/`
  - [ ] `src/tools/`
- [ ] Files created:
  - [ ] `src/index.ts`
  - [ ] `src/types.ts`
  - [ ] `package.json`
  - [ ] `tsconfig.json`
  - [ ] `README.md`
  - [ ] `.gitignore`
  - [ ] `LICENSE`

---

## Phase 4: Implementation

### Core Server
- [ ] Server initialization code written
- [ ] Axios instance configured with:
  - [ ] Base URL
  - [ ] Authentication headers
  - [ ] Timeout settings
- [ ] ListToolsRequestSchema handler implemented
- [ ] CallToolRequestSchema handler implemented
- [ ] Error handling implemented
- [ ] Tool switch statement created

### Tools Implementation

**Progress:** ___ / ___ tools completed

| Tool Name | Status | Notes |
|-----------|--------|-------|
| tool_1    | ⬜     |       |
| tool_2    | ⬜     |       |
| tool_3    | ⬜     |       |

For each tool:
- [ ] Tool definition created with:
  - [ ] name (snake_case)
  - [ ] description
  - [ ] inputSchema with all parameters
  - [ ] required fields marked
- [ ] Handler function implemented
- [ ] API call constructed correctly
- [ ] Response formatting implemented
- [ ] Error handling added

### TypeScript Types
- [ ] Request types defined
- [ ] Response types defined
- [ ] Tool argument types defined
- [ ] Configuration interface created

---

## Phase 5: Testing

### Local Testing
- [ ] TypeScript compilation successful: `npm run build`
- [ ] No compilation errors
- [ ] Built files in `dist/` directory
- [ ] Shebang line present in `dist/index.js`

### MCP Inspector Testing
- [ ] MCP Inspector installed
- [ ] Server tested: `npx @modelcontextprotocol/inspector node dist/index.js`
- [ ] All tools listed correctly
- [ ] Tool parameters validate properly
- [ ] Sample API calls successful

### Tool Testing
For each tool:
- [ ] Parameters validated correctly
- [ ] API authentication works
- [ ] Successful responses formatted properly
- [ ] Error cases handled gracefully
- [ ] Edge cases tested

---

## Phase 6: Documentation

### README.md
- [ ] Title and description
- [ ] Features list
- [ ] Installation instructions:
  - [ ] Via npm
  - [ ] From source
- [ ] Configuration section:
  - [ ] Environment variables documented
  - [ ] Claude Desktop config example
  - [ ] Cline config example
  - [ ] Continue.dev config example
  - [ ] Config file locations for each OS
- [ ] Available tools section:
  - [ ] Each tool documented with:
    - [ ] Description
    - [ ] Parameters
    - [ ] Example usage
- [ ] Development section
- [ ] Authentication section
- [ ] Rate limits section
- [ ] Contributing section
- [ ] License section
- [ ] Links section
- [ ] Support section

### Additional Documentation
- [ ] Inline code comments where needed
- [ ] TypeScript JSDoc comments for complex functions
- [ ] Example configuration files

---

## Phase 7: GitHub Repository

- [ ] Repository created: `mcp-server-{service-name}`
- [ ] Repository description set
- [ ] Repository public
- [ ] All files pushed to repository:
  - [ ] Source code (`src/`)
  - [ ] `package.json`
  - [ ] `tsconfig.json`
  - [ ] `README.md`
  - [ ] `.gitignore`
  - [ ] `LICENSE`
- [ ] GitHub repository URL: ________________

---

## Phase 8: NPM Publishing

### Pre-Publish
- [ ] npm authentication verified: `npm whoami`
- [ ] Package name available (or scoped)
- [ ] Version set to 1.0.0
- [ ] package.json metadata complete:
  - [ ] name
  - [ ] version
  - [ ] description
  - [ ] main: "dist/index.js"
  - [ ] bin configuration
  - [ ] keywords (mcp, model-context-protocol, etc.)
  - [ ] author
  - [ ] license
  - [ ] repository
  - [ ] homepage
  - [ ] bugs
- [ ] Final build: `npm run build`
- [ ] Dry run: `npm pack --dry-run`

### Publishing
- [ ] Published: `npm publish --access public`
- [ ] Verified on npmjs.com
- [ ] Installation tested: `npm install -g mcp-server-{service-name}`
- [ ] npm package URL: ________________

### Post-Publish
- [ ] README updated with npm badge
- [ ] GitHub repository updated with npm link
- [ ] Changes pushed to GitHub

---

## Phase 9: Integration Testing

### Claude Desktop
- [ ] Configuration added to `claude_desktop_config.json`
- [ ] Claude Desktop restarted
- [ ] Server shows up in Claude
- [ ] Tools accessible in Claude
- [ ] Sample queries tested

### Other Clients (Optional)
- [ ] Cline tested
- [ ] Continue.dev tested
- [ ] Custom MCP client tested

---

## Phase 10: Release

- [ ] GitHub release created (v1.0.0)
- [ ] Release notes written
- [ ] Community announcement drafted
- [ ] Project marked as complete

---

## Post-Release Maintenance

- [ ] Monitor GitHub issues
- [ ] Monitor npm package usage
- [ ] Plan for updates as API changes
- [ ] Consider additional features:
  - [ ] Response caching
  - [ ] Better pagination support
  - [ ] Webhook resources
  - [ ] Additional error handling

---

## Quality Metrics

- **Total Endpoints Implemented:** ___ / ___
- **Test Coverage:** All critical paths tested ✅ / ⬜
- **Documentation Quality:** Comprehensive ✅ / ⬜
- **Error Handling:** Complete ✅ / ⬜
- **TypeScript Types:** Fully typed ✅ / ⬜

---

## Notes & Issues

{Add any notes, issues encountered, or decisions made during development}

---

## Links

- **API Documentation:**
- **GitHub Repository:**
- **npm Package:**
- **Project Start Date:**
- **Project End Date:**
- **Time Spent:**

---

**Status Legend:**
- ⬜ Not started
- 🔨 In progress
- ✅ Complete
- ❌ Blocked/Issue
