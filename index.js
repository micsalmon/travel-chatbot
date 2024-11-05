require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const chatbotRoutes = require('./routes/chatbotRoutes'); // Import the routes

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the chatbot routes
app.use('/', chatbotRoutes);

app.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:${port}`);
});
