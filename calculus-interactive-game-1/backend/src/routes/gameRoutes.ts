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

// GET /api/lessons/:conceptId -> get lesson by concept ID
router.get('/lessons/:conceptId', (req, res) => {
  try {
    const lessonsPath = path.join(__dirname, '../../data/lessons.json');
    
    // Check if lessons.json exists
    if (!fs.existsSync(lessonsPath)) {
      return res.status(404).json({ 
        message: 'Lessons file not found',
      });
    }
    
    // Read and parse the lessons file
    const lessonsData = fs.readFileSync(lessonsPath, 'utf8');
    const parsedData = JSON.parse(lessonsData);
    
    // Find lesson by conceptId
    const lesson = parsedData.lessons?.find((l: any) => l.conceptId === req.params.conceptId);
    
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ message: 'Lesson not found for this concept' });
    }
  } catch (error) {
    console.error('Error reading lessons file:', error);
    res.status(500).json({ 
      message: 'Error reading lessons file',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/lessons -> get all lessons
router.get('/lessons', (req, res) => {
  try {
    const lessonsPath = path.join(__dirname, '../../data/lessons.json');
    
    // Check if lessons.json exists
    if (!fs.existsSync(lessonsPath)) {
      return res.status(404).json({ 
        message: 'Lessons file not found',
      });
    }
    
    // Read and parse the lessons file
    const lessonsData = fs.readFileSync(lessonsPath, 'utf8');
    const parsedData = JSON.parse(lessonsData);
    
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error reading lessons file:', error);
    res.status(500).json({ 
      message: 'Error reading lessons file',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/game/submit -> submit an answer to a problem
router.post('/submit', (req, res) => {
  gameController.submitAnswer(req, res);
});

export default router;