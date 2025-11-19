# Calculus Interactive Game

An educational web application that helps students learn and practice calculus concepts through interactive gameplay. Built with React, TypeScript, and Express.js, featuring problems from the Whitman Calculus textbook.

![Home Page](https://github.com/user-attachments/assets/2ad1f3d8-9062-464f-97b3-7f996a88f53e)
![Game Play](https://github.com/user-attachments/assets/f5c26959-8a6b-45fd-a2d3-e78a3b203416)

## 🎯 Features

- **Interactive Problem Solving**: Answer calculus problems and get instant feedback
- **Score Tracking**: Keep track of your progress with a live score counter
- **Help System**: Access hints and links to the full Whitman Calculus textbook
- **Curated Problems**: 15 hand-validated calculus problems covering derivatives, integrals, and more
- **Problem Parser**: Extract additional problems from the calculus.json source file
- **Responsive Design**: Clean, modern UI that works across devices

## 🏗️ Project Structure

```
CalculusInteractive/
├── calculus-interactive-game-1/     # Main application directory
│   ├── frontend/                     # React + TypeScript + Vite
│   │   ├── src/
│   │   │   ├── components/          # GameBoard, ProblemCard, HelpModal, HUD
│   │   │   ├── hooks/               # useGame hook for game logic
│   │   │   ├── pages/               # Home and Play pages
│   │   │   ├── styles/              # CSS styling
│   │   │   └── types/               # TypeScript definitions
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── backend/                      # Express.js + TypeScript API
│   │   ├── src/
│   │   │   ├── controllers/         # Request handlers
│   │   │   ├── routes/              # API endpoints
│   │   │   ├── services/            # Business logic
│   │   │   ├── models/              # Data models
│   │   │   └── utils/               # Helper functions
│   │   ├── data/                    # Problem data
│   │   │   ├── problems.json        # Active problem set (15 validated)
│   │   │   └── problems.sample.json # Sample problems (backup)
│   │   └── package.json
│   ├── docker-compose.yml           # Docker orchestration
│   └── README.md                    # Detailed project documentation
├── scripts/
│   └── parseCalculusJson.js         # Problem extraction script
├── calculus.json                    # Source textbook data (15k+ lines)
└── README.md                        # This file

```

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuckyNumber77/CalculusInteractive.git
   cd CalculusInteractive
   ```

2. **Install backend dependencies**
   ```bash
   cd calculus-interactive-game-1/backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**Start the Backend Server** (in one terminal):
```bash
cd calculus-interactive-game-1/backend
npm start
# Server runs on http://localhost:3001
```

**Start the Frontend Development Server** (in another terminal):
```bash
cd calculus-interactive-game-1/frontend
npm run start
# Application runs on http://localhost:5000
```

The frontend automatically proxies API requests to the backend at port 3001.

#### Option 2: Using Docker Compose

```bash
cd calculus-interactive-game-1
docker-compose up
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Building for Production

**Build Frontend**:
```bash
cd calculus-interactive-game-1/frontend
npm run build
# Output in dist/ directory
```

**Build Backend**:
```bash
cd calculus-interactive-game-1/backend
npm run build
# Compiles TypeScript to JavaScript
```

## 🎮 How to Play

1. Navigate to the home page and click **"Start Playing"**
2. Read the calculus problem presented
3. Enter your answer in the text field
4. Click **"Submit"** to check your answer
5. If correct, your score increases and you move to the next problem
6. If incorrect, a help modal appears with resources
7. Use **"Need Help?"** button anytime to access learning materials
8. Complete all 15 problems to see your final score

## 📚 Problem Data

### Current Problem Set

The application uses `calculus-interactive-game-1/backend/data/problems.json`, which contains 15 hand-validated calculus problems with verified answers. Topics include:

- Derivatives (Power Rule, Chain Rule, Product Rule)
- Integrals (Basic Integration, Definite Integrals)
- Limits and Continuity
- Applications of Derivatives

### Generating More Problems

The repository includes a parser script to extract problems from the Whitman Calculus textbook:

```bash
# From repository root
node scripts/parseCalculusJson.js
```

This creates `calculus-interactive-game-1/backend/data/problems.full.json` with hundreds of extracted problems. 

**Note**: Auto-extracted problems may need manual review for answer completeness.

To use extracted problems:
```bash
cp calculus-interactive-game-1/backend/data/problems.full.json \
   calculus-interactive-game-1/backend/data/problems.json
```

To restore sample problems:
```bash
cp calculus-interactive-game-1/backend/data/problems.sample.json \
   calculus-interactive-game-1/backend/data/problems.json
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **CSS3**: Custom styling

### Backend
- **Express.js**: Web server framework
- **TypeScript**: Type-safe Node.js
- **CORS**: Cross-origin resource sharing
- **body-parser**: JSON request parsing

### Development Tools
- **ts-node**: TypeScript execution
- **ts-node-dev**: Development auto-reload
- **Docker**: Containerization support

## 📖 API Documentation

### Base URL
- Development: `http://localhost:3001`

### Endpoints

#### Get Problems
```
GET /api/games/problems
```

Returns the list of calculus problems.

**Response** (200 OK):
```json
{
  "metadata": {
    "source": "Whitman Calculus Text - Hand-validated Sample",
    "totalProblems": 15,
    "license": "Creative Commons Attribution-NonCommercial-ShareAlike License"
  },
  "problems": [
    {
      "id": "sample_001",
      "question": "What is the derivative of x^2?",
      "answer": "2x",
      "topic": "Derivatives - Power Rule",
      "difficulty": "easy"
    }
    // ... more problems
  ]
}
```

#### Submit Answer
```
POST /api/games/submit
```

Check if an answer is correct (currently frontend handles validation).

**Request Body**:
```json
{
  "problemId": "sample_001",
  "answer": "2x"
}
```

## 🧪 Testing

Both frontend and backend have Jest configured for testing:

```bash
# Test frontend
cd calculus-interactive-game-1/frontend
npm test

# Test backend
cd calculus-interactive-game-1/backend
npm test
```

## 🔧 Configuration

### Frontend Configuration (vite.config.ts)
- **Port**: 5000
- **API Proxy**: Proxies `/api` and `/assets` to backend at port 3001
- **Host**: `0.0.0.0` (allows external access)

### Backend Configuration
- **Port**: 3001 (set via `process.env.PORT` or default)
- **CORS**: Enabled for all origins
- **Static Files**: Serves `/assets` from `backend/public/assets`

### Environment Variables

Create `.env` files based on `.env.example`:

**Backend** (`calculus-interactive-game-1/backend/.env`):
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=your_database_url_here
```

## 📝 License

This project is licensed under the MIT License.

### Third-Party Content

The Whitman Calculus textbook content is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike License. See [Whitman Calculus](https://www.whitman.edu/mathematics/calculus/) for more information.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- Some auto-extracted problems from the parser may have incomplete answers
- Frontend currently handles answer validation locally (backend endpoint is available but not used)

## 🚧 Future Enhancements

- User authentication and progress tracking
- Difficulty levels and adaptive learning
- More problem categories (trigonometry, series, etc.)
- Detailed solution explanations
- Leaderboard system
- Mobile app versions

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Whitman College for the open-source Calculus textbook
- React and Vite teams for excellent development tools
- All contributors to this project

---

**Made with ❤️ for calculus students everywhere**