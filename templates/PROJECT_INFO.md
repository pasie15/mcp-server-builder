# Project Information

## Basic Details

- **Service Name:** {Service Name}
- **API Documentation URL:** {API Docs URL}
- **Base API URL:** {Base URL}
- **Created Date:** {YYYY-MM-DD}
- **Last Updated:** {YYYY-MM-DD}
- **Status:** 🔨 In Progress | ✅ Published | 📦 Deprecated
- **Version:** {x.y.z}

## Links

- **npm Package:** https://www.npmjs.com/package/mcp-server-{service-name}
- **GitHub Repository:** https://github.com/{username}/mcp-server-{service-name}
- **Issue Tracker:** https://github.com/{username}/mcp-server-{service-name}/issues
- **Changelog:** https://github.com/{username}/mcp-server-{service-name}/releases

## Implementation Details

### Endpoints
- **Total API Endpoints:** {number}
- **Implemented as Tools:** {number}
- **Implementation Coverage:** {percentage}%

### Authentication
- **Type:** API Key | Bearer Token | OAuth2 | None
- **Location:** Header | Query | Body
- **Environment Variable:** `{SERVICE}_API_KEY`

### Rate Limits
- **Requests per minute:** {number}
- **Requests per hour:** {number}
- **Requests per day:** {number}
- **Notes:** {Any special rate limit information}

## Features

### Implemented Tools

1. **tool_name_1**
   - Description: Brief description
   - Endpoint: `GET /path`
   - Status: ✅ Working | ⚠️ Issues | 🚧 In Progress

2. **tool_name_2**
   - Description: Brief description
   - Endpoint: `POST /path`
   - Status: ✅ Working | ⚠️ Issues | 🚧 In Progress

{Add more tools...}

### Special Features

- [ ] Pagination support
- [ ] Webhook resources
- [ ] File upload/download
- [ ] Streaming responses
- [ ] Custom response formatting
- [ ] Advanced error handling

## Testing

### MCP Inspector
- **Last Tested:** {Date}
- **Result:** ✅ All tools working | ⚠️ Some issues
- **Notes:** {Testing notes}

### Integration Testing
- **Claude Desktop:** ✅ Tested | ⬜ Not tested
- **Cline:** ✅ Tested | ⬜ Not tested
- **Continue.dev:** ✅ Tested | ⬜ Not tested
- **Other:** {Name} - ✅ Tested | ⬜ Not tested

## Development Timeline

### Phase 1: Research & Scraping
- **Started:** {Date}
- **Completed:** {Date}
- **Duration:** {hours/days}
- **Tools Used:** {scraping tools used}

### Phase 2: Implementation
- **Started:** {Date}
- **Completed:** {Date}
- **Duration:** {hours/days}
- **Challenges:** {Any challenges encountered}

### Phase 3: Testing
- **Started:** {Date}
- **Completed:** {Date}
- **Duration:** {hours/days}
- **Issues Found:** {number}
- **Issues Resolved:** {number}

### Phase 4: Publishing
- **GitHub Published:** {Date}
- **npm Published:** {Date}
- **Initial Version:** {x.y.z}

## Metrics

### Code Statistics
- **TypeScript Files:** {number}
- **Total Lines of Code:** {number}
- **Number of Tools:** {number}
- **Test Coverage:** {percentage}% (if applicable)

### npm Statistics
- **Total Downloads:** {number}
- **Weekly Downloads:** {number}
- **Dependents:** {number}
- **Last Published:** {Date}

### GitHub Statistics
- **Stars:** {number}
- **Forks:** {number}
- **Open Issues:** {number}
- **Contributors:** {number}

## Known Issues

### Critical Issues
{List any critical issues}

### Non-Critical Issues
{List any non-critical issues}

### Planned Improvements
1. {Improvement 1}
2. {Improvement 2}
3. {Improvement 3}

## Dependencies

### Runtime Dependencies
- `@modelcontextprotocol/sdk`: ^{version}
- `axios`: ^{version}
- {Other dependencies}

### Dev Dependencies
- `typescript`: ^{version}
- `@types/node`: ^{version}
- {Other dev dependencies}

## Configuration

### Required Environment Variables
```bash
{SERVICE}_API_KEY=your_api_key_here
{SERVICE}_BASE_URL=https://api.example.com  # Optional
{SERVICE}_TIMEOUT=30000  # Optional
```

### Optional Configuration
- **Custom base URL:** For testing or different regions
- **Timeout:** Adjust for slow APIs
- **Additional headers:** Service-specific headers

## Usage Examples

### Example 1: {Common Use Case}
```json
{
  "tool": "tool_name",
  "arguments": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

### Example 2: {Another Common Use Case}
```json
{
  "tool": "tool_name_2",
  "arguments": {
    "param1": "value1"
  }
}
```

## User Feedback

### Positive Feedback
- {Feedback item 1}
- {Feedback item 2}

### Improvement Requests
- {Request 1}
- {Request 2}

### Bug Reports
- {Bug 1} - Status: {Fixed/In Progress/Open}
- {Bug 2} - Status: {Fixed/In Progress/Open}

## Version History

### v1.0.0 (Initial Release)
- **Date:** {YYYY-MM-DD}
- **Changes:**
  - Initial implementation
  - {number} tools implemented
  - Published to npm and GitHub

### v1.1.0 (if applicable)
- **Date:** {YYYY-MM-DD}
- **Changes:**
  - {Feature 1}
  - {Bug fix 1}
  - {Improvement 1}

## Maintenance

### Last Code Update
- **Date:** {YYYY-MM-DD}
- **Type:** Feature | Bug Fix | Documentation
- **Description:** {Brief description}

### Maintenance Schedule
- **API Changes Check:** Monthly | Quarterly
- **Dependency Updates:** Monthly
- **Security Audits:** Quarterly

### Maintenance Notes
{Any important maintenance information}

## Contact & Support

### Maintainer
- **Name:** {Your Name}
- **GitHub:** @{username}
- **Email:** {email} (optional)

### Support Channels
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions (if enabled)
- **Community:** {Links to relevant communities}

## Documentation

### README Quality
- [ ] Installation instructions
- [ ] Configuration examples for all major MCP clients
- [ ] All tools documented with parameters
- [ ] Examples provided
- [ ] Troubleshooting section
- [ ] Links to API documentation

### Additional Documentation
- [ ] CHANGELOG.md
- [ ] CONTRIBUTING.md
- [ ] CODE_OF_CONDUCT.md
- [ ] API reference docs

## License

- **License:** MIT | Apache-2.0 | Other
- **Copyright:** {Year} {Your Name}

## Notes

### Development Notes
{Any important development notes, decisions made, patterns used}

### API Quirks
{Document any unusual API behavior or quirks encountered}

### Performance Notes
{Notes about API performance, rate limits, timeouts}

### Future Considerations
{Ideas for future improvements or features}

---

**Last Updated:** {YYYY-MM-DD}
**Status:** {Current status}
