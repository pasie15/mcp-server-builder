# Publishing MCP Servers to GitHub and NPM

This guide explains how to publish your MCP servers to GitHub and npmjs.com, making them available to the community.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Publishing to GitHub](#publishing-to-github)
4. [Publishing to NPM](#publishing-to-npm)
5. [Automated Publishing with GitHub Actions](#automated-publishing-with-github-actions)
6. [Post-Publishing Checklist](#post-publishing-checklist)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before publishing, ensure you have:

### Accounts Created
- ✅ GitHub account: https://github.com
- ✅ NPM account: https://www.npmjs.com

### Tokens Generated

#### GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "MCP Server Builder"
4. Required scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

#### NPM Automation Token
1. Go to https://www.npmjs.com/settings/tokens
2. Click "Generate New Token" → "Classic Token"
3. Select "Automation" type (more secure than "Publish")
4. Name: "MCP Server Builder"
5. Click "Generate Token"
6. **Copy the token immediately**

### Environment Configuration

1. **Copy the template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your tokens:**
   ```bash
   # GitHub Configuration
   GITHUB_TOKEN=ghp_your_github_token_here

   # NPM Configuration
   NPM_TOKEN=npm_your_npm_token_here
   ```

3. **Verify `.env` is gitignored:**
   ```bash
   # This should show that .env is ignored
   git check-ignore .env
   ```

**⚠️ SECURITY**: Never commit tokens! The `.env` file is already in `.gitignore`.

## Publishing to GitHub

### Step 1: Initialize Git Repository

Navigate to your MCP server directory:

```bash
cd mcp-servers/mcp-server-{service-name}

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MCP server for {Service Name}"
```

### Step 2: Create GitHub Repository

You can use the GitHub CLI or MCP tools:

#### Using GitHub MCP Tool (Recommended for Agents)
```typescript
// Claude Code can use:
mcp__github__create_repository({
  "name": "mcp-server-{service-name}",
  "description": "MCP server for {Service} API - {brief description}",
  "private": false,
  "autoInit": false
})
```

#### Using GitHub CLI
```bash
gh repo create mcp-server-{service-name} \
  --public \
  --description "MCP server for {Service} API" \
  --source=. \
  --remote=origin \
  --push
```

#### Using GitHub API Directly
```bash
curl -H "Authorization: token $GITHUB_TOKEN" \
  -d '{"name":"mcp-server-{service-name}","description":"MCP server for {Service} API","private":false}' \
  https://api.github.com/user/repos
```

### Step 3: Push to GitHub

```bash
# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/mcp-server-{service-name}.git

# Push code
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/mcp-server-{service-name}` to verify:
- ✅ README displays correctly
- ✅ All files are present
- ✅ License is included
- ✅ .gitignore is working (.env not visible)

## Publishing to NPM

### Step 1: Update package.json

Ensure your `package.json` has:

```json
{
  "name": "mcp-server-{service-name}",
  "version": "1.0.0",
  "description": "MCP server for {Service} API - {description}",
  "author": "YOUR_NPM_USERNAME",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/mcp-server-{service-name}.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/mcp-server-{service-name}/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/mcp-server-{service-name}#readme",
  "keywords": [
    "mcp",
    "model-context-protocol",
    "{service-name}",
    "{relevant-keywords}"
  ],
  "main": "dist/index.js",
  "bin": {
    "mcp-server-{service-name}": "dist/index.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

### Step 2: Build the Project

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Verify build output exists
ls -la dist/
```

### Step 3: Test Locally

Before publishing, test the package:

```bash
# Pack the package
npm pack

# This creates mcp-server-{service-name}-1.0.0.tgz
# Test install from the tarball
npm install -g ./mcp-server-{service-name}-1.0.0.tgz

# Test that it works
mcp-server-{service-name} --help
```

### Step 4: Publish to NPM

#### Automated with Environment Token

```bash
# Configure npm with token from .env
source .env
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# Publish (use --access public for unscoped packages)
npm publish --access public

# Clean up token from npm config (security)
npm config delete //registry.npmjs.org/:_authToken
```

#### For Agents Using MCP (Like Claude Code)

Agents can read the NPM token from the environment and publish:

```bash
# The token is already in your environment from .env
cd mcp-servers/mcp-server-{service-name}

# Configure npm
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# Publish
npm publish --access public

# Clean up
npm config delete //registry.npmjs.org/:_authToken
```

### Step 5: Verify Publication

Visit `https://www.npmjs.com/package/mcp-server-{service-name}` to verify:
- ✅ Package is visible
- ✅ README displays correctly
- ✅ Installation instructions work
- ✅ Version is correct

Test installation:
```bash
npm install -g mcp-server-{service-name}
```

## Automated Publishing with GitHub Actions

For future updates, set up automated publishing:

### Step 1: Create Workflow File

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Step 2: Add NPM Token to GitHub Secrets

1. Go to your repository: `https://github.com/YOUR_USERNAME/mcp-server-{service-name}`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Your NPM automation token (from `.env` file)
6. Click **Add secret**

### Step 3: Test Automated Publishing

```bash
# Update version
npm version patch  # or minor, or major

# Push with tags
git push --follow-tags

# Create GitHub Release
# Go to GitHub → Releases → Draft a new release
# This will trigger the publish workflow
```

## Post-Publishing Checklist

After publishing to both GitHub and NPM:

### Documentation
- [ ] README is comprehensive with installation instructions
- [ ] All tools are documented with examples
- [ ] Configuration examples for Claude Desktop, Cline, etc.
- [ ] API key setup instructions included
- [ ] Troubleshooting section added

### Repository
- [ ] LICENSE file present (MIT recommended)
- [ ] .gitignore configured (.env excluded)
- [ ] CONTRIBUTING.md added (optional)
- [ ] GitHub topics/tags added (mcp, typescript, etc.)

### NPM Package
- [ ] Keywords include "mcp" and "model-context-protocol"
- [ ] Repository URL in package.json
- [ ] Bugs URL in package.json
- [ ] Homepage URL in package.json
- [ ] Correct license specified

### Testing
- [ ] Install works: `npm install -g mcp-server-{service-name}`
- [ ] Works with Claude Desktop
- [ ] Works with MCP Inspector
- [ ] All tools respond correctly

### Community
- [ ] Add to MCP servers list (if applicable)
- [ ] Share on relevant communities
- [ ] Monitor for issues

## Troubleshooting

### GitHub Issues

#### "Repository already exists"
```bash
# Check if repo exists
gh repo view YOUR_USERNAME/mcp-server-{service-name}

# If it exists and you want to overwrite:
# Delete it first (CAREFUL!)
gh repo delete YOUR_USERNAME/mcp-server-{service-name}
```

#### "Authentication failed"
```bash
# Verify your GitHub token
echo $GITHUB_TOKEN

# If empty, reload .env
source .env

# Test token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

### NPM Issues

#### "You must be logged in to publish"
```bash
# Check if token is set
npm config get //registry.npmjs.org/:_authToken

# Set it from .env
source .env
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# Verify with whoami
npm whoami
```

#### "Package name already exists"
```bash
# Check if package name is taken
npm search mcp-server-{service-name}

# If taken, choose a different name
# Update package.json and try again
```

#### "402 Payment Required"
```bash
# You're trying to publish a scoped private package
# Use --access public for unscoped packages
npm publish --access public
```

### Build Issues

#### "Cannot find module"
```bash
# Ensure all dependencies are installed
npm install

# Rebuild
npm run build

# Check dist/ exists
ls -la dist/
```

#### "Permission denied"
```bash
# Fix file permissions
chmod +x dist/index.js

# Ensure shebang is present
head -n 1 dist/index.js  # Should show #!/usr/bin/env node
```

## Security Best Practices

### Token Management
- ✅ Store tokens in `.env` only
- ✅ Never commit `.env` to git
- ✅ Use "Automation" tokens for NPM
- ✅ Use minimal scopes for GitHub tokens
- ✅ Rotate tokens periodically
- ✅ Use GitHub Secrets for CI/CD

### Publishing Safety
- ✅ Test packages locally before publishing
- ✅ Review `npm pack` contents
- ✅ Use `--dry-run` to preview
- ✅ Clean up npm config after publishing
- ✅ Verify .gitignore works

## Quick Reference

### Complete Publishing Commands

```bash
# 1. Navigate to project
cd mcp-servers/mcp-server-{service-name}

# 2. Build
npm run build

# 3. Git setup
git init
git add .
git commit -m "Initial commit"

# 4. Create GitHub repo (using MCP or gh CLI)
gh repo create mcp-server-{service-name} --public --source=. --remote=origin --push

# 5. Configure NPM
source ../.env
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# 6. Publish to NPM
npm publish --access public

# 7. Clean up
npm config delete //registry.npmjs.org/:_authToken
```

## Additional Resources

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [MCP Documentation](https://modelcontextprotocol.io/)

---

**Ready to publish?** Follow the steps above and your MCP server will be available to the community!
