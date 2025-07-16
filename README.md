# Gemini Frontend Clone

Hey there! 👋 This is a chat app inspired by Google's Gemini. It's built with React, TypeScript, and Tailwind CSS. You can log in with your phone (using OTP), chat with simulated AI, and enjoy a modern, responsive design.

##  Live Demo

Check it out here: [Live App]([https://](https://gemini-clone-weld-nine.vercel.app/)

---

## 🚀 How to Set Up & Run

1. **Clone this repo**

   git clone https://github.com/chetvishal/gemini-clone.git

   cd gemini-frontend-clone

2. **Install dependencies**

   npm install

3. **Start the app**

   npm run dev

4. **Open your browser**

   Go to [http://localhost:5173](http://localhost:5173)

---

## Project Structure (What’s in each folder)

Here’s a quick look at what’s inside:

- **components** – All the building blocks for the UI. This includes stuff for logging in, chatting, the layout, and reusable things like buttons.
- **hooks** – Custom React hooks. These are little helpers for things like simulating AI replies or adding a delay to searches.
- **lib** – Just some utility functions and a file with country data.
- **store** – This is where the app keeps track of things like who’s logged in, your chats, and whether you’re using dark mode.
- **types** – All the TypeScript type definitions live here.
- **App.tsx** – The main app file that brings everything together.

That’s pretty much it! Each folder has its own job, and together they make the app work.

---

## How Some Features Work

### Throttling (AI Response Delay)
- When you send a message, the AI "types" for a bit before replying. This is done by adding a delay (1.5s for typing, then 2-4s random for the response). It feels more real!

### Pagination & Infinite Scroll
- The chat list and messages are designed to handle lots of data. When you search chats, results update instantly (debounced search). For messages, the UI can be extended for infinite scroll (just load more as you scroll up), though this demo loads all at once for now.

### Form Validation
- Login forms check your phone number and OTP right away. Phone numbers must be 10-15 digits, OTP is 6 digits. If you make a mistake, you’ll see a helpful error message instantly.

---
