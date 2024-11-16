// server/app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const routes = require('./routes'); // Import routes

const app = express();

// SSL certificate for HTTPS
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.cert'))
};

// Middleware to serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes from routes.js
app.use(routes);

// Create HTTPS server
https.createServer(sslOptions, app).listen(3000, () => {
    console.log('E-commerce site running on https://localhost:3000');
});

// Optional: HTTP redirect to HTTPS
http.createServer((req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
}).listen(80);
