import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

export const getGame = (req: Request, res: Response): void => {
    const gameService = new GameService();
    res.status(200).json({ message: 'Get game endpoint' });
};

export const createGame = (req: Request, res: Response): void => {
    const gameService = new GameService();
    res.status(201).json({ message: 'Create game endpoint' });
};

export const updateGame = (req: Request, res: Response): void => {
    const gameService = new GameService();
    res.status(200).json({ message: 'Update game endpoint' });
};

export const deleteGame = (req: Request, res: Response): void => {
    const gameService = new GameService();
    res.status(204).send();
};