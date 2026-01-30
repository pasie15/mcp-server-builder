# Build MCP Server (End-to-End)

**Description:** Complete end-to-end MCP server creation from API documentation URL to published npm package.

**Usage:** `/build-mcp-server <api-docs-url> <service-name> [github-username]`

**Examples:**
- `/build-mcp-server https://docs.stripe.com/api stripe yourusername`
- `/build-mcp-server https://developer.github.com/v3 github`

---

## Overview

This skill executes all phases of MCP server creation:

1. ✅ Scrape API documentation
2. ✅ Extract structured endpoint data
3. ✅ Create project structure
4. ✅ Implement MCP tools
5. ✅ Test with MCP Inspector
6. ✅ Publish to GitHub
7. ✅ Publish to npm
8. ✅ Verify installation

---

## Complete Workflow

### Phase 1: Documentation Scraping (5-15 minutes)

**Action:** Call `/scrape-api-docs {api-docs-url} {service-name}`

**Outputs:**
- Scraped documentation content
- Extracted endpoint data saved to `data/{service-name}-endpoints.json`
- Summary report

**Validation:**
- [ ] Endpoints extracted successfully
- [ ] Authentication method identified
- [ ] Base URL identified
- [ ] Endpoint data file created

---

### Phase 2: Project Creation (5 minutes)

**Action:** Call `/create-mcp-server {service-name}`

**Outputs:**
- Complete project structure in `mcp-servers/mcp-server-{service-name}/`
- Dependencies installed
- Configuration files created
- Templates copied and customized
- Initial build successful

**Validation:**
- [ ] Directory structure correct
- [ ] npm dependencies installed
- [ ] TypeScript compiles
- [ ] Templates customized

---

### Phase 3: Tool Implementation (30-90 minutes)

**Action:** Call `/implement-tools {service-name}`

**Outputs:**
- Tool definitions generated
- Tool handlers implemented
- Type definitions created
- README updated with tool documentation
- Build successful

**Validation:**
- [ ] All endpoints converted to tools
- [ ] Tool names follow conventions
- [ ] Input schemas complete
- [ ] Error handling implemented
- [ ] TypeScript types defined

---

### Phase 4: Testing (10 minutes)

**Action:** Call `/test-mcp-server {service-name}`

**Outputs:**
- MCP Inspector test session
- Test results documented
- Issues identified and fixed
- All tools verified working

**Validation:**
- [ ] Server connects to Inspector
- [ ] All tools listed
- [ ] Tools execute successfully
- [ ] Error handling works
- [ ] Responses properly formatted

---

### Phase 5: GitHub Publishing (5 minutes)

**Action:** Call `/publish-github {service-name} {github-username}`

**Outputs:**
- GitHub repository created
- All files pushed
- Release v1.0.0 created
- Repository verified

**Validation:**
- [ ] Repository public
- [ ] All files uploaded
- [ ] README renders correctly
- [ ] License recognized
- [ ] Release created

---

### Phase 6: npm Publishing (5 minutes)

**Action:** Call `/publish-npm {service-name}`

**Outputs:**
- Package published to npm
- Installation verified
- README badge added
- npm page verified

**Validation:**
- [ ] Package published successfully
- [ ] npm page accessible
- [ ] Installation works
- [ ] Command executable
- [ ] README updated with badge

---

## Execution Strategy

### Option 1: Fully Automated (Recommended)

Execute all skills in sequence:

```
1. /scrape-api-docs {api-docs-url} {service-name}
   └─ Wait for completion and validation

2. /create-mcp-server {service-name}
   └─ Wait for completion and validation

3. /implement-tools {service-name}
   └─ Wait for completion and validation

4. /test-mcp-server {service-name}
   └─ Fix any issues found
   └─ Retest until all pass

5. /publish-github {service-name} {github-username}
   └─ Wait for completion and validation

6. /publish-npm {service-name}
   └─ Wait for completion and validation

7. Final verification
```

### Option 2: Semi-Automated

Execute phases manually with user approval between each phase:

```
1. Execute Phase 1 (Scraping)
2. Ask user: "Phase 1 complete. Proceed to Phase 2?"
3. Execute Phase 2 (Project Creation)
4. Ask user: "Phase 2 complete. Proceed to Phase 3?"
... continue for each phase
```

### Option 3: Manual Checkpoints

Stop at critical checkpoints for user review:

**Checkpoint 1:** After scraping
- Review extracted endpoints
- Verify authentication method
- Confirm base URL
- **User decision:** Proceed or adjust

**Checkpoint 2:** After implementation
- Review generated tools
- Test with Inspector
- Fix any issues
- **User decision:** Proceed or adjust

**Checkpoint 3:** Before publishing
- Final review of README
- Verify all tests pass
- Check package.json
- **User decision:** Publish or adjust

---

## Progress Tracking

Use `PROJECT_CHECKLIST.md` to track progress:

```markdown
# MCP Server Creation Progress

## Phase 1: Documentation Scraping
- [x] API documentation scraped
- [x] Endpoint data extracted
- [x] Data saved to file
- [x] Summary report generated

## Phase 2: Project Setup
- [x] Project directory created
- [x] Dependencies installed
- [x] Configuration files created
- [x] Templates copied

## Phase 3: Implementation
- [x] Tool definitions created
- [x] Tool handlers implemented
- [x] Type definitions added
- [x] README updated

## Phase 4: Testing
- [x] MCP Inspector testing completed
- [x] All tools verified
- [x] Issues fixed
- [x] Test report created

## Phase 5: GitHub Publishing
- [x] Repository created
- [x] Files pushed
- [x] Release created
- [x] Repository verified

## Phase 6: npm Publishing
- [x] Package published
- [x] Installation verified
- [x] Badge added
- [x] npm page verified

## Status: ✅ COMPLETE
```

---

## Final Output

**Success Report:**

```
MCP Server Build Complete! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service: {Service Name}
Package: mcp-server-{service-name}
Version: 1.0.0

Summary:
  📊 Total Endpoints: X
  🔧 Total Tools: X
  ✅ All Tests Passed
  📦 Published to npm
  🐙 Published to GitHub

Links:
  📦 npm: https://www.npmjs.com/package/mcp-server-{service-name}
  🐙 GitHub: https://github.com/{username}/mcp-server-{service-name}

Installation:
  npm install -g mcp-server-{service-name}

Configuration Example (Claude Desktop):
{
  "mcpServers": {
    "{service-name}": {
      "command": "npx",
      "args": ["mcp-server-{service-name}"],
      "env": {
        "SERVICE_API_KEY": "your-api-key"
      }
    }
  }
}

Available Tools:
  1. tool_name_1 - Description
  2. tool_name_2 - Description
  ... (X tools total)

Time Taken: ~X minutes
Status: ✅ Ready for Use

Next Steps:
  - Share on MCP community
  - Monitor GitHub issues
  - Plan future enhancements
  - Create additional MCP servers!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Error Handling

### Phase Failure Strategy

If any phase fails:

1. **Log the error:**
   - Record phase name
   - Capture error message
   - Note state at failure

2. **Attempt automatic recovery:**
   - Retry with different parameters
   - Use fallback methods
   - Skip optional steps

3. **If recovery fails:**
   - Stop execution
   - Report to user
   - Provide manual fix instructions
   - Allow resuming from failed phase

### Resume Capability

If build interrupted, allow resuming:

```
/build-mcp-server --resume {service-name} --from-phase {phase-number}
```

Example:
```
/build-mcp-server --resume stripe --from-phase 4
```

---

## Quality Checks

Before declaring complete, verify:

### ✅ Code Quality
- [ ] TypeScript compiles with zero errors
- [ ] All imports use .js extensions
- [ ] Error handling comprehensive
- [ ] Type definitions complete

### ✅ Documentation
- [ ] README complete and clear
- [ ] All tools documented
- [ ] Configuration examples for all clients
- [ ] Installation instructions tested

### ✅ Testing
- [ ] All tools tested with Inspector
- [ ] Error scenarios tested
- [ ] Real API calls work (if credentials provided)
- [ ] Test report documented

### ✅ Publishing
- [ ] GitHub repository public and accessible
- [ ] npm package published and installable
- [ ] Both repositories linked
- [ ] Badges added to README

### ✅ Final Verification
- [ ] Can install from npm globally
- [ ] Command executes correctly
- [ ] MCP client can connect
- [ ] Tools appear in MCP client

---

## Time Estimates

**Total Time:** 1-4 hours depending on API complexity

**Phase Breakdown:**
- Phase 1 (Scraping): 5-15 minutes
- Phase 2 (Setup): 5 minutes
- Phase 3 (Implementation): 30-90 minutes
- Phase 4 (Testing): 10 minutes
- Phase 5 (GitHub): 5 minutes
- Phase 6 (npm): 5 minutes
- Final Verification: 5 minutes

**API Complexity:**
- Simple (5-10 endpoints): ~1 hour total
- Medium (10-30 endpoints): ~2 hours total
- Complex (30+ endpoints): ~4 hours total

---

## Notes

- This skill orchestrates all other skills
- Can be run fully automated or with checkpoints
- Maintains progress tracking throughout
- Handles errors gracefully with recovery
- Provides comprehensive final report
- Ensures quality at each phase
- Verifies end-to-end functionality
