import { Router } from 'express';
import { getGame, createGame, updateGame, deleteGame } from '../controllers/gameController';

const router = Router();

// Route to get a game by ID
router.get('/:id', getGame);

// Route to create a new game
router.post('/', createGame);

// Route to update an existing game
router.put('/:id', updateGame);

// Route to delete a game
router.delete('/:id', deleteGame);

export default router;