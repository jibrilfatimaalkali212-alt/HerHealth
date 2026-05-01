const { getUserState, updateUserState } = require('../utils/state');
const { getText, getArticle } = require('../utils/i18n');
const keyboards = require('../keyboards');
const quizzes = require('../data/quizzes.json');
const { generateAnswer } = require('../utils/ai');
const { findMatchingArticle } = require('../utils/match');

function setupHandlers(bot) {
  bot.start((ctx) => {
    const userId = ctx.from.id;
    const state = getUserState(userId);
    updateUserState(userId, { state: 'home' });
    
    ctx.reply(getText(state.language, 'welcome'), keyboards.getHomeKeyboard(state.language));
  });

  bot.action('menu_home', (ctx) => {
    const userId = ctx.from.id;
    const state = updateUserState(userId, { state: 'home' });
    ctx.editMessageText(getText(state.language, 'welcome'), keyboards.getHomeKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_learn', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'learn_menu'), keyboards.getLearnKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_hygiene', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'hygiene_menu'), keyboards.getHygieneKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_emotional', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'emotional_menu'), keyboards.getEmotionalKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_myth', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'myth_menu'), keyboards.getMythKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_language', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'language_menu'), keyboards.getLanguageKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_about', (ctx) => {
    const state = getUserState(ctx.from.id);
    ctx.editMessageText(getText(state.language, 'about_text'), keyboards.getBackKeyboard(state.language)).catch(() => {});
  });

  bot.action('menu_ask', (ctx) => {
    const userId = ctx.from.id;
    const state = updateUserState(userId, { state: 'ask_privately' });
    ctx.editMessageText(getText(state.language, 'ask_prompt'), keyboards.getBackKeyboard(state.language)).catch(() => {});
  });

  // Language handlers
  bot.action(/^lang_(.+)$/, (ctx) => {
    const lang = ctx.match[1];
    const userId = ctx.from.id;
    const state = updateUserState(userId, { language: lang });
    ctx.editMessageText(getText(state.language, 'welcome'), keyboards.getHomeKeyboard(state.language)).catch(() => {});
  });

  // Article handlers
  bot.action(/^article_(.+)$/, (ctx) => {
    const articleKey = ctx.match[1];
    const state = getUserState(ctx.from.id);
    const content = getArticle(state.language, articleKey);
    ctx.editMessageText(content, keyboards.getBackKeyboard(state.language)).catch(() => {});
  });

  // Quiz handlers
  bot.action('menu_quiz', (ctx) => {
    const userId = ctx.from.id;
    const state = updateUserState(userId, { state: 'quiz', quizIndex: 0, quizScore: 0 });
    ctx.editMessageText(getText(state.language, 'quiz_start'), keyboards.getQuizNextKeyboard(state.language)).catch(() => {});
  });

  bot.action('quiz_next', (ctx) => {
    const state = getUserState(ctx.from.id);
    const quiz = quizzes[state.quizIndex];
    if (quiz) {
      const questionText = quiz.question[state.language] || quiz.question['en'];
      const options = quiz.options[state.language] || quiz.options['en'];
      ctx.editMessageText(`Question ${state.quizIndex + 1}: ${questionText}`, keyboards.getQuizKeyboard(options)).catch(() => {});
    } else {
      let endText = getText(state.language, 'quiz_end');
      endText = endText.replace('{score}', state.quizScore).replace('{total}', quizzes.length);
      ctx.editMessageText(endText, keyboards.getBackKeyboard(state.language)).catch(() => {});
    }
  });

  bot.action(/^quiz_ans_(\d+)$/, (ctx) => {
    const answerIndex = parseInt(ctx.match[1]);
    const userId = ctx.from.id;
    const state = getUserState(userId);
    const quiz = quizzes[state.quizIndex];
    
    if (!quiz) return;

    let response = "";
    if (answerIndex === quiz.answerIndex) {
      updateUserState(userId, { quizScore: state.quizScore + 1 });
      response = "✅ Correct!";
    } else {
      response = "❌ Incorrect.";
    }

    const newState = updateUserState(userId, { quizIndex: state.quizIndex + 1 });
    
    ctx.editMessageText(`${response}\n\nReady for the next one?`, keyboards.getQuizNextKeyboard(newState.language)).catch(() => {});
  });

  // Text messages handler
  bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const state = getUserState(userId);

    if (state.state === 'ask_privately') {
      const question = ctx.message.text;
      
      // 1. Try Keyword Match (Saves Quota)
      const staticMatch = findMatchingArticle(question, state.language);
      
      if (staticMatch) {
        await ctx.reply(getText(state.language, 'ask_received'));
        await ctx.reply(`💡 I found some info for you:\n\n${staticMatch}`, keyboards.getBackKeyboard(state.language));
        updateUserState(userId, { state: 'home' });
        return;
      }

      // 2. If no match, use AI (Consumes Quota)
      await ctx.reply(getText(state.language, 'ask_received'));
      const answer = await generateAnswer(question);
      
      await ctx.reply(answer, {
        parse_mode: 'Markdown',
        ...keyboards.getBackKeyboard(state.language)
      });
      
      updateUserState(userId, { state: 'home' });
    } else {
      // Just resend home if they type randomly outside of asking privately
      ctx.reply(getText(state.language, 'welcome'), keyboards.getHomeKeyboard(state.language));
    }
  });
}

module.exports = { setupHandlers };
