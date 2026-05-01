require('dotenv').config();
const http = require('http');

// 1. START HEALTH CHECK SERVER IMMEDIATELY (Required for Render.com)
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HerHealth Bot is running!');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[System] Health check server listening on port ${PORT}`);
});

// 2. LOAD OTHER DEPENDENCIES
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { setupHandlers } = require('./handlers');
const { getAllUsers, getUserState } = require('./utils/state');
const { getArticle } = require('./utils/i18n');

// 3. CHECK FOR API KEYS
if (!process.env.BOT_TOKEN) {
  console.error('❌ ERROR: BOT_TOKEN is missing!');
  console.error('👉 If you are on Render, add BOT_TOKEN to your Environment Variables in the Dashboard.');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// Setup bot handlers
setupHandlers(bot);

// Daily Cron Job for tips
cron.schedule('0 9 * * *', () => {
  const users = getAllUsers();
  users.forEach((userId) => {
    const state = getUserState(userId);
    const tip = getArticle(state.language, 'confidence');
    bot.telegram.sendMessage(userId, `🌟 Daily Tip:\n\n${tip}`).catch((err) => {
      console.log(`Failed to send daily tip to ${userId}:`, err.message);
    });
  });
});

// Launch bot
console.log(`[System] Starting bot...`);

bot.launch()
  .then(() => {
    console.log('✅ HerHealth Bot is successfully connected to Telegram!');
  })
  .catch((err) => {
    console.error('❌ Failed to start bot:', err);
    // We don't exit here immediately to keep the health check server alive 
    // but Render will likely restart it anyway if the health check fails.
  });

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT');
  server.close();
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  server.close();
});
