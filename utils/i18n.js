const fs = require('fs');
const path = require('path');

const en = require('../content/en.json');
const pidgin = require('../content/pidgin.json');
const ha = require('../content/ha.json');

const articles = require('../data/articles.json');

const strings = { en, pidgin, ha };

function getText(lang, key) {
  return strings[lang][key] || strings['en'][key] || key;
}

function getArticle(lang, key) {
  return articles[lang][key] || articles['en'][key] || "Article not found.";
}

module.exports = { getText, getArticle };
