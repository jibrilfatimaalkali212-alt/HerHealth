const articles = require('../data/articles.json');

const keywordMap = {
  what_is: ['what is', 'menstruation', 'period', 'menses'],
  why: ['why', 'reason', 'happen', 'cause'],
  first: ['first', 'start', 'begin', 'young'],
  cycle: ['cycle', 'days', 'long', 'duration'],
  body: ['body', 'changes', 'puberty', 'breast', 'hair'],
  pads: ['pad', 'use', 'stick', 'apply'],
  change: ['change', 'how often', 'hours', 'replace'],
  bathing: ['bath', 'wash', 'clean', 'shower', 'soap'],
  school: ['school', 'uniform', 'class', 'teacher'],
  disposal: ['throw', 'disposal', 'trash', 'bin', 'flush'],
  mood: ['mood', 'sad', 'angry', 'feelings', 'crying'],
  anxiety: ['scared', 'fear', 'anxiety', 'worried'],
  exercise: ['exercise', 'sport', 'run', 'gym', 'stretch'],
  shameful: ['shame', 'dirty', 'bad', 'secret']
};

function findMatchingArticle(question, lang) {
  const q = question.toLowerCase();
  
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(k => q.includes(k))) {
      return articles[lang][key] || articles['en'][key];
    }
  }
  
  return null;
}

module.exports = { findMatchingArticle };
