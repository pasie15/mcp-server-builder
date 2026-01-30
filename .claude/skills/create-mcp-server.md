# Create MCP Server

**Description:** Create a new MCP server project from extracted endpoint data.

**Usage:** `/create-mcp-server <service-name> [endpoints-file]`

**Examples:**
- `/create-mcp-server stripe`
- `/create-mcp-server github data/github-endpoints.json`

---

## Workflow

This skill handles Phases 2-3 of MCP server creation: project setup and basic implementation.

### Step 1: Verify Prerequisites

Check that:
- [ ] Endpoint data file exists (either provided or in `data/{service-name}-endpoints.json`)
- [ ] Service name is valid (lowercase, alphanumeric, hyphens)
- [ ] Not in `mcp-servers/` directory already

### Step 2: Create Project Directory

**CRITICAL:** All MCP servers must be created in `mcp-servers/` directory.

```bash
cd mcp-servers
mkdir mcp-server-{service-name}
cd mcp-server-{service-name}
```

### Step 3: Initialize Project

```bash
# Initialize npm project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk axios

# Install dev dependencies
npm install -D typescript @types/node

# Create directory structure
mkdir -p src/tools data
```

### Step 4: Copy Templates

```bash
# Copy server template
cp ../../templates/server-template.ts src/index.ts

# Copy project tracking files
cp ../../templates/PROJECT_INFO.md ./
cp ../../templates/PROJECT_CHECKLIST.md ./
```

### Step 5: Create Configuration Files

**package.json:**
- Set name: `mcp-server-{service-name}`
- Set description: `MCP server for {Service Name} API`
- Add `"type": "module"`
- Configure bin entry point
- Add build scripts

**tsconfig.json:**
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
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**.gitignore:**
```
node_modules/
dist/
.env
.env.local
.vscode/
.idea/
*.swp
*.swo
.DS_Store
Thumbs.db
*.log
npm-debug.log*
coverage/
.nyc_output/
```

**LICENSE (MIT):**
```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 6: Customize Server Template

Edit `src/index.ts`:
1. Replace `{SERVICE_NAME}` with service name (e.g., "Stripe")
2. Replace `{service-name}` with kebab-case (e.g., "stripe")
3. Replace `{SERVICE}` with UPPER_CASE (e.g., "STRIPE")
4. Replace `{BASE_URL}` with API base URL
5. Configure authentication based on endpoint data

### Step 7: Copy Endpoint Data

```bash
# Copy endpoint data to project
cp ../../data/{service-name}-endpoints.json data/endpoints.json
```

### Step 8: Create Basic README

Create `README.md` with:
- Project title
- Installation instructions
- Configuration examples (Claude Desktop, Cline, Continue.dev)
- Placeholder for tools documentation
- Development instructions
- License

### Step 9: Update PROJECT_INFO.md

Fill in:
- Service name and description
- API documentation URL
- Base URL
- Authentication type
- Number of endpoints

### Step 10: Initial Build Test

```bash
npm run build
```

Verify:
- [ ] TypeScript compiles without errors
- [ ] `dist/` directory created
- [ ] `dist/index.js` has shebang line

---

## Output

The skill creates a complete project structure:

```
mcp-servers/mcp-server-{service-name}/
├── src/
│   ├── index.ts              ✅ Basic server template
│   ├── types.ts              ⏳ To be created
│   └── tools/                ⏳ To be populated
├── data/
│   └── endpoints.json        ✅ Copied endpoint data
├── package.json              ✅ Configured
├── tsconfig.json             ✅ Created
├── README.md                 ✅ Basic template
├── PROJECT_INFO.md           ✅ Filled out
├── PROJECT_CHECKLIST.md      ✅ Copied
├── .gitignore                ✅ Created
└── LICENSE                   ✅ MIT license
```

**Status Report:**
- ✅ Project structure created
- ✅ Dependencies installed
- ✅ Configuration files created
- ✅ Initial build successful
- ⏳ Ready for tool implementation

**Next Steps:**
- Use `/implement-tools {service-name}` to implement MCP tools
- Or manually implement tools based on `data/endpoints.json`

---

## Error Handling

- If directory exists, ask user to confirm overwrite or choose new name
- If npm install fails, report dependency issues
- If build fails, report TypeScript errors
- If templates missing, report and provide inline versions

---

## Notes

- Always create in `mcp-servers/` directory
- Always copy templates before customizing
- Always test build before declaring success
- Save all configuration exactly as specified
