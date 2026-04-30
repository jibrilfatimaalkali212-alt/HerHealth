# HerHealth Bot

A Telegram Menstrual Awareness Bot for Teenagers and Young Women.

## Features
- **Buttons Only**: Fully navigated via inline buttons for a mobile-app feel.
- **Multilingual**: Supports English, Pidgin, and Hausa.
- **Educational Content**: Menstruation, hygiene, emotional support, and myth-busting.
- **Privacy Mode**: Users can ask private questions securely.
- **Quizzes**: Test knowledge with built-in quizzes.
- **Daily Tips**: Scheduled push notifications (cron jobs).
- **No Database Needed**: Runs lightly using JSON data and in-memory state.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add your `BOT_TOKEN`:
   ```bash
   cp .env.example .env
   ```
3. Run the bot:
   ```bash
   npm start
   ```

## Deployment
Can be deployed easily to Render, Railway, or any VPS running Node.js.
