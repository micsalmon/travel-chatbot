require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle chatbot conversation
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log(`Message: ${message}`);

  try {
    // Make a request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or "gpt-4" if you have access
      messages: [{ role: 'user', content: message }],
    });
    console.log(response.choices[0].message);

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error generating response:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while generating a response.' });
  }
});

app.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:${port}`);
});
