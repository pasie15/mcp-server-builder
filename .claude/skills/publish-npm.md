# Publish to npm

**Description:** Publish MCP server package to npm registry.

**Usage:** `/publish-npm <service-name>`

**Examples:**
- `/publish-npm stripe`
- `/publish-npm github`

---

## Workflow

This skill handles Phase 8 of MCP server creation: npm package publishing.

### Step 1: Verify Prerequisites

Check that:
- [ ] Project builds successfully
- [ ] All tests pass
- [ ] GitHub repository published
- [ ] README complete with npm install instructions
- [ ] package.json configured correctly
- [ ] NPM_TOKEN environment variable set (or logged in)

### Step 2: Navigate to Project

```bash
cd mcp-servers/mcp-server-{service-name}
```

### Step 3: Verify npm Authentication

```bash
npm whoami
```

Expected: Your npm username

If not logged in:
```bash
npm login
```

Or use token:
```bash
npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

### Step 4: Verify Package Configuration

Check `package.json`:

```json
{
  "name": "mcp-server-{service-name}",  // ✅ Correct name
  "version": "1.0.0",                    // ✅ Initial version
  "description": "MCP server for {Service Name} API",  // ✅ Clear
  "main": "dist/index.js",               // ✅ Build output
  "type": "module",                      // ✅ ES modules
  "bin": {
    "mcp-server-{service-name}": "./dist/index.js"  // ✅ Executable
  },
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"           // ✅ Auto-build
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "{service-name}",
    "ai",
    "llm"
  ],                                     // ✅ Discoverability
  "author": "Your Name",                 // ✅ Attribution
  "license": "MIT",                      // ✅ License
  "repository": {
    "type": "git",
    "url": "git+https://github.com/{username}/mcp-server-{service-name}.git"
  },                                     // ✅ Source
  "bugs": {
    "url": "https://github.com/{username}/mcp-server-{service-name}/issues"
  },
  "homepage": "https://github.com/{username}/mcp-server-{service-name}#readme"
}
```

### Step 5: Check Package Name Availability

```bash
npm view mcp-server-{service-name}
```

Expected:
- If available: `npm ERR! 404 Not Found`
- If taken: Package details shown

If taken, choose alternative name.

### Step 6: Clean and Build

```bash
# Remove old build
rm -rf dist/

# Clean install dependencies
rm -rf node_modules/
npm install

# Build
npm run build
```

Verify:
- [ ] Build completes without errors
- [ ] `dist/` directory created
- [ ] `dist/index.js` exists
- [ ] Shebang present in `dist/index.js`

### Step 7: Dry Run Package

```bash
npm pack --dry-run
```

Review output:
- [ ] Verify files included
- [ ] Check package size
- [ ] Ensure no sensitive files
- [ ] Confirm dist/ files present

Expected files:
```
package.json
README.md
LICENSE
dist/index.js
dist/index.d.ts
dist/types.js
dist/types.d.ts
```

Should NOT include:
- `node_modules/`
- `src/` (source files)
- `.env`
- `data/` (may have sensitive examples)

### Step 8: Publish to npm

```bash
npm publish --access public
```

Expected output:
```
+ mcp-server-{service-name}@1.0.0
```

**If scoped package:**
```bash
npm publish --access public --scope=@your-scope
```

### Step 9: Verify Publication

1. **Visit npm page:**
   ```
   https://www.npmjs.com/package/mcp-server-{service-name}
   ```

2. **Check package page:**
   - [ ] README displays correctly
   - [ ] Version shows 1.0.0
   - [ ] License correct (MIT)
   - [ ] Keywords visible
   - [ ] Repository link works
   - [ ] Installation command shown

### Step 10: Test Installation

```bash
# Install globally
npm install -g mcp-server-{service-name}

# Verify command available
which mcp-server-{service-name}

# Test execution (should show error about API key)
mcp-server-{service-name}

# Uninstall
npm uninstall -g mcp-server-{service-name}
```

### Step 11: Add npm Badge to README

Update README.md on GitHub:

```markdown
# MCP Server for {Service Name}

[![npm version](https://badge.fury.io/js/mcp-server-{service-name}.svg)](https://www.npmjs.com/package/mcp-server-{service-name})
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Rest of README...]
```

Push update to GitHub:
```typescript
mcp__github__create_or_update_file({
  owner: "{username}",
  repo: "mcp-server-{service-name}",
  path: "README.md",
  message: "Add npm version badge",
  content: "...", // updated README
  branch: "main"
})
```

### Step 12: Update PROJECT_INFO.md

Add npm information:

```markdown
## npm Package Information

- **Package Name:** mcp-server-{service-name}
- **npm URL:** https://www.npmjs.com/package/mcp-server-{service-name}
- **Version:** 1.0.0
- **Published:** {date}
- **License:** MIT
- **Downloads:** [Check npm]

## Installation

\`\`\`bash
npm install -g mcp-server-{service-name}
\`\`\`

## Publishing Status

- ✅ Published to GitHub: {date}
- ✅ Published to npm: {date}
- ✅ Version 1.0.0 released
- ✅ Installation tested
- ✅ README badge added
```

---

## Output

**Success Report:**

```
npm Package Published Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Package: mcp-server-{service-name}
Version: 1.0.0
npm URL: https://www.npmjs.com/package/mcp-server-{service-name}
Status: ✅ Public

Package Details:
  Name: mcp-server-{service-name}
  Version: 1.0.0
  License: MIT
  Size: X.XX kB

Files Published:
  ✅ package.json
  ✅ README.md
  ✅ LICENSE
  ✅ dist/index.js
  ✅ dist/*.d.ts

Verification:
  ✅ Package page accessible
  ✅ README rendering correctly
  ✅ Installation tested
  ✅ Command executable

GitHub Updated:
  ✅ npm badge added to README

Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Installation Command:
  npm install -g mcp-server-{service-name}

Links:
  - npm: https://www.npmjs.com/package/mcp-server-{service-name}
  - GitHub: https://github.com/{username}/mcp-server-{service-name}

Next Steps:
  - Share on MCP community channels
  - Monitor GitHub issues
  - Plan future updates
```

---

## Version Management

### Publishing Updates

**Patch Version (bug fixes):**
```bash
npm version patch  # 1.0.0 → 1.0.1
npm publish
```

**Minor Version (new features):**
```bash
npm version minor  # 1.0.0 → 1.1.0
npm publish
```

**Major Version (breaking changes):**
```bash
npm version major  # 1.0.0 → 2.0.0
npm publish
```

### Version Guidelines

- **Patch (1.0.X):** Bug fixes, documentation updates, no API changes
- **Minor (1.X.0):** New tools added, new optional parameters, backwards compatible
- **Major (X.0.0):** Breaking changes, removed tools, required parameter changes

---

## Error Handling

### Authentication Fails
- **Problem:** Not logged in to npm
- **Solution:** Run `npm login` or set NPM_TOKEN

### Package Name Taken
- **Problem:** Name already exists
- **Solution:** Choose alternative name, update package.json, rebuild

### Publish Fails
- **Problem:** Version already published
- **Solution:** Increment version with `npm version patch`

### Files Missing
- **Problem:** dist/ files not included
- **Solution:** Ensure `npm run build` completed, check .npmignore

### README Not Rendering
- **Problem:** Markdown errors on npm
- **Solution:** Validate markdown, test locally, fix syntax

---

## Best Practices

1. **Always build before publishing**
2. **Always test with dry run first**
3. **Always verify package page after publish**
4. **Always test installation**
5. **Always add npm badge to README**
6. **Always use semantic versioning**
7. **Always include keywords for discoverability**
8. **Always link to GitHub repository**

---

## Notes

- npm package name must match repository name
- Use `--access public` for unscoped packages
- Build runs automatically via `prepare` script
- Shebang is critical for CLI execution
- Test installation before announcing
- Monitor download statistics on npm
- Respond to issues promptly
