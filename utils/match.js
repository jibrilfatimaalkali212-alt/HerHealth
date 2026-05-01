const articles = require('../data/articles.json');

const keywordMap = {
  // --- SPECIFIC TOPICS (Check these first to prevent 'What is' collisions) ---
  food: ['food', 'eat', 'diet', 'nutrition', 'sugar', 'salt', 'okra', 'avoid'],
  dizzy: ['dizzy', 'faint', 'weak', 'tired', 'dizziness'],
  late: ['late', 'delay', 'missed', 'not come', 'waiting', 'irregular'],
  odor: ['smell', 'odor', 'stink', 'fishy', 'scent'],
  heavy: ['heavy', 'flow', 'soaked', 'bleeding a lot', 'too much'],
  cold_water: ['cold water', 'ice water', 'chilled'],
  ovulation: ['ovulation', 'ovulate', 'egg', 'fertile'],
  discharge: ['discharge', 'white stuff', 'watery', 'leaking'],
  itching: ['itch', 'scratch', 'burning', 'irritation'],
  swimming: ['swim', 'pool', 'beach', 'water'],
  tampons: ['tampon', 'insert', 'inside'],
  cup: ['cup', 'silicone', 'reusable'],
  pregnancy: ['pregnant', 'pikin', 'baby', 'conceive'],
  pimples: ['pimple', 'acne', 'face', 'spots'],
  breast_pain: ['breast', 'chest', 'nipple', 'sore'],
  sleep: ['sleep', 'tired', 'fatigue', 'nap'],
  weight: ['weight', 'fat', 'heavy', 'bloat'],
  no_period: ['never start', 'not started', '15', '16'],
  pcos: ['pcos', 'polycystic'],
  endo: ['endometriosis', 'extreme pain', 'cannot walk'],
  stains: ['stain', 'blood on cloth', 'remove', 'wash blood'],
  hormones: ['hormone', 'chemical', 'estrogen', 'progesterone'],
  anger: ['angry', 'temper', 'shout', 'mad'],
  healthy_rel: ['relationship', 'boyfriend', 'friendship', 'trust'],
  consent: ['consent', 'agreement', 'say yes', 'touching'],
  anatomy: ['anatomy', 'vagina', 'uterus', 'cervix', 'inside'],
  two_periods: ['twice', 'two times', 'double'],
  long_period: ['8 days', '10 days', 'long time'],
  tracking: ['track', 'app', 'calendar', 'prediction'],
  ovulation_pain: ['ovulation pain', 'twinge', 'side pain'],
  discharge_types: ['color', 'stretchy', 'thick white'],
  cramps_why: ['why cramps', 'muscle', 'contraction'],
  clots: ['clot', 'jelly', 'lump', 'thick blood'],
  sex_period: ['sex', 'intercourse', 'making love', 'husband'],
  pregnancy_test: ['test', 'check for pikin', 'check for baby'],
  menopause: ['menopause', 'stop forever', 'old age'],
  pmdd: ['pmdd', 'depression', 'sadness'],
  pads_vs_tampons: ['difference', 'choose', 'better'],
  birth_control: ['pill', 'iud', 'implant', 'injection', 'contraceptive'],
  leak_school: ['leak at school', 'stained my skirt', 'uniform stain'],
  tell_dad: ['tell my dad', 'father', 'tell daddy'],
  gym_class: ['pe class', 'gym', 'sports teacher'],
  night_leak: ['leak at night', 'bed', 'sleep', 'overnight'],
  people_smell: ['people smell', 'others notice', 'bad odor'],
  bulge_pad: ['see the pad', 'pad show', 'jeans', 'visible'],
  irregular_first: ['irregular', 'skip months', 'not every month'],
  nausea: ['nausea', 'vomit', 'throwing up', 'sick'],
  bag_kit: ['school bag', 'kit', 'pouch', 'emergency'],
  public_toilet: ['public toilet', 'bathroom', 'change outside'],
  stop_growing: ['stop growing', 'get taller', 'height'],
  hair_growth: ['body hair', 'armpit hair', 'shave'],
  buying_pads: ['buy pads', 'embarrassed', 'market', 'shop'],
  vacation: ['holiday', 'vacation', 'travel', 'trip'],
  clothes: ['wear', 'skirt', 'pants', 'dress', 'dark color'],
  first_pain: ['pain first time', 'hurt at first', 'new pain'],
  fainting: ['faint', 'pass out', 'black out'],
  dance_sports: ['dance', 'athlete', 'play'],
  puberty_friends: ['friends started', 'before me', 'after me'],
  stay_fresh: ['fresh', 'clean vulva', 'wash outside'],
  dos_donts: ['do and don\'t', 'rules', 'avoid', 'should I'],
  
  // New specific triggers for the user's reported failures
  pimples: ['symptoms', 'signs', 'pimples', 'breast soreness', 'coming'], 
  
  // --- GENERAL TOPICS (Check these last) ---
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
  why: ['why', 'reason', 'happen', 'cause'],
  first: ['first', 'start', 'begin', 'young'],
  what_is: ['what is', 'menstruation', 'period', 'menses', 'menure']
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
