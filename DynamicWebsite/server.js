// Server-Side Code
// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./auth');

app.use(bodyParser.json());

// Routes for authentication
app.post('/register', registerUser);
app.post('/login', loginUser);

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the About Us page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Route for the Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const Message = require('./models/Message');

// Route for contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).send("Message sent successfully!");
});

// Route to get messages
app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Middleware to serve static files and parse request bodies
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for About Us page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Route for Contact Us page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Route to handle Contact Form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Message from ${name} (${email}): ${message}`);
    res.send("Thank you for reaching out! We'll get back to you soon.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
