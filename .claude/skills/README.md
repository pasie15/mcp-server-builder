# MCP Server Builder Skills

This directory contains specialized skills for building Model Context Protocol (MCP) servers from API documentation.

## Available Skills

### 1. `/scrape-api-docs`
**Purpose:** Scrape and extract structured endpoint data from API documentation.

**Usage:** `/scrape-api-docs <api-docs-url> [service-name]`

**What it does:**
- Analyzes API documentation structure
- Chooses optimal scraping strategy
- Extracts structured endpoint data using JSON schema
- Saves extracted data to `data/{service-name}-endpoints.json`
- Provides summary report

**Example:**
```
/scrape-api-docs https://docs.stripe.com/api stripe
```

---

### 2. `/create-mcp-server`
**Purpose:** Create a new MCP server project structure.

**Usage:** `/create-mcp-server <service-name> [endpoints-file]`

**What it does:**
- Creates project in `mcp-servers/mcp-server-{service-name}/`
- Initializes npm project with dependencies
- Copies and customizes templates
- Creates configuration files (package.json, tsconfig.json, etc.)
- Sets up directory structure
- Performs initial build

**Example:**
```
/create-mcp-server stripe
```

---

### 3. `/implement-tools`
**Purpose:** Implement MCP tools from extracted endpoint data.

**Usage:** `/implement-tools <service-name>`

**What it does:**
- Generates tool definitions from endpoint data
- Implements tool handlers with proper error handling
- Creates TypeScript type definitions
- Updates README with tool documentation
- Builds and verifies implementation

**Example:**
```
/implement-tools stripe
```

---

### 4. `/test-mcp-server`
**Purpose:** Test MCP server with MCP Inspector.

**Usage:** `/test-mcp-server <service-name>`

**What it does:**
- Builds the project
- Starts MCP Inspector
- Tests all tools with sample data
- Tests error scenarios
- Documents test results
- Identifies and helps fix issues

**Example:**
```
/test-mcp-server stripe
```

---

### 5. `/publish-github`
**Purpose:** Create GitHub repository and publish code.

**Usage:** `/publish-github <service-name> [github-username]`

**What it does:**
- Creates public GitHub repository
- Prepares and uploads all project files
- Creates v1.0.0 release
- Adds repository topics
- Verifies repository setup

**Example:**
```
/publish-github stripe yourusername
```

---

### 6. `/publish-npm`
**Purpose:** Publish MCP server package to npm.

**Usage:** `/publish-npm <service-name>`

**What it does:**
- Verifies npm authentication
- Checks package name availability
- Builds and validates package
- Publishes to npm registry
- Tests installation
- Adds npm badge to README

**Example:**
```
/publish-npm stripe
```

---

### 7. `/build-mcp-server`
**Purpose:** Complete end-to-end MCP server creation (orchestrates all other skills).

**Usage:** `/build-mcp-server <api-docs-url> <service-name> [github-username]`

**What it does:**
- Executes all phases in sequence
- Scrapes documentation
- Creates project
- Implements tools
- Tests implementation
- Publishes to GitHub
- Publishes to npm
- Provides comprehensive final report

**Example:**
```
/build-mcp-server https://docs.stripe.com/api stripe yourusername
```

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  MCP Server Creation Flow                    │
└─────────────────────────────────────────────────────────────┘

1. /scrape-api-docs
   └─ Extracts API endpoint data

2. /create-mcp-server
   └─ Sets up project structure

3. /implement-tools
   └─ Generates MCP tools from endpoint data

4. /test-mcp-server
   └─ Tests with MCP Inspector

5. /publish-github
   └─ Creates GitHub repository

6. /publish-npm
   └─ Publishes to npm registry

OR use /build-mcp-server to run all steps automatically!
```

---

## Skill Dependencies

### Prerequisites for All Skills
- Node.js v18+
- npm or yarn
- Git installed

### Additional Prerequisites by Skill

**`/publish-github`:**
- `GITHUB_TOKEN` environment variable
- GitHub account

**`/publish-npm`:**
- `NPM_TOKEN` environment variable OR `npm login`
- npm account

**`/build-mcp-server`:**
- All of the above

---

## Example: Complete Workflow

### Building a Stripe MCP Server

```bash
# Option 1: Automated (all-in-one)
/build-mcp-server https://docs.stripe.com/api stripe yourusername

# Option 2: Step-by-step
/scrape-api-docs https://docs.stripe.com/api stripe
/create-mcp-server stripe
/implement-tools stripe
/test-mcp-server stripe
/publish-github stripe yourusername
/publish-npm stripe
```

### Result
- ✅ GitHub: `github.com/yourusername/mcp-server-stripe`
- ✅ npm: `npmjs.com/package/mcp-server-stripe`
- ✅ Installable: `npm install -g mcp-server-stripe`
- ✅ Ready to use with Claude Desktop, Cline, Continue.dev, etc.

---

## Time Estimates

| Skill | Time |
|-------|------|
| `/scrape-api-docs` | 5-15 min |
| `/create-mcp-server` | 5 min |
| `/implement-tools` | 30-90 min |
| `/test-mcp-server` | 10 min |
| `/publish-github` | 5 min |
| `/publish-npm` | 5 min |
| **Total** | **1-4 hours** |

*Time varies based on API complexity (number of endpoints)*

---

## Best Practices

1. **Always start with `/scrape-api-docs`** to extract structured data
2. **Use `/test-mcp-server`** before publishing
3. **Review extracted data** before creating project
4. **Test installation** after npm publish
5. **Use `/build-mcp-server`** for new servers (fastest)
6. **Use individual skills** for updates or specific phases

---

## Getting Help

- **Knowledge Base:** See `CLAUDE.md` for comprehensive MCP server knowledge
- **Full Guide:** See `KNOWLEDGEBASE.md` for detailed documentation
- **Quick Start:** See `QUICK_START.md` for streamlined workflow
- **Tools Reference:** See `TOOLS_REFERENCE.md` for web scraping tools
- **Workflow Diagram:** See `WORKFLOW.md` for visual workflow

---

## Notes

- All skills are designed to work together
- Each skill can be used independently
- Skills maintain state via project files
- Progress tracked in `PROJECT_CHECKLIST.md`
- All projects created in `mcp-servers/` directory
- Skills handle errors gracefully with recovery options

---

*These skills enable rapid creation of high-quality MCP servers from any API documentation.*
