require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const http = require('http');
const { setupHandlers } = require('./handlers');
const { getAllUsers, getUserState } = require('./utils/state');
const { getArticle } = require('./utils/i18n');

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN is not set in .env');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// Setup bot handlers
setupHandlers(bot);

// Daily Cron Job for tips
// Runs every day at 9:00 AM
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

// Simple Health Check Server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HerHealth Bot is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});

bot.launch()
  .then(() => console.log('HerHealth Bot is running!'))
  .catch((err) => console.error('Failed to start bot:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
