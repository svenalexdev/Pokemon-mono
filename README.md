# 🛡️ Pokémon: Battle Game

A full-stack battle simulation game where players select Pokémon from the [PokeAPI](https://pokeapi.co/), build a roster, and engage in turn-based battles. Victories earn experience points (XP) and leaderboard scores, with user authentication to track personalized progress.

## 🚀 Live Demo

Coming Soon..

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)

---

## ✨ Features

### 🔮 General

- 🔥 Battle simulator powered by Pokémon stats & types
- 🎯 Roster selection from PokeAPI
- 📊 Real-time leaderboard
- 🔐 User authentication (JWT-based)
- 💾 Persistent player data (roster, score)

### 🖥️ Frontend (React + Vite + Tailwind)

- Homepage: Browse & select Pokémon
- Details Page: View stats, abilities, and type
- My Roster: Manage selected Pokémon
- Battle Arena: Fight random Pokémon, earn XP
- Leaderboard: View top players, submit score
- Auth Pages: Register, Login, Logout

### 🧪 Backend ( MongoDB )

- RESTful API with secure routes
- User authentication with password hashing and JWT
- Leaderboard storage in MongoDB (via Mongoose)
- Input validation and error handling

---

## 🧱 Tech Stack

### 🖼️ Frontend

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### 🔧 Backend

- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---
