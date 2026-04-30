const users = {};

function getUserState(userId) {
  if (!users[userId]) {
    users[userId] = {
      language: 'en',
      state: 'home', // home, ask_privately, quiz
      quizScore: 0,
      quizIndex: 0
    };
  }
  return users[userId];
}

function updateUserState(userId, updates) {
  if (!users[userId]) {
    getUserState(userId);
  }
  users[userId] = { ...users[userId], ...updates };
  return users[userId];
}

function getAllUsers() {
  return Object.keys(users);
}

module.exports = { getUserState, updateUserState, getAllUsers };
