// server/routes.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Route for the homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the product page
router.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// You can add more routes here (like login, registration, etc.)

module.exports = router;
