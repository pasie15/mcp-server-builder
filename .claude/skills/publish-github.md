# Publish to GitHub

**Description:** Create GitHub repository and publish MCP server code.

**Usage:** `/publish-github <service-name> [github-username]`

**Examples:**
- `/publish-github stripe yourusername`
- `/publish-github github`

---

## Workflow

This skill handles Phase 7 of MCP server creation: GitHub repository setup and publishing.

### Step 1: Verify Prerequisites

Check that:
- [ ] MCP server project exists in `mcp-servers/mcp-server-{service-name}`
- [ ] Project builds successfully
- [ ] All tests pass
- [ ] README.md is complete
- [ ] LICENSE file exists
- [ ] .gitignore exists

### Step 2: Create GitHub Repository

Use the GitHub MCP tool:

```typescript
mcp__github__create_repository({
  name: "mcp-server-{service-name}",
  description: "MCP server for {Service Name} API - Model Context Protocol implementation",
  private: false,
  autoInit: true
})
```

**Naming Convention:**
- Repository name: `mcp-server-{service-name}`
- Always public (not private)
- Include clear description

Save the repository URL for later steps.

### Step 3: Prepare Files for Upload

Navigate to project:
```bash
cd mcp-servers/mcp-server-{service-name}
```

Collect all files to upload:
- `src/index.ts`
- `src/types.ts` (if exists)
- `src/tools/*.ts` (if exists)
- `package.json`
- `tsconfig.json`
- `README.md`
- `.gitignore`
- `LICENSE`
- `PROJECT_INFO.md` (optional)

**DO NOT UPLOAD:**
- `node_modules/`
- `dist/`
- `.env`
- `data/` (may contain API keys in examples)

### Step 4: Read All Project Files

Read each file to get content:

```typescript
// Read all files
const files = [
  'src/index.ts',
  'src/types.ts',
  'package.json',
  'tsconfig.json',
  'README.md',
  '.gitignore',
  'LICENSE'
];

// Also read any files in src/tools/
```

### Step 5: Push Files to GitHub

Use `mcp__github__push_files`:

```typescript
{
  owner: "{github-username}",
  repo: "mcp-server-{service-name}",
  branch: "main",
  message: "Initial commit: MCP server implementation for {Service Name} API

Complete MCP server with {X} tools implementing the {Service Name} API.

Features:
- {X} API endpoints as MCP tools
- Secure API key authentication
- Full TypeScript support
- Comprehensive error handling
- Complete documentation

Built with @modelcontextprotocol/sdk

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>",
  files: [
    {
      path: "src/index.ts",
      content: "..." // file content
    },
    {
      path: "package.json",
      content: "..." // file content
    },
    // ... all files
  ]
}
```

### Step 6: Verify Repository

1. **Visit Repository URL:**
   - Check all files uploaded
   - Verify README displays correctly
   - Check folder structure correct

2. **Verify README Rendering:**
   - Installation instructions clear
   - Code blocks formatted correctly
   - Configuration examples visible
   - Links work

3. **Check Repository Settings:**
   - Description set
   - Topics/tags added (if possible)
   - License recognized

### Step 7: Add Repository Topics

If possible, add topics to repository:
- `mcp`
- `model-context-protocol`
- `{service-name}`
- `ai`
- `llm`
- `claude`
- `typescript`
- `nodejs`

### Step 8: Create GitHub Release

Create v1.0.0 release:

**Release Title:** `v1.0.0 - Initial Release`

**Release Notes:**
```markdown
# MCP Server for {Service Name} v1.0.0

Initial release of the MCP server for the {Service Name} API.

## Features

- ✅ {X} API endpoints implemented as MCP tools
- ✅ Secure API key authentication
- ✅ Full TypeScript support
- ✅ Comprehensive error handling
- ✅ Complete documentation and examples

## Installation

\`\`\`bash
npm install -g mcp-server-{service-name}
\`\`\`

## Configuration

See [README.md](README.md) for complete configuration instructions for:
- Claude Desktop
- Cline
- Continue.dev
- Other MCP clients

## Available Tools

{List all tool names}

## Documentation

- Full API documentation: [link to API docs]
- MCP Protocol: https://modelcontextprotocol.io
- GitHub Repository: [repo URL]

## Links

- npm Package: https://www.npmjs.com/package/mcp-server-{service-name}
- Report Issues: [repo URL]/issues

---

Built with [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
```

### Step 9: Update PROJECT_INFO.md

Add GitHub information:

```markdown
## Repository Information

- **GitHub URL:** https://github.com/{username}/mcp-server-{service-name}
- **Clone URL:** git@github.com:{username}/mcp-server-{service-name}.git
- **Created:** {date}
- **Latest Release:** v1.0.0
- **Stars:** 0
- **Forks:** 0

## Publishing Information

- **Published to GitHub:** ✅ {date}
- **Initial Commit:** {commit-hash}
- **Release v1.0.0:** ✅ {date}
```

---

## Output

**Success Report:**

```
GitHub Repository Published Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repository: mcp-server-{service-name}
URL: https://github.com/{username}/mcp-server-{service-name}
Status: ✅ Public

Files Uploaded:
  ✅ src/index.ts
  ✅ src/types.ts
  ✅ package.json
  ✅ tsconfig.json
  ✅ README.md
  ✅ .gitignore
  ✅ LICENSE

Repository Setup:
  ✅ Description set
  ✅ License recognized (MIT)
  ✅ README rendering correctly
  ✅ Topics/tags added

Release:
  ✅ v1.0.0 created
  ✅ Release notes published

Next Steps:
  - Use /publish-npm {service-name} to publish to npm
  - Or manually publish: cd mcp-servers/mcp-server-{service-name} && npm publish
```

---

## Commit Message Template

**Good Commit Messages:**

**Initial Commit:**
```
Initial commit: MCP server implementation for {Service Name} API

Complete MCP server with {X} tools implementing the {Service Name} API.

Features:
- {X} API endpoints as MCP tools
- Secure API key authentication
- Full TypeScript support
- Comprehensive error handling
- Complete documentation

Built with @modelcontextprotocol/sdk

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Bug Fix:**
```
Fix: Correct authentication header format

Fixed issue where API key was not being properly formatted in
Authorization header, causing 401 errors.

Closes #1

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Feature Addition:**
```
Add pagination support to list endpoints

Added pagination parameters (page, per_page) to all list endpoints
and included pagination metadata in responses.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Error Handling

### Repository Creation Fails
- **Problem:** Name already taken
- **Solution:** Choose alternative name (e.g., add suffix)

### Push Files Fails
- **Problem:** Authentication error
- **Solution:** Verify GITHUB_TOKEN environment variable

### README Not Rendering
- **Problem:** Markdown syntax errors
- **Solution:** Validate markdown, fix syntax errors

### Files Missing
- **Problem:** Some files not uploaded
- **Solution:** Retry with complete file list

---

## Best Practices

1. **Always use descriptive commit messages**
2. **Always include Co-Authored-By line**
3. **Always create release for v1.0.0**
4. **Always verify repository before announcing**
5. **Always add appropriate topics/tags**
6. **Always ensure README renders correctly**
7. **Always include LICENSE file**
8. **Always exclude sensitive files (.env)**

---

## Notes

- Repository name must match npm package name
- Use public repositories for MCP servers
- Include clear description
- Add relevant topics for discoverability
- Create release immediately after first push
- Verify all links in README work
- Check repository from user perspective
