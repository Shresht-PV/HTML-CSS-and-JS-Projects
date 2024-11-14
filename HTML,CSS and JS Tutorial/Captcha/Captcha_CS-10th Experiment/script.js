// Hardcoded user credentials for demonstration purposes
const validUsername = "user";
const validPassword = "password";

// Function to generate a random 4-digit CAPTCHA
function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;
    const captchaText = document.getElementById('captchaText').innerText;

    if (username === validUsername && password === validPassword) {
        if (captchaInput === captchaText) {
            displayMessage("Authentication successful! Access granted.", "success");
        } else {
            displayMessage("Captcha verification failed. Access denied.", "error");
        }
    } else {
        displayMessage("Invalid username or password. Access denied.", "error");
    }
}

// Function to display a message to the user
function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.style.color = type === "success" ? "green" : "red";
}

// Initialize the CAPTCHA and add event listener to the form
window.onload = function () {
    document.getElementById('captchaText').innerText = generateCaptcha();
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
};
