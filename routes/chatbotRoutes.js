const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle chatbot conversation
router.post('/chat', async (req, res) => {
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

module.exports = router;
