# MCP Server Builder - Specialized Agents

This directory contains configurations for specialized sub-agents that can autonomously handle MCP server creation tasks.

## Important Note

These are **agent prompt templates**, not autonomous agents. When you need a sub-agent to perform a task, I will:

1. Read the agent configuration from this directory
2. Launch a Task tool agent with the appropriate prompt
3. The agent will execute the task with the embedded knowledge

## Available Agent Types

### 1. API Documentation Scraper Agent
**Purpose:** Scrape and extract structured API endpoint data

**When to use:**
- You have an API documentation URL
- Need structured endpoint data for MCP server creation

**How I'll use it:**
```
I'll launch a general-purpose agent with instructions to:
- Analyze the API documentation structure
- Choose optimal scraping tools
- Extract structured endpoint data using the schema
- Save results to data/ directory
```

### 2. MCP Server Implementation Agent
**Purpose:** Implement MCP server from extracted endpoint data

**When to use:**
- Endpoint data already extracted
- Need complete MCP server implementation

**How I'll use it:**
```
I'll launch a general-purpose agent with instructions to:
- Read endpoint data file
- Generate tool definitions and handlers
- Create type definitions
- Implement error handling
- Build and verify the project
```

### 3. Testing & Publishing Agent
**Purpose:** Test MCP server and publish to GitHub/npm

**When to use:**
- MCP server implemented
- Need testing and publishing

**How I'll use it:**
```
I'll launch a Bash agent with instructions to:
- Build the project
- Test with MCP Inspector
- Create GitHub repository
- Push files to GitHub
- Publish to npm
- Verify installation
```

## How This Works

When you ask me to perform one of these tasks, I will:

1. **Determine the appropriate agent type** based on your request
2. **Read the agent configuration** (this file or skill files)
3. **Launch a Task with a detailed prompt** that includes:
   - The goal
   - Available tools
   - Step-by-step workflow
   - Error handling instructions
   - Success criteria

4. **Monitor the agent's progress**
5. **Report results back to you**

## Example Usage

**You say:**
```
"Please scrape the Stripe API documentation and extract all endpoints"
```

**I will:**
1. Recognize this needs the API Documentation Scraper workflow
2. Launch a general-purpose Task agent with a prompt like:

```
Scrape and extract structured endpoint data from Stripe API documentation.

URL: https://docs.stripe.com/api
Service Name: stripe

Steps:
1. Use mcp__fetch__fetch or mcp__hyperbrowserAI__scrape_webpage to explore the docs
2. Determine if it's single or multi-page
3. Use mcp__hyperbrowserAI__extract_structured_data with the endpoint extraction schema
4. Save results to data/stripe-endpoints.json
5. Provide a summary report

Available tools:
- mcp__fetch__fetch
- mcp__hyperbrowserAI__scrape_webpage
- mcp__hyperbrowserAI__crawl_webpages
- mcp__hyperbrowserAI__extract_structured_data

Success criteria:
- Endpoint data extracted and saved
- At least 10 endpoints found
- All endpoints have method, path, and parameters
```

## Limitations

**What agents CANNOT do:**
- Agents don't automatically know about the skills I created
- Each agent starts fresh with only the knowledge in its prompt
- Agents can't read other agent configurations without explicit instruction
- Skills are playbooks for ME (Claude), not for sub-agents

**What agents CAN do:**
- Execute complex multi-step workflows autonomously
- Use all available MCP tools (GitHub, web scraping, etc.)
- Search codebases, read files, make decisions
- Run bash commands, build projects, test code

## Best Approach

**For simple, single-phase tasks:**
- I'll handle it directly without launching agents
- Faster and more efficient

**For complex, multi-step tasks:**
- I'll launch a Task agent with detailed instructions
- Agent works autonomously while I monitor
- Better for long-running operations

**For complete MCP server creation:**
- I'll orchestrate multiple agents OR
- Handle it myself following the skill workflows
- Depends on complexity and your preference

## Your Question Answered

**Can I create sub-agents that use these skills effectively?**

**Short answer:** Not directly, but I can create agents with the same knowledge embedded in their prompts.

**Long answer:**
- The skills are playbooks for ME to follow
- When I need a sub-agent, I embed the relevant knowledge into the agent's prompt
- The agent then executes with that knowledge
- This is effectively the same as "using the skill" but more explicit

**Better approach:**
- Use the `/skill-name` commands with ME directly
- I'll follow the skills and can spawn agents as needed
- This gives you control over the process
- I can launch agents for specific subtasks when appropriate

