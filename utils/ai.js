const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is present
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

async function generateAnswer(question) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not configured in .env');
  }

  try {
    // For fast, conversational text tasks, gemini-1.5-flash is ideal
    // We pass a system instruction to set the bot's persona
    const systemInstruction = `You are a helpful, empathetic, and knowledgeable assistant for women's health. 
Your primary directive is to ONLY answer questions related to women's health, hygiene, emotional well-being, and related topics.
If a user asks a question that is NOT related to these topics, you must politely decline to answer and remind them that you are specifically designed to discuss women's health topics.
You should provide clear, factual, and comforting answers.
Always include a disclaimer that you are an AI and they should consult a doctor for serious medical concerns.
Keep your answers concise, ideally under 3 paragraphs, since they will be read on Telegram.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    });

    const chat = model.startChat();

    const result = await chat.sendMessage(question);
    return result.response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again later.";
  }
}

module.exports = { generateAnswer };
