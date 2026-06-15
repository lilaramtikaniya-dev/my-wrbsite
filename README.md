# ⚡ JSForge Runtime

> An educational JavaScript Runtime built in C++ — showcased with a stunning futuristic web platform.

[![Deploy Frontend](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/jsforge-runtime.git
cd jsforge-runtime

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

**Backend** (`backend/.env`):
```env
PORT=4000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Frontend: http://localhost:3000
Backend:  http://localhost:4000

---

## 📁 Project Structure

```
jsforge-runtime/
├── frontend/                    # Next.js 15 App
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Global styles
│   │   ├── playground/          # Monaco Editor playground
│   │   ├── docs/                # Documentation
│   │   ├── architecture/        # Architecture diagrams
│   │   ├── leaderboard/         # Leaderboard
│   │   └── about/               # About page
│   ├── components/
│   │   ├── ui/                  # ShadCN UI primitives
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── OutputConsole.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── AnimatedGradient.tsx
│   │   ├── LeaderboardTable.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── DocumentationSidebar.tsx
│   │   ├── ArchitectureFlow.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── StatsSection.tsx
│   │   ├── Timeline.tsx
│   │   └── Testimonials.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useLeaderboard.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── api.ts
│   └── types/index.ts
│
└── backend/                     # Express API
    └── src/
        ├── index.ts
        ├── routes/
        ├── controllers/
        ├── services/
        └── middleware/
```

---

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, stats, FAQ |
| Playground | `/playground` | Monaco Editor + live execution |
| Documentation | `/docs` | Lexer, Parser, AST, Runtime docs |
| Architecture | `/architecture` | Animated flow diagram |
| Leaderboard | `/leaderboard` | Submit & view scores |
| About | `/about` | Team, goals, roadmap |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/run` | Execute JS code (mocked) |
| POST | `/chat` | AI Mentor chat |
| GET | `/leaderboard` | Get all scores |
| POST | `/leaderboard` | Submit a score |

---

## 🚀 Deployment on Render

### Backend (Web Service)
1. Connect your GitHub repo to Render
2. Create a **Web Service** pointing to `/backend`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Set environment variables in Render dashboard

### Frontend (Static Site)
1. Create a **Static Site** pointing to `/frontend`
2. Build Command: `npm install && npm run build`
3. Publish Directory: `.next` (or use Render's Next.js support)
4. Set `NEXT_PUBLIC_API_URL` to your backend Render URL

---

## ✨ Features

- ⚡ Monaco Editor with JS syntax highlighting
- 🤖 AI Mentor powered by OpenAI
- 🏆 Leaderboard with localStorage persistence
- 📖 Full documentation with syntax highlighting
- 🎨 Cyberpunk dark mode with glassmorphism
- 🌊 Framer Motion animations throughout
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ WCAG 2.1 AA compliant

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons  
**Backend:** Node.js, Express, TypeScript  
**Storage:** localStorage (client-side)  
**Deployment:** Render

---

## 📄 License

MIT © JSForge Runtime Team
