// Main Application Script for MCP Q&A Chatbot
class MCPChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.newChatBtn = document.getElementById('newChatBtn');
        
        this.isTyping = false;
        this.setupEventListeners();
        this.setupInputAutoResize();
    }

    // Set up all event listeners
    setupEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        
        // Enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // New chat button
        this.newChatBtn.addEventListener('click', () => this.clearChat());

        // Update send button state
        this.userInput.addEventListener('input', () => {
            this.updateSendButtonState();
        });
    }

    // Setup textarea auto-resize
    setupInputAutoResize() {
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = Math.min(this.userInput.scrollHeight, 200) + 'px';
        });
    }

    // Update send button state based on input
    updateSendButtonState() {
        const hasText = this.userInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isTyping;
    }

    // Handle sending a message
    async handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        this.updateSendButtonState();

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Process message with chatbot
            const response = await mcpChatBot.processQuery(message);
            
            // Remove typing indicator and add assistant response
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
            
        } catch (error) {
            console.error('Error processing message:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error processing your question. Please try again.', 'assistant');
        }
    }

    // Add a message to the chat
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'user') {
            contentDiv.innerHTML = `<p>${this.escapeHtml(content)}</p>`;
        } else {
            contentDiv.innerHTML = content;
        }
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    // Escape HTML for user input
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show typing indicator
    showTypingIndicator() {
        this.isTyping = true;
        this.updateSendButtonState();
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    // Hide typing indicator
    hideTypingIndicator() {
        this.isTyping = false;
        this.updateSendButtonState();
        
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Scroll chat to bottom
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // Clear chat history
    clearChat() {
        // Remove all messages except the initial one
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach((message, index) => {
            if (index > 0) { // Keep the first message (initial assistant message)
                message.remove();
            }
        });
        
        // Clear chatbot history
        mcpChatBot.clearHistory();
        
        // Focus input
        this.userInput.focus();
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main app
    window.mcpChatApp = new MCPChatApp();
    
    console.log('MCP Q&A Chatbot initialized successfully!');
});

// Add global keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('userInput').focus();
    }
    
    // Ctrl/Cmd + L to clear chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (window.mcpChatApp) {
            window.mcpChatApp.clearChat();
        }
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MCPChatApp };
} 