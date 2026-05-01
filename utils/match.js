const articles = require('../data/articles.json');

const keywordMap = {
  what_is: ['what is', 'menstruation', 'period', 'menses', 'menure'],
  why: ['why', 'reason', 'happen', 'cause'],
  first: ['first', 'start', 'begin', 'young'],
  cycle: ['cycle', 'days', 'long', 'duration', 'understanding', 'calculate'],
  body: ['body', 'changes', 'puberty', 'breast', 'hair'],
  pads: ['pad', 'use', 'stick', 'apply'],
  change: ['change', 'how often', 'hours', 'replace'],
  bathing: ['bath', 'wash', 'clean', 'shower', 'soap'],
  school: ['school', 'uniform', 'class', 'teacher'],
  disposal: ['throw', 'disposal', 'trash', 'bin', 'flush', 'dispose'],
  mood: ['mood', 'sad', 'angry', 'feelings', 'crying', 'swings'],
  anxiety: ['scared', 'fear', 'anxiety', 'worried'],
  exercise: ['exercise', 'sport', 'run', 'gym', 'stretch'],
  shameful: ['shame', 'dirty', 'bad', 'secret'],
  late: ['late', 'delay', 'missed', 'not come', 'waiting'],
  odor: ['smell', 'odor', 'stink', 'fishy', 'scent'],
  heavy: ['heavy', 'flow', 'soaked', 'bleeding a lot', 'too much'],
  dizzy: ['dizzy', 'faint', 'weak', 'tired', 'dizziness'],
  cold_water: ['cold water', 'ice water', 'chilled'],
  okra: ['okra', 'draw soup', 'slippery'],
  dos_donts: ['do and don\'t', 'rules', 'avoid', 'should I'],
  food: ['food', 'eat', 'diet', 'nutrition', 'sugar', 'salt']
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
