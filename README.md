# ⚔️ PokeBrawl

**PokeBrawl** is a full-stack Pokémon battle simulator powered by real Pokémon stats and types. Select your Pokémon, battle computer-controlled opponents, climb the leaderboard, and explore a detailed Pokédex. Built with the MERN stack and designed for both fun and performance.

🔗 [Live Demo on Render](https://pokemon-mono-frontend.onrender.com/)  

---

## 🧩 Features

### 🔮 General

- 🔥 Battle simulator powered by Pokémon stats & types
- 🎯 Roster selection using PokéAPI data
- 📊 Real-time leaderboard
- 🔐 User authentication with JWT

### 🖥️ Frontend (React + Vite + Tailwind)

- **Homepage**: Choose your Pokémon team and initiate battles
- **Battle Arena**: Fight a randomly selected opponent
- **Leaderboard**: View the top-performing users
- **Pokedex**: Search and view details for all Pokémon (stats, abilities, types)
- **Auth Pages**: Register, Login, Logout
- **How to Play**: Get started easily with an explanation page

### 🧪 Backend (Node.js + MongoDB)

- RESTful API with Express
- User authentication with JWT and password hashing (bcrypt)
- Persistent leaderboard and user data stored via Mongoose
- Input validation using [zod](https://github.com/colinhacks/zod)

---

## 🧱 Tech Stack

### 🖼️ Frontend

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### 🔧 Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [zod](https://github.com/colinhacks/zod)

---

## 📁 Project Structure

This project uses a **monorepo** structure:

    Pokebrawl/
    ├── backend/      → Express backend with MongoDB
    └── frontend/     → React + Vite frontend

---

## 🚀 Getting Started

The app is deployed and ready to use at:  
👉 **[https://pokemon-mono-frontend.onrender.com/](https://pokemon-mono-frontend.onrender.com/)**

> To run the project locally, create `.env` files in both backend and frontend folders as follows:

### Backend `.env` (in `/backend`)

    MONGO_URI=<your_connection_string>
    JWT_SECRET=<your_jwt_secret>
    SPA_ORIGIN=http://localhost:5173

### Frontend `.env` (in `/frontend`)

    VITE_POKEMON_API=http://localhost:8000

Then install dependencies and run both servers:

    # Backend
    cd backend
    npm install
    npm run dev

    # Frontend
    cd frontend
    npm install
    npm run dev

---

## 👥 Team

- [@svenalexdev](https://github.com/your-github-handle)
- [@AnkitaMalani](https://github.com/AnkitaMalani)
- [@marcochippy](https://github.com/marcochippy)  
- [@Stradow](https://github.com/Stradow)

---

## 📜 License

This project was created for educational purposes as part of a Web Development Bootcamp.  
Not intended for commercial use.
