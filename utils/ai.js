const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const { getFromCache, saveToCache } = require('./cache');

// Initialize API clients
const geminiApiKey = process.env.GEMINI_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const SYSTEM_INSTRUCTION = `You are a helpful, empathetic, and knowledgeable assistant for women's health. 
Your primary directive is to ONLY answer questions related to women's health, hygiene, emotional well-being, and related topics.
If a user asks a question that is NOT related to these topics, you must politely decline to answer and remind them that you are specifically designed to discuss women's health topics.
You should provide clear, factual, and comforting answers.
Always include a disclaimer that you are an AI and they should consult a doctor for serious medical concerns.
Keep your answers concise, ideally under 3 paragraphs, since they will be read on Telegram.`;

async function generateWithGemini(question) {
  if (!genAI) throw new Error('Gemini not configured');
  
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] }
  });

  const chat = model.startChat();
  const result = await chat.sendMessage(question);
  return result.response.text();
}

async function generateWithOpenAI(question) {
  if (!openai) throw new Error('OpenAI not configured');

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SYSTEM_INSTRUCTION },
      { role: "user", content: question }
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content;
}

async function generateAnswer(question) {
  // 1. Check cache first
  const cachedResponse = getFromCache(question);
  if (cachedResponse) {
    console.log('[AI] Serving from cache');
    return cachedResponse;
  }

  // 2. Try Gemini (Primary)
  try {
    console.log('[AI] Attempting Gemini...');
    const answer = await generateWithGemini(question);
    saveToCache(question, answer);
    return answer;
  } catch (geminiError) {
    console.error('[AI] Gemini Error:', geminiError.message);
    
    // 3. Try OpenAI (Fallback)
    if (openai) {
      try {
        console.log('[AI] Falling back to OpenAI...');
        const answer = await generateWithOpenAI(question);
        saveToCache(question, answer);
        return answer;
      } catch (openaiError) {
        console.error('[AI] OpenAI Error:', openaiError.message);
      }
    }
    
    return "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again later.";
  }
}

module.exports = { generateAnswer };
