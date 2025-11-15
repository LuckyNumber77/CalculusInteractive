# Calculus Interactive Game

## Overview
An interactive educational game designed to help students learn and practice calculus concepts through engaging gameplay. The project consists of a React-based frontend and an Express.js backend API.

## Project Structure
```
calculus-interactive-game-1/
├── frontend/          # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/  # React components (GameBoard, HUD, ProblemCard)
│   │   ├── hooks/       # Custom React hooks (useGame)
│   │   ├── pages/       # Page components (Home, Play)
│   │   ├── styles/      # CSS stylesheets
│   │   ├── types/       # TypeScript type definitions
│   │   ├── App.tsx      # Main App component with routing
│   │   └── index.tsx    # Entry point
│   └── package.json
├── backend/           # Express.js + TypeScript backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utility functions
│   │   └── index.ts     # Server entry point
│   └── package.json
└── README.md
```

## Technology Stack
- **Frontend**: React 18, TypeScript, Vite, React Router
- **Backend**: Express.js, TypeScript, CORS, body-parser
- **Development**: Node.js 20

## Recent Changes (November 15, 2025)
- Configured project for Replit environment
- Fixed backend port to 3001 (to avoid conflict with frontend on port 5000)
- Configured Vite to run on port 5000 with host 0.0.0.0 for Replit proxy support
- Added CORS support to backend for cross-origin requests
- Updated React to use React 18 createRoot API
- Installed all dependencies including TypeScript type definitions
- Created .gitignore file for Node.js projects
- Set up frontend workflow on port 5000
- Configured deployment for autoscale with build and serve commands

## Development

### Running the Frontend
The frontend runs automatically via the workflow on port 5000:
- URL: `http://0.0.0.0:5000`
- Development server: Vite with hot module replacement
- Command: `cd calculus-interactive-game-1/frontend && npm start`

### Running the Backend (Optional)
The backend API runs on port 3001:
- URL: `http://localhost:3001`
- Command: `cd calculus-interactive-game-1/backend && npm run dev`

### Available Routes
- `/` - Home page with welcome message
- `/play` - Play page
- `/game` - Game board page

## Deployment
The project is configured for Replit autoscale deployment:
- Build: Installs dependencies and builds the frontend
- Run: Serves the built frontend using Vite preview server
- Target: Autoscale (suitable for stateless web applications)

## API Endpoints
- `GET /` - Welcome message
- `/api/games` - Game-related endpoints

## Notes
- Frontend is configured to work with Replit's proxy infrastructure
- Backend is available but not currently used by the frontend (game logic is local)
- Backend is configured on port 3001 with CORS and can be started separately if needed
- Both frontend and backend are TypeScript-based
- The project follows React 18 best practices with the new createRoot API
- Deployment is configured for autoscale (frontend only) since backend is not actively used
