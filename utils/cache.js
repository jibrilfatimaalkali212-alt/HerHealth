const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../data/ai_cache.json');

// Initialize cache file if it doesn't exist
if (!fs.existsSync(CACHE_FILE)) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify({}));
}

function getFromCache(question) {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const normalized = question.toLowerCase().trim();
    return cache[normalized];
  } catch (err) {
    console.error('Cache read error:', err);
    return null;
  }
}

function saveToCache(question, answer) {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const normalized = question.toLowerCase().trim();
    cache[normalized] = answer;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (err) {
    console.error('Cache save error:', err);
  }
}

module.exports = { getFromCache, saveToCache };
