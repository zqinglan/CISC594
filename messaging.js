// Messaging System for UniRoomie

// Sample data for demonstration
const currentUser = {
    id: 0,
    name: "You",
    avatar: "Y"
};

// Sample connection requests
let connectionRequests = [
    {
        id: 1,
        from: {
            id: 1,
            name: "Alex Johnson",
            occupation: "Graduate Student",
            university: "State University",
            avatar: "AJ"
        },
        message: "Hey! I saw your profile and we seem to have similar lifestyles. Would love to connect!",
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
        id: 2,
        from: {
            id: 2,
            name: "Sarah Chen",
            occupation: "Undergraduate Student",
            university: "State University",
            avatar: "SC"
        },
        message: "Hi! Looking for a roommate and your profile caught my eye. Let's chat!",
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
];

// Sample connections (mutually connected users)
let connections = [
    {
        id: 3,
        name: "Mike Rodriguez",
        occupation: "Software Engineer",
        university: "Tech Institute",
        avatar: "MR",
        status: "online",
        lastMessage: "Thanks for the info! I'll check it out.",
        lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
        unreadCount: 0
    },
    {
        id: 4,
        name: "Emily Davis",
        occupation: "Medical Student",
        university: "Medical School",
        avatar: "ED",
        status: "offline",
        lastMessage: "Perfect! Let's meet up this weekend.",
        lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
        unreadCount: 2
    }
];

// Sample messages for each connection
const messages = {
    3: [
        {
            id: 1,
            senderId: 3,
            text: "Hey! I'm interested in finding a roommate. Are you still looking?",
            timestamp: new Date(Date.now() - 3600000),
            type: "received"
        },
        {
            id: 2,
            senderId: 0,
            text: "Yes, I am! What's your budget range?",
            timestamp: new Date(Date.now() - 3500000),
            type: "sent"
        },
        {
            id: 3,
            senderId: 3,
            text: "I'm looking for $800-1200. What about you?",
            timestamp: new Date(Date.now() - 3400000),
            type: "received"
        },
        {
            id: 4,
            senderId: 0,
            text: "Perfect! That's exactly my range too.",
            timestamp: new Date(Date.now() - 3300000),
            type: "sent"
        },
        {
            id: 5,
            senderId: 3,
            text: "Thanks for the info! I'll check it out.",
            timestamp: new Date(Date.now() - 1800000),
            type: "received"
        }
    ],
    4: [
        {
            id: 1,
            senderId: 4,
            text: "Hi! I'm a medical student looking for a quiet roommate.",
            timestamp: new Date(Date.now() - 86400000),
            type: "received"
        },
        {
            id: 2,
            senderId: 0,
            text: "That sounds perfect! I'm also looking for a quiet environment.",
            timestamp: new Date(Date.now() - 86300000),
            type: "sent"
        },
        {
            id: 3,
            senderId: 4,
            text: "Great! What's your schedule like?",
            timestamp: new Date(Date.now() - 86200000),
            type: "received"
        },
        {
            id: 4,
            senderId: 0,
            text: "I work regular hours, so I'm usually home in the evenings.",
            timestamp: new Date(Date.now() - 86100000),
            type: "sent"
        },
        {
            id: 5,
            senderId: 4,
            text: "Perfect! Let's meet up this weekend.",
            timestamp: new Date(Date.now() - 86000000),
            type: "received"
        }
    ]
};

// Current state
let currentChat = null;
let currentConnection = null;

// DOM elements
const connectionRequestsContainer = document.getElementById('connectionRequests');
const connectionsListContainer = document.getElementById('connectionsList');
const chatMessagesContainer = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const noChatSelected = document.getElementById('noChatSelected');
const activeChat = document.getElementById('activeChat');
const chatUserName = document.getElementById('chatUserName');
const chatUserInitials = document.getElementById('chatUserInitials');
const connectionModal = document.getElementById('connectionModal');
const newMessageModal = document.getElementById('newMessageModal');
const newMessageBtn = document.getElementById('newMessageBtn');
const userSearch = document.getElementById('userSearch');
const searchResults = document.getElementById('searchResults');

// Initialize the messaging system
document.addEventListener('DOMContentLoaded', function () {
    loadConnectionRequests();
    loadConnections();
    setupEventListeners();

    // Check if user came from discovery page with a contact profile
    const contactProfile = sessionStorage.getItem('contactProfile');
    if (contactProfile) {
        const profile = JSON.parse(contactProfile);
        sessionStorage.removeItem('contactProfile'); // Clear after use

        // Show notification about the contact
        showNotification(`Ready to connect with ${profile.name}! Use the "New Message" button to start a conversation.`, 'info');
    } else {
        showNotification('Messaging system loaded successfully!', 'success');
    }
});

// Setup event listeners
function setupEventListeners() {
    // Message input
    messageInput.addEventListener('input', handleMessageInput);
    messageInput.addEventListener('keypress', handleMessageKeypress);

    // Send message button
    sendMessageBtn.addEventListener('click', sendMessage);

    // Modal close buttons
    document.getElementById('closeModal').addEventListener('click', closeConnectionModal);
    document.getElementById('closeNewMessageModal').addEventListener('click', closeNewMessageModal);

    // New message button
    newMessageBtn.addEventListener('click', openNewMessageModal);

    // User search
    userSearch.addEventListener('input', handleUserSearch);

    // Accept/decline request buttons
    document.getElementById('acceptRequest').addEventListener('click', acceptConnectionRequest);
    document.getElementById('declineRequest').addEventListener('click', declineConnectionRequest);

    // Close modals when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === connectionModal) {
            closeConnectionModal();
        }
        if (event.target === newMessageModal) {
            closeNewMessageModal();
        }
    });
}

// Load connection requests
function loadConnectionRequests() {
    if (connectionRequests.length === 0) {
        connectionRequestsContainer.innerHTML = `
            <div class="empty-requests">
                <i class="fas fa-user-plus"></i>
                <p>No pending connection requests</p>
            </div>
        `;
        return;
    }

    const requestsHTML = connectionRequests.map(request => `
        <div class="request-item" onclick="viewConnectionRequest(${request.id})">
            <div class="request-avatar">
                ${request.from.avatar}
            </div>
            <div class="request-info">
                <div class="request-name">${request.from.name}</div>
                <div class="request-meta">${request.from.occupation} • ${formatTimeAgo(request.timestamp)}</div>
            </div>
            <div class="request-actions">
                <button class="request-btn accept-btn" onclick="event.stopPropagation(); acceptRequest(${request.id})" title="Accept">
                    <i class="fas fa-check"></i>
                </button>
                <button class="request-btn decline-btn" onclick="event.stopPropagation(); declineRequest(${request.id})" title="Decline">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');

    connectionRequestsContainer.innerHTML = requestsHTML;
}

// Load connections
function loadConnections() {
    if (connections.length === 0) {
        connectionsListContainer.innerHTML = `
            <div class="empty-connections">
                <i class="fas fa-users"></i>
                <p>No connections yet</p>
                <p>Start by accepting connection requests or sending new ones!</p>
            </div>
        `;
        return;
    }

    const connectionsHTML = connections.map(connection => `
        <div class="connection-item" onclick="openChat(${connection.id})">
            <div class="connection-avatar">
                ${connection.avatar}
                <div class="connection-status status-${connection.status}"></div>
            </div>
            <div class="connection-info">
                <div class="connection-name">${connection.name}</div>
                <div class="connection-last-message">${connection.lastMessage}</div>
            </div>
            <div class="connection-meta">
                <div class="connection-time">${formatTimeAgo(connection.lastMessageTime)}</div>
                ${connection.unreadCount > 0 ? `<div class="unread-badge">${connection.unreadCount}</div>` : ''}
            </div>
        </div>
    `).join('');

    connectionsListContainer.innerHTML = connectionsHTML;
}

// Open chat with a connection
function openChat(connectionId) {
    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    currentConnection = connection;
    currentChat = connectionId;

    // Update UI
    chatUserName.textContent = connection.name;
    chatUserInitials.textContent = connection.avatar;

    // Show active chat
    noChatSelected.style.display = 'none';
    activeChat.style.display = 'flex';

    // Update connection item styling
    document.querySelectorAll('.connection-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.connection-item').classList.add('active');

    // Load messages
    loadMessages(connectionId);

    // Clear unread count
    connection.unreadCount = 0;
    loadConnections(); // Refresh the list
}

// Load messages for a connection
function loadMessages(connectionId) {
    const connectionMessages = messages[connectionId] || [];

    if (connectionMessages.length === 0) {
        chatMessagesContainer.innerHTML = `
            <div class="no-messages">
                <p>No messages yet. Start the conversation!</p>
            </div>
        `;
        return;
    }

    const messagesHTML = connectionMessages.map(message => `
        <div class="message ${message.type}">
            <div class="message-avatar">
                ${message.type === 'sent' ? currentUser.avatar : currentConnection.avatar}
            </div>
            <div class="message-content">
                <div class="message-text">${message.text}</div>
                <div class="message-time">${formatTime(message.timestamp)}</div>
            </div>
        </div>
    `).join('');

    chatMessagesContainer.innerHTML = messagesHTML;
    scrollToBottom();
}

// Handle message input
function handleMessageInput() {
    const message = messageInput.value.trim();
    sendMessageBtn.disabled = message.length === 0;
}

// Handle message keypress (Enter to send)
function handleMessageKeypress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send a message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText || !currentChat) return;

    // Create new message
    const newMessage = {
        id: Date.now(),
        senderId: currentUser.id,
        text: messageText,
        timestamp: new Date(),
        type: 'sent'
    };

    // Add to messages
    if (!messages[currentChat]) {
        messages[currentChat] = [];
    }
    messages[currentChat].push(newMessage);

    // Update connection's last message
    const connection = connections.find(c => c.id === currentChat);
    if (connection) {
        connection.lastMessage = messageText;
        connection.lastMessageTime = new Date();
        loadConnections(); // Refresh the list
    }

    // Add message to UI
    const messageHTML = `
        <div class="message sent">
            <div class="message-avatar">
                ${currentUser.avatar}
            </div>
            <div class="message-content">
                <div class="message-text">${messageText}</div>
                <div class="message-time">${formatTime(new Date())}</div>
            </div>
        </div>
    `;

    chatMessagesContainer.insertAdjacentHTML('beforeend', messageHTML);

    // Clear input
    messageInput.value = '';
    sendMessageBtn.disabled = true;

    // Scroll to bottom
    scrollToBottom();

    // Simulate typing indicator and response (for demo)
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            simulateResponse();
        }, 2000);
    }, 1000);
}

// Show typing indicator
function showTypingIndicator() {
    const typingHTML = `
        <div class="typing-indicator" id="typingIndicator">
            <span>${currentConnection.name} is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Simulate response (for demo purposes)
function simulateResponse() {
    const responses = [
        "That sounds great!",
        "I'll get back to you on that.",
        "Thanks for letting me know!",
        "Perfect timing!",
        "I'm interested in that too.",
        "Let's discuss this further.",
        "That works for me!",
        "I'll think about it and let you know."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const responseMessage = {
        id: Date.now(),
        senderId: currentConnection.id,
        text: randomResponse,
        timestamp: new Date(),
        type: 'received'
    };

    messages[currentChat].push(responseMessage);

    const messageHTML = `
        <div class="message received">
            <div class="message-avatar">
                ${currentConnection.avatar}
            </div>
            <div class="message-content">
                <div class="message-text">${randomResponse}</div>
                <div class="message-time">${formatTime(new Date())}</div>
            </div>
        </div>
    `;

    chatMessagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// View connection request details
function viewConnectionRequest(requestId) {
    const request = connectionRequests.find(r => r.id === requestId);
    if (!request) return;

    const requestUserInfo = document.getElementById('requestUserInfo');
    requestUserInfo.innerHTML = `
        <div class="request-user-avatar">
            ${request.from.avatar}
        </div>
        <div class="request-user-details">
            <h4>${request.from.name}</h4>
            <p>${request.from.occupation}</p>
            <p>${request.from.university}</p>
            <p><strong>Message:</strong> ${request.message}</p>
        </div>
    `;

    // Store current request ID for accept/decline actions
    connectionModal.dataset.requestId = requestId;
    connectionModal.style.display = 'flex';
}

// Accept connection request
function acceptConnectionRequest() {
    const requestId = parseInt(connectionModal.dataset.requestId);
    const request = connectionRequests.find(r => r.id === requestId);

    if (request) {
        // Add to connections
        const newConnection = {
            id: request.from.id,
            name: request.from.name,
            occupation: request.from.occupation,
            university: request.from.university,
            avatar: request.from.avatar,
            status: 'online',
            lastMessage: request.message,
            lastMessageTime: new Date(),
            unreadCount: 0
        };

        connections.push(newConnection);

        // Initialize empty messages array
        messages[request.from.id] = [];

        // Remove from requests
        connectionRequests = connectionRequests.filter(r => r.id !== requestId);

        // Update UI
        loadConnectionRequests();
        loadConnections();
        closeConnectionModal();

        showNotification(`Connected with ${request.from.name}!`, 'success');
    }
}

// Decline connection request
function declineConnectionRequest() {
    const requestId = parseInt(connectionModal.dataset.requestId);
    const request = connectionRequests.find(r => r.id === requestId);

    if (request) {
        // Remove from requests
        connectionRequests = connectionRequests.filter(r => r.id !== requestId);

        // Update UI
        loadConnectionRequests();
        closeConnectionModal();

        showNotification(`Declined connection request from ${request.from.name}`, 'info');
    }
}

// Quick accept/decline functions for sidebar buttons
function acceptRequest(requestId) {
    const request = connectionRequests.find(r => r.id === requestId);
    if (request) {
        // Add to connections
        const newConnection = {
            id: request.from.id,
            name: request.from.name,
            occupation: request.from.occupation,
            university: request.from.university,
            avatar: request.from.avatar,
            status: 'online',
            lastMessage: request.message,
            lastMessageTime: new Date(),
            unreadCount: 0
        };

        connections.push(newConnection);
        messages[request.from.id] = [];

        // Remove from requests
        connectionRequests = connectionRequests.filter(r => r.id !== requestId);

        // Update UI
        loadConnectionRequests();
        loadConnections();

        showNotification(`Connected with ${request.from.name}!`, 'success');
    }
}

function declineRequest(requestId) {
    const request = connectionRequests.find(r => r.id === requestId);
    if (request) {
        connectionRequests = connectionRequests.filter(r => r.id !== requestId);
        loadConnectionRequests();
        showNotification(`Declined connection request from ${request.from.name}`, 'info');
    }
}

// Open new message modal
function openNewMessageModal() {
    newMessageModal.style.display = 'flex';
    userSearch.focus();
}

// Close new message modal
function closeNewMessageModal() {
    newMessageModal.style.display = 'none';
    userSearch.value = '';
    searchResults.innerHTML = '';
}

// Close connection modal
function closeConnectionModal() {
    connectionModal.style.display = 'none';
}

// Handle user search
function handleUserSearch() {
    const searchTerm = userSearch.value.trim().toLowerCase();

    if (searchTerm.length === 0) {
        searchResults.innerHTML = '';
        return;
    }

    // Sample users for search (in a real app, this would come from a database)
    const allUsers = [
        { id: 5, name: "David Kim", occupation: "Undergraduate Student", university: "State University", avatar: "DK" },
        { id: 6, name: "Lisa Thompson", occupation: "Marketing Manager", university: "Business School", avatar: "LT" },
        { id: 7, name: "James Wilson", occupation: "Architect", university: "Design Institute", avatar: "JW" },
        { id: 8, name: "Maria Garcia", occupation: "Undergraduate Student", university: "State University", avatar: "MG" },
        // Include roommate profiles from discovery page
        { id: 1, name: "Alex Johnson", occupation: "Graduate Student", university: "State University", avatar: "AJ" },
        { id: 2, name: "Sarah Chen", occupation: "Undergraduate Student", university: "State University", avatar: "SC" },
        { id: 3, name: "Mike Rodriguez", occupation: "Software Engineer", university: "Tech Institute", avatar: "MR" },
        { id: 4, name: "Emily Davis", occupation: "Medical Student", university: "Medical School", avatar: "ED" }
    ];

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.occupation.toLowerCase().includes(searchTerm) ||
        user.university.toLowerCase().includes(searchTerm)
    );

    if (filteredUsers.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><p>No users found</p></div>';
        return;
    }

    const searchResultsHTML = filteredUsers.map(user => `
        <div class="search-result-item" onclick="sendConnectionRequest(${user.id})">
            <div class="search-result-avatar">
                ${user.avatar}
            </div>
            <div class="search-result-info">
                <h4>${user.name}</h4>
                <p>${user.occupation} • ${user.university}</p>
            </div>
        </div>
    `).join('');

    searchResults.innerHTML = searchResultsHTML;
}

// Send connection request
function sendConnectionRequest(userId) {
    // In a real app, this would send a request to the server
    showNotification('Connection request sent!', 'success');
    closeNewMessageModal();
}

// Utility functions
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function scrollToBottom() {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Auto-refresh connections status (simulate real-time updates)
setInterval(() => {
    connections.forEach(connection => {
        // Randomly change status for demo purposes
        if (Math.random() > 0.8) {
            connection.status = connection.status === 'online' ? 'offline' : 'online';
        }
    });
    loadConnections();
}, 30000); // Update every 30 seconds 