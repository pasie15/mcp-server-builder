# Test MCP Server

**Description:** Test an MCP server with MCP Inspector and verify all tools work correctly.

**Usage:** `/test-mcp-server <service-name>`

**Examples:**
- `/test-mcp-server stripe`
- `/test-mcp-server github`

---

## Workflow

This skill handles Phase 5 of MCP server creation: testing with MCP Inspector.

### Step 1: Verify Build

Navigate to project and build:

```bash
cd mcp-servers/mcp-server-{service-name}
npm run build
```

Check:
- [ ] Build completes without errors
- [ ] `dist/` directory exists
- [ ] `dist/index.js` exists and has shebang

### Step 2: Start MCP Inspector

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

Expected output:
```
MCP Inspector running on http://localhost:5173
Server running on stdio
```

### Step 3: Verify Server Connection

In the browser at http://localhost:5173:

1. **Check Server Info:**
   - Server name: `mcp-server-{service-name}`
   - Version: `1.0.0`
   - Capabilities: `{ tools: {} }`

2. **List All Tools:**
   - Verify all expected tools appear
   - Check tool names are correct (snake_case)
   - Verify descriptions are clear

### Step 4: Test Each Tool

For each tool:

1. **Review Input Schema:**
   - Check all parameters listed
   - Verify required parameters marked
   - Check parameter types correct
   - Review parameter descriptions

2. **Test with Sample Data:**
   - Use realistic test values
   - Test required parameters only
   - Test with optional parameters
   - Test with invalid values (should error gracefully)

3. **Verify Response:**
   - Response format is JSON
   - Response is properly formatted
   - Error messages are clear
   - API calls succeed (if credentials provided)

### Step 5: Test Error Scenarios

**Test Cases:**

1. **Missing Required Parameter:**
   ```json
   {
     // Omit required param
   }
   ```
   Expected: Error with message about missing parameter

2. **Invalid Parameter Type:**
   ```json
   {
     "id": 12345  // Should be string
   }
   ```
   Expected: Type validation error

3. **Authentication Failure:**
   - Test without API key (if required)
   - Expected: Clear authentication error message

4. **Not Found:**
   - Test with non-existent resource ID
   - Expected: 404 error with helpful message

5. **Rate Limiting:**
   - Make rapid repeated requests
   - Expected: Rate limit error handled gracefully

### Step 6: Test with Real API Credentials

**If API key available:**

1. Set environment variable:
   ```bash
   export SERVICE_API_KEY="your-api-key"
   ```

2. Restart Inspector with env var:
   ```bash
   SERVICE_API_KEY="your-api-key" npx @modelcontextprotocol/inspector node dist/index.js
   ```

3. Test actual API calls:
   - Test GET endpoints
   - Test POST endpoints (use test mode if available)
   - Verify responses match API documentation
   - Check error handling with real API

### Step 7: Document Test Results

Create test report in `PROJECT_INFO.md`:

```markdown
## Testing Results

### MCP Inspector Testing
- Date: YYYY-MM-DD
- All tools listed: ✅
- Tool schemas valid: ✅

### Tool Testing
- Total tools: X
- Tested successfully: X
- Issues found: X

### Specific Tool Results
| Tool Name | Status | Notes |
|-----------|--------|-------|
| tool_1 | ✅ | Works correctly |
| tool_2 | ⚠️ | Minor formatting issue |
| tool_3 | ✅ | Works correctly |

### Error Handling
- Missing parameters: ✅ Clear errors
- Invalid types: ✅ Validated
- Auth failures: ✅ Helpful messages
- Rate limiting: ✅ Handled gracefully

### Issues Found
1. Issue description and fix applied
2. Issue description and fix applied

### Next Steps
- Fix remaining issues
- Ready for GitHub publishing
- Ready for npm publishing
```

### Step 8: Fix Issues

For any issues found:

1. **TypeScript Errors:**
   - Fix type definitions
   - Update imports
   - Rebuild

2. **Tool Implementation:**
   - Fix handler logic
   - Update parameter handling
   - Improve error messages

3. **Response Formatting:**
   - Improve JSON formatting
   - Add helpful metadata
   - Format arrays as tables (if appropriate)

4. **Rebuild and Retest:**
   ```bash
   npm run build
   npx @modelcontextprotocol/inspector node dist/index.js
   ```

---

## Testing Checklist

Use this checklist during testing:

### Pre-Test
- [ ] TypeScript builds without errors
- [ ] dist/index.js exists
- [ ] Shebang present in dist/index.js

### Server Connection
- [ ] Inspector starts successfully
- [ ] Server connects via stdio
- [ ] Server info displayed correctly

### Tool Listing
- [ ] All tools appear in list
- [ ] Tool names are snake_case
- [ ] Descriptions are clear and helpful
- [ ] Input schemas are complete

### Tool Testing
- [ ] Each tool tested with valid inputs
- [ ] Required parameters work
- [ ] Optional parameters work
- [ ] Invalid inputs produce clear errors

### Error Handling
- [ ] Missing parameter errors clear
- [ ] Type validation works
- [ ] Authentication errors helpful
- [ ] API errors handled gracefully
- [ ] Rate limit errors handled

### Real API Testing (if credentials available)
- [ ] GET requests work
- [ ] POST requests work
- [ ] PUT requests work
- [ ] DELETE requests work
- [ ] Responses match documentation

### Documentation
- [ ] Test results documented
- [ ] Issues logged
- [ ] Fixes applied
- [ ] Retested after fixes

---

## Output

**Test Report Summary:**
```
MCP Server Test Results: mcp-server-{service-name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Server Status: ✅ Connected
Total Tools: X
Tools Tested: X
Tests Passed: X
Tests Failed: X

Tool Results:
  ✅ tool_1 - Works correctly
  ✅ tool_2 - Works correctly
  ⚠️  tool_3 - Minor issue: [description]
  ❌ tool_4 - Error: [description]

Error Handling: ✅ All scenarios handled

Issues Found: X
Issues Fixed: X
Issues Remaining: X

Status: [Ready for Publishing | Needs Fixes]

Next Steps:
- [Action items]
```

**Next Steps:**
- If all tests pass: Use `/publish-github {service-name}` to publish
- If issues remain: Fix and retest
- Update README with working examples

---

## Error Handling

- If Inspector won't start: Check Node.js version, port availability
- If server won't connect: Check shebang, file permissions, build output
- If tools don't appear: Check TOOLS array, CallToolRequestSchema handler
- If API calls fail: Verify credentials, check API status

---

## Notes

- Always test before publishing
- Document all test results
- Fix issues immediately
- Retest after each fix
- Test with real credentials if possible
- Include test examples in README
