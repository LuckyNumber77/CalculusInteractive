import { Router } from 'express';
import { GameController } from '../controllers/gameController';

const router = Router();
const gameController = new GameController();

// GET /api/game/problems -> get list of problems
router.get('/problems', (req, res) => {
  gameController.getGameProblems(req, res);
});

// POST /api/game/submit -> submit an answer to a problem
router.post('/submit', (req, res) => {
  gameController.submitAnswer(req, res);
});

export default router;