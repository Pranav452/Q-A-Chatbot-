// MCP Knowledge Base - Comprehensive information about Model Context Protocol
const mcpKnowledgeBase = {
    // Core Concepts
    "what is mcp": {
        title: "What is MCP?",
        content: `<strong>Model Context Protocol (MCP)</strong> is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications.

<strong>Key Benefits:</strong>
• Standardized way to connect AI models to different data sources and tools
• Growing list of pre-built integrations that LLMs can directly plug into
• Flexibility to switch between LLM providers and vendors
• Best practices for securing your data within your infrastructure

<strong>Real-world analogy:</strong> Just as USB-C provides a standardized way to connect devices to peripherals, MCP provides a standardized way to connect AI models to data sources and tools.`,
        keywords: ["mcp", "model context protocol", "what is", "definition", "overview"]
    },

    "mcp architecture": {
        title: "MCP Architecture",
        content: `<strong>MCP follows a client-server architecture:</strong>

<strong>🏠 MCP Hosts:</strong> Programs like Claude Desktop, IDEs, or AI tools that want to access data through MCP

<strong>🔗 MCP Clients:</strong> Protocol clients that maintain 1:1 connections with servers

<strong>🖥️ MCP Servers:</strong> Lightweight programs that expose specific capabilities through the standardized protocol

<strong>💾 Local Data Sources:</strong> Your computer's files, databases, and services that MCP servers can securely access

<strong>🌐 Remote Services:</strong> External systems available over the internet (APIs) that MCP servers can connect to

<strong>Connection Flow:</strong>
Host → Client → Server → Data Source/Service`,
        keywords: ["architecture", "client", "server", "host", "components", "structure"]
    },

    "mcp resources": {
        title: "MCP Resources",
        content: `<strong>Resources</strong> are how MCP servers expose data and content to LLMs. They represent any kind of data that an MCP server wants to make available.

<strong>Common Resource Types:</strong>
• <code>text/plain</code> - Plain text content
• <code>text/html</code> - HTML content
• <code>application/json</code> - JSON data
• <code>image/*</code> - Image files
• <code>application/pdf</code> - PDF documents

<strong>Resource Example:</strong>
<pre>
{
  "uri": "file:///path/to/document.txt",
  "name": "Important Document",
  "description": "Contains project specifications",
  "mimeType": "text/plain"
}
</pre>

<strong>Best Practices:</strong>
• Use descriptive names and URIs
• Include appropriate MIME types
• Provide meaningful descriptions
• Implement proper access controls`,
        keywords: ["resources", "data", "content", "uri", "mime type", "text", "json"]
    },

    "mcp tools": {
        title: "MCP Tools",
        content: `<strong>Tools</strong> enable LLMs to perform actions through your MCP server. They're like functions that the LLM can call to interact with your system.

<strong>Tool Components:</strong>
• <strong>Name:</strong> Unique identifier for the tool
• <strong>Description:</strong> What the tool does
• <strong>Input Schema:</strong> Expected parameters
• <strong>Handler:</strong> Function that executes the tool

<strong>Python Tool Example:</strong>
<pre>
@server.tool("create_file")
async def create_file(name: str, content: str) -> str:
    """Create a new file with the given content."""
    try:
        with open(name, 'w') as f:
            f.write(content)
        return f"Successfully created {name}"
    except Exception as e:
        return f"Error creating file: {str(e)}"
</pre>

<strong>Tool Schema:</strong>
<pre>
{
  "name": "create_file",
  "description": "Create a new file with specified content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "content": {"type": "string"}
    },
    "required": ["name", "content"]
  }
}
</pre>`,
        keywords: ["tools", "actions", "functions", "execute", "handler", "schema", "parameters"]
    },

    "create mcp server": {
        title: "How to Create an MCP Server",
        content: `<strong>Step-by-step guide to create an MCP server:</strong>

<strong>1. Choose Your Language</strong>
MCP provides SDKs for:
• Python
• TypeScript/JavaScript
• C#
• Java
• Kotlin
• Ruby
• Swift

<strong>2. Basic Python Server Setup:</strong>
<pre>
# Install the MCP SDK
pip install mcp

# Basic server structure
from mcp.server import Server
from mcp.types import Resource, Tool
import asyncio

# Create server instance
server = Server("my-mcp-server")

@server.resource("config")
async def get_config() -> Resource:
    return Resource(
        uri="config://app-settings",
        name="Application Settings",
        mimeType="application/json"
    )

@server.tool("echo")
async def echo_tool(message: str) -> str:
    return f"Echo: {message}"

# Run the server
if __name__ == "__main__":
    asyncio.run(server.run())
</pre>

<strong>3. Server Configuration:</strong>
<pre>
# Add to your Claude Desktop config
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["path/to/your/server.py"]
    }
  }
}
</pre>`,
        keywords: ["create", "server", "setup", "python", "typescript", "javascript", "implementation"]
    },

    "mcp prompts": {
        title: "MCP Prompts",
        content: `<strong>Prompts</strong> in MCP are reusable prompt templates that servers can provide to clients.

<strong>Prompt Structure:</strong>
• <strong>Name:</strong> Unique identifier
• <strong>Description:</strong> What the prompt does
• <strong>Arguments:</strong> Parameters the prompt accepts
• <strong>Messages:</strong> The actual prompt content

<strong>Python Prompt Example:</strong>
<pre>
@server.prompt("code_review")
async def code_review_prompt(
    code: str,
    language: str = "python"
) -> list[Message]:
    return [
        Message(
            role="user",
            content=f"""
Please review this {language} code:

{code}

Focus on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance optimizations
4. Security considerations
"""
        )
    ]
</pre>

<strong>Using Prompts:</strong>
Prompts help standardize common LLM interactions and make them reusable across different contexts.`,
        keywords: ["prompts", "templates", "messages", "reusable", "standardize"]
    },

    "mcp sampling": {
        title: "MCP Sampling",
        content: `<strong>Sampling</strong> allows MCP servers to request completions from LLMs, enabling servers to use AI capabilities.

<strong>Use Cases:</strong>
• Text generation and completion
• Data analysis and summarization
• Code generation
• Content transformation

<strong>Python Sampling Example:</strong>
<pre>
@server.tool("generate_summary")
async def generate_summary(text: str) -> str:
    # Request LLM completion
    result = await server.request_sampling(
        messages=[
            Message(
                role="user",
                content=f"Summarize this text: {text}"
            )
        ],
        max_tokens=150
    )
    
    return result.content
</pre>

<strong>Best Practices:</strong>
• Use appropriate max_tokens limits
• Handle errors gracefully
• Consider rate limiting
• Cache results when possible`,
        keywords: ["sampling", "completions", "llm", "generation", "ai", "text"]
    },

    "mcp transports": {
        title: "MCP Transports",
        content: `<strong>Transports</strong> define how MCP clients and servers communicate.

<strong>Available Transports:</strong>
• <strong>Standard I/O (stdio):</strong> Default transport using stdin/stdout
• <strong>HTTP/HTTPS:</strong> Web-based transport
• <strong>WebSocket:</strong> Real-time bidirectional communication

<strong>Stdio Transport (Default):</strong>
<pre>
# Client connects via process spawn
{
  "command": "python",
  "args": ["server.py"]
}
</pre>

<strong>HTTP Transport:</strong>
<pre>
# Server setup
from mcp.server.fastapi import FastAPIServer

app = FastAPIServer("my-server")

# Client connection
{
  "url": "http://localhost:8000/mcp"
}
</pre>

<strong>WebSocket Transport:</strong>
<pre>
# For real-time applications
from mcp.server.websocket import WebSocketServer

server = WebSocketServer("my-server")
</pre>`,
        keywords: ["transports", "communication", "stdio", "http", "websocket", "connection"]
    },

    "python mcp example": {
        title: "Complete Python MCP Server Example",
        content: `<strong>Full-featured MCP server example:</strong>

<pre>
#!/usr/bin/env python3
"""
Complete MCP Server Example
Demonstrates resources, tools, and prompts
"""

from mcp.server import Server
from mcp.types import Resource, Tool, Prompt, Message
import asyncio
import json
import os

# Create server instance
server = Server("example-server")

# Sample data
tasks = []

@server.resource("tasks")
async def get_tasks() -> Resource:
    """Expose current tasks as a resource."""
    return Resource(
        uri="tasks://all",
        name="All Tasks",
        description="List of all current tasks",
        mimeType="application/json"
    )

@server.tool("add_task")
async def add_task(title: str, description: str = "") -> str:
    """Add a new task to the list."""
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "description": description,
        "completed": False
    }
    tasks.append(task)
    return f"Added task: {title}"

@server.tool("complete_task")
async def complete_task(task_id: int) -> str:
    """Mark a task as completed."""
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            return f"Completed task: {task['title']}"
    return f"Task {task_id} not found"

@server.tool("list_tasks")
async def list_tasks() -> str:
    """List all tasks with their status."""
    if not tasks:
        return "No tasks found"
    
    result = "📋 Current Tasks:\\n"
    for task in tasks:
        status = "✅" if task["completed"] else "⏳"
        result += f"{status} {task['id']}: {task['title']}\\n"
    
    return result

@server.prompt("task_analysis")
async def task_analysis_prompt(
    focus: str = "productivity"
) -> list[Message]:
    """Generate a prompt for task analysis."""
    return [
        Message(
            role="user",
            content=f"""
Analyze these tasks from a {focus} perspective:

{json.dumps(tasks, indent=2)}

Please provide:
1. Overall assessment
2. Recommendations for improvement
3. Priority suggestions
"""
        )
    ]

# Server startup
async def main():
    # Run server
    await server.run()

if __name__ == "__main__":
    asyncio.run(main())
</pre>

<strong>Installation & Setup:</strong>
<pre>
# Install dependencies
pip install mcp

# Run the server
python example_server.py
</pre>`,
        keywords: ["python", "example", "complete", "server", "tasks", "tools", "resources"]
    },

    "mcp best practices": {
        title: "MCP Best Practices",
        content: `<strong>🚀 MCP Development Best Practices</strong>

<strong>1. Server Design:</strong>
• Keep servers focused on specific domains
• Use clear, descriptive names for tools and resources
• Implement proper error handling
• Add comprehensive logging

<strong>2. Security:</strong>
• Validate all inputs thoroughly
• Implement proper authentication when needed
• Use least privilege principle
• Sanitize file paths and user inputs

<strong>3. Performance:</strong>
• Cache frequently accessed resources
• Implement async operations properly
• Use connection pooling for databases
• Set appropriate timeouts

<strong>4. Error Handling:</strong>
<pre>
@server.tool("safe_operation")
async def safe_operation(input_data: str) -> str:
    try:
        # Validate input
        if not input_data.strip():
            raise ValueError("Input cannot be empty")
        
        # Process data
        result = process_data(input_data)
        return result
        
    except ValueError as e:
        return f"Validation error: {str(e)}"
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return "An unexpected error occurred"
</pre>

<strong>5. Documentation:</strong>
• Document all tools and resources
• Provide clear examples
• Include usage guidelines
• Maintain changelog

<strong>6. Testing:</strong>
• Unit test all tool functions
• Test error scenarios
• Validate resource access
• Test with different clients`,
        keywords: ["best practices", "security", "performance", "error handling", "testing", "documentation"]
    },

    "mcp troubleshooting": {
        title: "MCP Troubleshooting",
        content: `<strong>🔧 Common MCP Issues and Solutions</strong>

<strong>1. Connection Issues:</strong>
<strong>Problem:</strong> Server not connecting to client
<strong>Solutions:</strong>
• Check server configuration in client settings
• Verify command path and arguments
• Ensure server script is executable
• Check for port conflicts (HTTP transport)

<strong>2. Tool Execution Errors:</strong>
<strong>Problem:</strong> Tools failing to execute
<strong>Solutions:</strong>
• Validate input schemas match exactly
• Check for missing required parameters
• Verify async/await usage
• Add comprehensive error handling

<strong>3. Resource Access Issues:</strong>
<strong>Problem:</strong> Resources not accessible
<strong>Solutions:</strong>
• Check file permissions
• Verify resource URIs are correct
• Ensure proper MIME type specification
• Validate resource existence

<strong>4. Debug Logging:</strong>
<pre>
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@server.tool("debug_tool")
async def debug_tool(input_data: str) -> str:
    logger.debug(f"Received input: {input_data}")
    try:
        result = process_input(input_data)
        logger.debug(f"Processing result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in debug_tool: {str(e)}")
        raise
</pre>

<strong>5. Common Error Messages:</strong>
• <strong>"Server not found":</strong> Check configuration file
• <strong>"Invalid schema":</strong> Verify tool parameter types
• <strong>"Permission denied":</strong> Check file/directory permissions
• <strong>"Connection refused":</strong> Verify server is running

<strong>6. Testing Your Server:</strong>
<pre>
# Test server locally
python -m mcp.client test your_server.py

# Validate server configuration
python -m mcp.validate config.json
</pre>`,
        keywords: ["troubleshooting", "debugging", "errors", "issues", "problems", "solutions", "connection"]
    },

    "mcp use cases": {
        title: "MCP Use Cases and Examples",
        content: `<strong>🎯 Real-world MCP Applications</strong>

<strong>1. File Management Server:</strong>
• Read/write files
• Directory operations
• File search and indexing
• Version control integration

<strong>2. Database Integration:</strong>
• Query execution
• Data analysis
• Report generation
• Schema inspection

<strong>3. API Integration:</strong>
• External service access
• Data synchronization
• Webhook handling
• Rate limiting

<strong>4. Development Tools:</strong>
• Code analysis
• Testing automation
• Deployment scripts
• Documentation generation

<strong>5. Content Management:</strong>
• Document processing
• Image manipulation
• Content transformation
• Metadata extraction

<strong>Example Use Case - Weather Server:</strong>
<pre>
@server.tool("get_weather")
async def get_weather(city: str) -> str:
    """Get current weather for a city."""
    # Integration with weather API
    weather_data = await fetch_weather_api(city)
    
    return f"""
Weather in {city}:
Temperature: {weather_data['temp']}°C
Condition: {weather_data['condition']}
Humidity: {weather_data['humidity']}%
"""

@server.resource("weather_forecast")
async def weather_forecast() -> Resource:
    """Provide weather forecast data."""
    return Resource(
        uri="weather://forecast",
        name="Weather Forecast",
        description="7-day weather forecast",
        mimeType="application/json"
    )
</pre>

<strong>Integration Benefits:</strong>
• Standardized access to diverse data sources
• Consistent API across different tools
• Easy switching between LLM providers
• Reusable components across projects`,
        keywords: ["use cases", "examples", "applications", "integration", "weather", "database", "files"]
    },

    "mcp configuration": {
        title: "MCP Configuration",
        content: `<strong>⚙️ MCP Server Configuration</strong>

<strong>Claude Desktop Configuration:</strong>
<pre>
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["path/to/server.py"],
      "env": {
        "API_KEY": "your-api-key"
      }
    },
    "nodejs-server": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
</pre>

<strong>Environment Variables:</strong>
<pre>
# In your server code
import os

API_KEY = os.getenv("API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///default.db")
DEBUG_MODE = os.getenv("DEBUG", "false").lower() == "true"
</pre>

<strong>Server Settings:</strong>
<pre>
# Server configuration
server = Server(
    name="my-server",
    version="1.0.0",
    description="My MCP Server",
    author="Your Name",
    license="MIT"
)

# Configure timeouts
server.configure(
    request_timeout=30,
    max_concurrent_requests=10,
    enable_logging=True
)
</pre>

<strong>Advanced Configuration:</strong>
<pre>
# Custom server with advanced options
from mcp.server import Server, ServerOptions

options = ServerOptions(
    max_memory_mb=512,
    enable_telemetry=False,
    custom_headers={"X-Server-Version": "1.0.0"}
)

server = Server("advanced-server", options=options)
</pre>`,
        keywords: ["configuration", "setup", "claude desktop", "environment", "settings", "options"]
    }
};

// Search function to find relevant knowledge
function searchKnowledge(query) {
    query = query.toLowerCase();
    const results = [];
    
    for (const [key, item] of Object.entries(mcpKnowledgeBase)) {
        let score = 0;
        
        // Check title match
        if (item.title.toLowerCase().includes(query)) {
            score += 10;
        }
        
        // Check keyword matches
        for (const keyword of item.keywords) {
            if (query.includes(keyword) || keyword.includes(query)) {
                score += 5;
            }
        }
        
        // Check content matches (basic)
        if (item.content.toLowerCase().includes(query)) {
            score += 2;
        }
        
        if (score > 0) {
            results.push({ ...item, score });
        }
    }
    
    // Sort by score and return top results
    return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mcpKnowledgeBase, searchKnowledge };
} 