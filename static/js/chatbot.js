document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    // Function to add a message to the chat interface
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to send user message to the server and get AI response
    async function sendMessage() {
        const message = userMessageInput.value.trim();
        
        if (message) {
            // Add user message to the chat
            addMessage(message, true);
            
            // Clear input field
            userMessageInput.value = '';
            
            try {
                // Show typing indicator
                const typingDiv = document.createElement('div');
                typingDiv.className = 'message bot-message typing';
                const typingContent = document.createElement('div');
                typingContent.className = 'message-content';
                typingContent.textContent = 'Thinking...';
                typingDiv.appendChild(typingContent);
                chatMessages.appendChild(typingDiv);
                
                // Make API request to the backend
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message }),
                });
                
                const data = await response.json();
                
                // Remove typing indicator
                chatMessages.removeChild(typingDiv);
                
                if (data.error) {
                    addMessage('Sorry, I encountered an error: ' + data.error);
                } else {
                    // Add AI response to the chat
                    addMessage(data.response);
                }
            } catch (error) {
                // Remove typing indicator
                chatMessages.querySelector('.typing')?.remove();
                
                addMessage('Sorry, I encountered an error. Please try again.');
                console.error('Error:', error);
            }
        }
    }
    
    // Event listeners
    sendMessageBtn.addEventListener('click', sendMessage);
    
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initial greeting when page loads - already in HTML
});
// Function to send user message to the server and get AI response
async function sendMessage() {
    const message = userMessageInput.value.trim();
    
    if (message) {
        // Add user message to the chat
        addMessage(message, true);
        
        // Clear input field
        userMessageInput.value = '';
        
        try {
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing';
            const typingContent = document.createElement('div');
            typingContent.className = 'message-content';
            typingContent.textContent = 'Thinking...';
            typingDiv.appendChild(typingContent);
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Make API request to the backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            
            // Remove typing indicator
            if (typingDiv.parentNode) {
                chatMessages.removeChild(typingDiv);
            }
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Add AI response to the chat
            if (data.response) {
                addMessage(data.response);
            } else {
                addMessage("I'm sorry, I couldn't process your request at the moment. Please try again.");
            }
        } catch (error) {
            // Remove typing indicator if it still exists
            const typingIndicator = chatMessages.querySelector('.typing');
            if (typingIndicator) {
                chatMessages.removeChild(typingIndicator);
            }
            
            console.error('Error:', error);
            addMessage("I'm sorry, there was an error connecting to the server. Please try again later.");
        }
    }
}
// Function to handle URLs in the response (make them clickable)
function handleUrls(message) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return message.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message bot-message';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = handleUrls(message);  // Use handleUrls to parse any URLs in the message

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
// Function to send user message to the server and get AI response
async function sendMessage() {
    const message = userMessageInput.value.trim();
    
    if (message) {
        // Add user message to the chat
        addMessage(message, true);
        
        // Clear input field
        userMessageInput.value = '';
        
        try {
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing';
            const typingContent = document.createElement('div');
            typingContent.className = 'message-content';
            typingContent.textContent = 'Thinking...';
            typingDiv.appendChild(typingContent);
            chatMessages.appendChild(typingDiv);
            
            // Make API request to the backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            
            const data = await response.json();
            
            // Remove typing indicator
            chatMessages.removeChild(typingDiv);
            
            if (data.error) {
                addMessage('Sorry, I encountered an error: ' + data.error);
            } else {
                // Add AI response to the chat
                addMessage(data.response);
            }
        } catch (error) {
            // Remove typing indicator
            chatMessages.querySelector('.typing')?.remove();
            
            addMessage('Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        }
    }
}  