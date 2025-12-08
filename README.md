# MCP Server Builder

A comprehensive knowledgebase and automation toolkit for creating, building, and **publishing** Model Context Protocol (MCP) servers from API documentation to **GitHub** and **npmjs.com**.

## 📚 Overview

This project provides everything you need to systematically build MCP servers from API documentation URLs. **Each MCP server is created as a standalone npm package with TypeScript, automatically published to GitHub and npmjs.com, making it immediately available for the MCP community.**

### 🎯 Complete Publishing Workflow

This toolkit guides you through the **entire lifecycle**:
- **Extract** API endpoints from documentation
- **Build** TypeScript MCP servers with proper structure
- **Publish** to GitHub with comprehensive README
- **Deploy** to npm for easy installation
- **Configure** automated CI/CD with GitHub Actions

## ⚙️ Setup

### Prerequisites

Before building MCP servers, you need:

1. **GitHub Account & Token**
   - Create account at https://github.com
   - Generate token at https://github.com/settings/tokens
   - Required scopes: `repo`, `workflow`

2. **NPM Account & Token**
   - Create account at https://www.npmjs.com
   - Generate token at https://www.npmjs.com/settings/tokens
   - Use "Automation" token type for security

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your tokens
   # GITHUB_TOKEN=your_github_token
   # NPM_TOKEN=your_npm_token
   ```

**⚠️ Important**: Never commit your `.env` file! It's already in `.gitignore`.

## 🎯 Purpose

When you have an API with documentation and want to make it available as an MCP server for use with Claude, Cline, or other MCP clients, this knowledgebase walks you through:

1. **Scraping** API documentation from URLs
2. **Extracting** structured endpoint data
3. **Implementing** MCP servers in TypeScript
4. **Publishing** to GitHub (automated with your tokens)
5. **Deploying** to npm (automated with your tokens)
6. **Configuring** for various MCP clients

## 📖 Documentation

### Main Documents

#### [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md) ⭐
The complete, detailed guide covering:
- Web scraping tools and strategies
- API endpoint extraction techniques
- MCP server implementation patterns
- TypeScript project setup
- GitHub repository creation
- NPM publishing process
- Configuration templates
- Testing and troubleshooting

**Read this first** for comprehensive understanding.

#### [QUICK_START.md](./QUICK_START.md) ⚡
Condensed workflow guide for experienced developers:
- Step-by-step checklist
- Time estimates
- Quick reference commands
- Common issues and solutions

**Use this** when you know the process and need a quick reference.

#### [PUBLISHING.md](./PUBLISHING.md) 📦 **NEW**
Complete guide to publishing MCP servers:
- GitHub repository creation
- NPM package publishing
- Environment token setup
- Automated publishing with GitHub Actions
- Security best practices
- Troubleshooting guide

**Essential reading** for publishing your MCP servers to the community.

#### [TOOLS_REFERENCE.md](./TOOLS_REFERENCE.md) 🔧
Detailed guide to web scraping tools:
- Tool comparison and selection
- When to use each tool
- Parameters and examples
- Decision flowcharts
- Best practices

**Consult this** when choosing scraping strategies.

### Templates

#### [templates/endpoint-extraction-schema.json](./templates/endpoint-extraction-schema.json)
JSON Schema for extracting API endpoints with `extract_structured_data` tool.

**Use this** for structured endpoint extraction.

#### [templates/server-template.ts](./templates/server-template.ts)
Complete TypeScript MCP server template with:
- Server setup and configuration
- Tool definition patterns
- Error handling
- Utility methods
- Best practices

**Copy this** as a starting point for new servers.

#### [templates/PROJECT_CHECKLIST.md](./templates/PROJECT_CHECKLIST.md)
Comprehensive project checklist covering all phases:
- Research and planning
- Documentation scraping
- Project setup
- Implementation
- Testing
- Documentation
- Publishing

**Use this** to track progress on each MCP server project.

#### [templates/PROJECT_INFO.md](./templates/PROJECT_INFO.md)
Project metadata and tracking template:
- Service details and links
- Implementation status
- npm and GitHub URLs
- Tools implemented
- Testing results
- Version history
- Development timeline

**Copy this** to each MCP server project for tracking and documentation.

## 🚀 Quick Start

### Creating Your First MCP Server

1. **Read the knowledgebase**
   ```bash
   # Open and read KNOWLEDGEBASE.md
   ```

2. **Navigate to the mcp-servers directory**
   ```bash
   cd mcp-servers
   ```
   **All MCP servers should be created in the `mcp-servers/` directory!**

3. **Identify API documentation**
   - Find the API documentation URL
   - Note authentication requirements
   - Check rate limits

4. **Scrape documentation**
   - Use tools from TOOLS_REFERENCE.md
   - Extract structured endpoint data
   - Save to `data/endpoints.json` in your project

5. **Create project**
   - Follow KNOWLEDGEBASE.md Section 2: Project Organization
   - Copy templates/server-template.ts
   - Implement tools based on extracted data
   - Build and test

6. **Publish**
   - Create GitHub repository
   - Publish to npm
   - Add configuration examples
   - Update PROJECT_INFO.md

### Example Workflow

```bash
# Start from MCP Server Builder root directory

# 1. Navigate to mcp-servers directory
cd mcp-servers

# 2. Create your project directory
mkdir mcp-server-example-api
cd mcp-server-example-api

# 3. Initialize project
npm init -y
npm install @modelcontextprotocol/sdk axios
npm install -D typescript @types/node

# 4. Create directory structure
mkdir -p src/tools data

# 5. Copy templates
cp ../../templates/server-template.ts src/index.ts
cp ../../templates/PROJECT_CHECKLIST.md ./
cp ../../templates/PROJECT_INFO.md ./

# 6. Scrape API docs and save to data/endpoints.json
# (See TOOLS_REFERENCE.md for tool selection)

# 7. Implement tools (see KNOWLEDGEBASE.md section 3.4-3.6)
# Edit src/index.ts with your endpoints

# 8. Build
npm run build

# 9. Test
npx @modelcontextprotocol/inspector node dist/index.js

# 10. Publish (see KNOWLEDGEBASE.md sections 4 & 5)
```

## 📁 Project Structure

```
MCP Server Builder/
├── README.md                              # This file
├── KNOWLEDGEBASE.md                       # Complete guide ⭐
├── QUICK_START.md                         # Quick reference
├── TOOLS_REFERENCE.md                     # Web scraping tools guide
├── WORKFLOW.md                            # Visual workflow diagrams
├── .gitignore                             # Git ignore rules
├── templates/                             # Reusable templates
│   ├── endpoint-extraction-schema.json    # Extraction schema
│   ├── server-template.ts                 # MCP server template
│   ├── PROJECT_CHECKLIST.md               # Project checklist
│   └── PROJECT_INFO.md                    # Project metadata template
├── data/                                  # Example data
│   └── example-endpoints.json             # Example endpoint data
└── mcp-servers/                           # 🎯 Your MCP server projects go here!
    ├── README.md                          # MCP servers directory guide
    └── mcp-server-{service-name}/         # Individual projects
        ├── src/                           # Source code
        ├── data/                          # Extracted endpoint data
        ├── dist/                          # Build output
        ├── package.json
        ├── tsconfig.json
        ├── README.md
        ├── PROJECT_INFO.md                # Project metadata
        ├── PROJECT_CHECKLIST.md           # Progress tracking
        └── LICENSE
```

## 🎓 Learning Path

### For Beginners

1. Read [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md) thoroughly
2. Review [TOOLS_REFERENCE.md](./TOOLS_REFERENCE.md) to understand scraping
3. Study [templates/server-template.ts](./templates/server-template.ts)
4. Follow [QUICK_START.md](./QUICK_START.md) for your first project
5. Use [templates/PROJECT_CHECKLIST.md](./templates/PROJECT_CHECKLIST.md) to track progress

### For Experienced Developers

1. Skim [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md) for an overview
2. Use [QUICK_START.md](./QUICK_START.md) as your primary reference
3. Consult [TOOLS_REFERENCE.md](./TOOLS_REFERENCE.md) for scraping decisions
4. Copy [templates/server-template.ts](./templates/server-template.ts) and customize

## 🛠️ Tools Required

### Development Tools
- Node.js v18 or higher
- npm or yarn
- TypeScript
- Git

### API & Publishing
- GitHub account with personal access token
- npm account with authentication token
- API documentation URL
- API key for testing (service-specific)

### MCP Tools (for scraping)
- `mcp__fetch__fetch` - Simple HTML fetching
- `mcp__hyperbrowserAI__scrape_webpage` - Single page scraping
- `mcp__hyperbrowserAI__crawl_webpages` - Multi-page crawling
- `mcp__hyperbrowserAI__extract_structured_data` - Structured extraction

See [TOOLS_REFERENCE.md](./TOOLS_REFERENCE.md) for detailed tool information.

## 📋 Process Overview

### Phase 1: Research & Scraping
- Identify API documentation
- Scrape documentation pages
- Extract structured endpoint data
- Document authentication requirements

### Phase 2: Implementation
- Set up TypeScript project
- Implement MCP server
- Create tool handlers for each endpoint
- Add error handling

### Phase 3: Testing
- Build and compile
- Test with MCP Inspector
- Validate all tools work
- Test with real API credentials

### Phase 4: Publishing
- Create GitHub repository
- Write comprehensive README
- Push code to GitHub
- Publish to npm
- Verify installation

### Phase 5: Integration
- Test with Claude Desktop
- Test with other MCP clients
- Document configuration
- Monitor for issues

## 📊 Quality Standards

Every MCP server should have:

- ✅ TypeScript with full type coverage
- ✅ Comprehensive error handling
- ✅ All API endpoints implemented as tools
- ✅ Detailed README with setup instructions
- ✅ Configuration examples for all major MCP clients
- ✅ Published on GitHub with proper documentation
- ✅ Published on npm with appropriate keywords
- ✅ Tested with MCP Inspector
- ✅ MIT or similar permissive license

## 🎯 Use Cases

### Good Candidates for MCP Servers

**Excellent:**
- REST APIs with clear documentation
- APIs with API key authentication
- Public APIs with generous rate limits
- Well-documented JSON APIs

**Examples:**
- Weather APIs (OpenWeatherMap, WeatherAPI)
- Database services (Airtable, Notion)
- Communication (Slack, Discord, Twilio)
- Developer tools (GitHub, GitLab, Linear)
- AI services (OpenAI, Anthropic, Hugging Face)
- Payment processors (Stripe, PayPal)
- Cloud storage (Dropbox, Google Drive)

**Challenging:**
- APIs requiring OAuth2 flows
- APIs with complex webhooks
- GraphQL APIs (different patterns)
- SOAP/XML APIs
- APIs with file upload/download

## 📚 Additional Resources

### MCP Resources
- [MCP Official Documentation](https://modelcontextprotocol.io)
- [MCP SDK GitHub](https://github.com/modelcontextprotocol/sdk)
- [MCP Servers Examples](https://github.com/modelcontextprotocol/servers)

### Development Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### API Documentation Examples
- [Stripe API Docs](https://stripe.com/docs/api) - Multi-page REST
- [OpenWeatherMap API](https://openweathermap.org/api) - Simple REST
- [GitHub API](https://docs.github.com/en/rest) - Comprehensive REST

## 🤝 Contributing

This knowledgebase improves through use. When building MCP servers:

1. **Document** patterns you discover
2. **Note** issues and solutions
3. **Update** templates with improvements
4. **Share** successful strategies

## 📝 Version History

- **v1.0.0** - Initial comprehensive knowledgebase
  - Complete documentation
  - Templates and checklists
  - Tool reference guide

## 🎓 Tips for Success

1. **Start Simple**: Begin with a well-documented API
2. **Read First**: Study the knowledgebase before starting
3. **Use Templates**: Don't start from scratch
4. **Test Early**: Use MCP Inspector frequently
5. **Document Well**: Good README = happy users
6. **Iterate**: First version doesn't need to be perfect
7. **Learn Tools**: Master web scraping tools from TOOLS_REFERENCE.md

## ⏱️ Time Estimates

### By API Complexity

| API Size | Scraping | Implementation | Testing & Publishing | Total |
|----------|----------|----------------|---------------------|-------|
| Small (5-10 endpoints) | 15-30 min | 30-60 min | 30-45 min | 1.5-2.5 hrs |
| Medium (10-30 endpoints) | 30-60 min | 1-2 hrs | 45-60 min | 2.5-4 hrs |
| Large (30+ endpoints) | 1-2 hrs | 3-6 hrs | 1-2 hrs | 5-10 hrs |

### By Experience Level

- **First MCP Server**: Add 50-100% to times above
- **Experienced**: Use lower end of ranges
- **Expert**: Can complete small APIs in < 1 hour

## 🚨 Common Pitfalls

1. **Not reading docs first** - Always read KNOWLEDGEBASE.md
2. **Wrong scraping tool** - Consult TOOLS_REFERENCE.md
3. **Skipping MCP Inspector** - Always test locally first
4. **Incomplete README** - Users need config examples
5. **No error handling** - APIs fail, handle gracefully
6. **Missing TypeScript types** - Type everything properly
7. **Forgetting npm keywords** - Use "mcp", "model-context-protocol"

## 📞 Support

For issues with:
- **This knowledgebase**: Open an issue or update documentation
- **MCP Protocol**: [MCP GitHub](https://github.com/modelcontextprotocol)
- **Specific APIs**: Consult their official support

## 📄 License

This knowledgebase is provided as-is for building MCP servers. Individual MCP servers should include their own license (MIT recommended).

---

**Ready to build your first MCP server?**

Start with [KNOWLEDGEBASE.md](./KNOWLEDGEBASE.md) for the complete guide, or jump to [QUICK_START.md](./QUICK_START.md) if you're experienced.

Happy building! 🚀
