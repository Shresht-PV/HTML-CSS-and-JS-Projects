// Database Connection
// database.js
const mongoose = require('mongoose');

// MongoDB connection string
const uri = "mongodb://localhost:27017/dynamicWebsiteDB";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Database connection error:", err));
