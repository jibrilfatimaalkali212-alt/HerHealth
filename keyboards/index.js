const { Markup } = require('telegraf');
const { getText } = require('../utils/i18n');

function getHomeKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_learn'), 'menu_learn')],
    [Markup.button.callback(getText(lang, 'btn_hygiene'), 'menu_hygiene')],
    [Markup.button.callback(getText(lang, 'btn_emotional'), 'menu_emotional'), Markup.button.callback(getText(lang, 'btn_myth'), 'menu_myth')],
    [Markup.button.callback(getText(lang, 'btn_ask'), 'menu_ask'), Markup.button.callback(getText(lang, 'btn_quiz'), 'menu_quiz')],
    [Markup.button.callback(getText(lang, 'btn_language'), 'menu_language'), Markup.button.callback(getText(lang, 'btn_about'), 'menu_about')]
  ]);
}

function getLearnKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_what_is'), 'article_what_is')],
    [Markup.button.callback(getText(lang, 'btn_why'), 'article_why')],
    [Markup.button.callback(getText(lang, 'btn_first'), 'article_first')],
    [Markup.button.callback(getText(lang, 'btn_cycle'), 'article_cycle')],
    [Markup.button.callback(getText(lang, 'btn_body'), 'article_body')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getHygieneKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_pads'), 'article_pads'), Markup.button.callback(getText(lang, 'btn_change'), 'article_change')],
    [Markup.button.callback(getText(lang, 'btn_bathing'), 'article_bathing')],
    [Markup.button.callback(getText(lang, 'btn_school'), 'article_school')],
    [Markup.button.callback(getText(lang, 'btn_disposal'), 'article_disposal')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getEmotionalKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_mood'), 'article_mood'), Markup.button.callback(getText(lang, 'btn_anxiety'), 'article_anxiety')],
    [Markup.button.callback(getText(lang, 'btn_confidence'), 'article_confidence')],
    [Markup.button.callback(getText(lang, 'btn_self_accept'), 'article_self_accept')],
    [Markup.button.callback(getText(lang, 'btn_need_encourage'), 'article_need_encourage')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getMythKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_exercise'), 'article_exercise')],
    [Markup.button.callback(getText(lang, 'btn_school_myth'), 'article_school_myth')],
    [Markup.button.callback(getText(lang, 'btn_shameful'), 'article_shameful')],
    [Markup.button.callback(getText(lang, 'btn_bathe_myth'), 'article_bathe_myth')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getLanguageKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🇬🇧 English', 'lang_en')],
    [Markup.button.callback('🇳🇬 Pidgin', 'lang_pidgin')],
    [Markup.button.callback('🇳🇬 Hausa', 'lang_ha')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getBackKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

function getQuizKeyboard(options) {
  const buttons = options.map((opt, index) => {
    return [Markup.button.callback(opt, `quiz_ans_${index}`)];
  });
  return Markup.inlineKeyboard(buttons);
}

function getQuizNextKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(getText(lang, 'btn_next'), 'quiz_next')],
    [Markup.button.callback(getText(lang, 'btn_back'), 'menu_home')]
  ]);
}

module.exports = {
  getHomeKeyboard,
  getLearnKeyboard,
  getHygieneKeyboard,
  getEmotionalKeyboard,
  getMythKeyboard,
  getLanguageKeyboard,
  getBackKeyboard,
  getQuizKeyboard,
  getQuizNextKeyboard
};
