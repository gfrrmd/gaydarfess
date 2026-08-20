# GaydarFess

A Threads-like social platform built with **Node.js + Express + MongoDB + Cloudinary**, deployable on Railway.

## Features
- 📝 Post threads with text & images (Cloudinary)
- ❤️ Like & reply to threads
- 👤 Profile page with edit (avatar, bio)
- 🔐 Register & login with sessions
- 🌙 Dark mode UI (Threads-inspired)

## Tech Stack
| Layer | Tech |
|---|---|
| Backend | Node.js + Express |
| Template | EJS |
| Database | MongoDB Atlas (Mongoose) |
| Media | Cloudinary |
| Deploy | Railway |

## Local Setup
```bash
git clone https://github.com/gfrrmd/gaydarfess
cd gaydarfess
npm install
cp .env.example .env
# isi .env dengan kredensial kamu
npm run dev
```

## Environment Variables
```
PORT=3000
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Deploy ke Railway
1. Push repo ini ke GitHub
2. Buka [railway.app](https://railway.app) → New Project → Deploy from GitHub Repo
3. Set semua environment variable di Railway dashboard
4. Done! Railway otomatis build & deploy
