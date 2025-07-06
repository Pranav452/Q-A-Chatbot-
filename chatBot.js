// MCP Q&A Chatbot Engine
class MCPChatBot {
    constructor() {
        this.conversationHistory = [];
        this.defaultResponses = {
            greeting: "Hello! I'm here to help you with Model Context Protocol questions. What would you like to know about MCP?",
            
            fallback: `I couldn't find a specific answer to your question in my knowledge base. I can help you with:

• MCP concepts and architecture
• Server implementation and setup
• Resources, tools, and prompts
• Best practices and troubleshooting
• Code examples and use cases

Please try asking a more specific question about MCP.`,
            
            unclear: "I'm not sure I understand your question. Could you please rephrase it or ask about a specific MCP topic?"
        };
    }

    // Main method to process user input and generate response
    async processQuery(userInput) {
        // Clean and normalize input
        const cleanInput = this.cleanInput(userInput);
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'user',
            content: userInput,
            timestamp: new Date()
        });

        // Generate response
        let response = await this.generateResponse(cleanInput);
        
        // Add response to conversation history
        this.conversationHistory.push({
            type: 'assistant',
            content: response,
            timestamp: new Date()
        });

        return response;
    }

    // Clean and normalize user input
    cleanInput(input) {
        return input.toLowerCase().trim();
    }

    // Generate response based on user input
    async generateResponse(cleanInput) {
        // Check for greetings
        if (this.isGreeting(cleanInput)) {
            return this.defaultResponses.greeting;
        }

        // Check for help requests
        if (this.isHelpRequest(cleanInput)) {
            return this.getHelpResponse();
        }

        // Search knowledge base
        const searchResults = searchKnowledge(cleanInput);
        
        if (searchResults.length === 0) {
            return this.defaultResponses.fallback;
        }

        // Generate response based on search results
        return this.formatResponse(searchResults, cleanInput);
    }

    // Check if input is a greeting
    isGreeting(input) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => input.includes(greeting));
    }

    // Check if input is a help request
    isHelpRequest(input) {
        const helpKeywords = ['help', 'assist', 'guide', 'how to use', 'what can you do'];
        return helpKeywords.some(keyword => input.includes(keyword));
    }

    // Get help response
    getHelpResponse() {
        return `I can help you with Model Context Protocol topics:

**MCP Fundamentals:**
• What is MCP and how it works
• Architecture and core concepts
• Client-server relationships

**Implementation:**
• Creating MCP servers
• Working with resources, tools, and prompts
• Configuration and setup

**Best Practices:**
• Security considerations
• Performance optimization
• Error handling and debugging

**Troubleshooting:**
• Common issues and solutions
• Debugging techniques
• Configuration problems

Ask me specific questions like "What is MCP?" or "How do I create an MCP server?"`;
    }

    // Format response based on search results
    formatResponse(searchResults, query) {
        const topResult = searchResults[0];
        
        let response = topResult.content;
        
        // Add related topics if there are multiple results
        if (searchResults.length > 1) {
            response += `\n\n**Related topics:**`;
            for (let i = 1; i < Math.min(3, searchResults.length); i++) {
                response += `\n• ${searchResults[i].title}`;
            }
        }

        return response;
    }

    // Get conversation history
    getConversationHistory() {
        return this.conversationHistory;
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
    }

    // Smart query preprocessing
    preprocessQuery(query) {
        // Expand common abbreviations
        const expansions = {
            'mcp': 'model context protocol',
            'api': 'application programming interface',
            'sdk': 'software development kit',
            'cli': 'command line interface',
            'json': 'javascript object notation',
            'http': 'hypertext transfer protocol',
            'ws': 'websocket',
            'stdio': 'standard input output'
        };

        let processedQuery = query.toLowerCase();
        
        for (const [abbr, expansion] of Object.entries(expansions)) {
            const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
            processedQuery = processedQuery.replace(regex, expansion);
        }

        return processedQuery;
    }
}

// Initialize chatbot instance
const mcpChatBot = new MCPChatBot();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MCPChatBot, mcpChatBot };
} 