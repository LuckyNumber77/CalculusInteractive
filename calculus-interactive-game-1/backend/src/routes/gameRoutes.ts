import { Router } from 'express';
import { GameController } from '../controllers/gameController';
import fs from 'fs';
import path from 'path';

const router = Router();
const gameController = new GameController();

// GET /api/game/problems -> get list of problems from problems.json file
router.get('/problems', (req, res) => {
  try {
    const problemsPath = path.join(__dirname, '../../data/problems.json');
    
    // Check if problems.json exists
    if (!fs.existsSync(problemsPath)) {
      return res.status(404).json({ 
        message: 'Problems file not found. Please run the parser script: node scripts/parseCalculusJson.js',
        fallback: 'Frontend will use built-in problems'
      });
    }
    
    // Read and parse the problems file
    const problemsData = fs.readFileSync(problemsPath, 'utf8');
    const parsedData = JSON.parse(problemsData);
    
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error reading problems file:', error);
    res.status(500).json({ 
      message: 'Error reading problems file',
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Frontend will use built-in problems'
    });
  }
});

// POST /api/game/submit -> submit an answer to a problem
router.post('/submit', (req, res) => {
  gameController.submitAnswer(req, res);
});

export default router;