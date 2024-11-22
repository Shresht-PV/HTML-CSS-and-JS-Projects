// Client-Side JavaScript
// script.js
// Example: Dynamic content update
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dynamic website loaded successfully!");
});

// Fetch and display messages
async function fetchMessages() {
    const response = await fetch('/messages');
    const messages = await response.json();
    const messagesList = document.getElementById('messages');
    messagesList.innerHTML = '';

    messages.forEach(msg => {
        const listItem = document.createElement('li');
        listItem.textContent = `${msg.name}: ${msg.message}`;
        messagesList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", fetchMessages);

