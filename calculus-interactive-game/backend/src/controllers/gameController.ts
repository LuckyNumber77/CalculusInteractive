import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    public async getGameProblems(req: Request, res: Response): Promise<void> {
        try {
            const problems = await this.gameService.fetchGameProblems();
            res.status(200).json(problems);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching game problems', error });
        }
    }

    public async submitAnswer(req: Request, res: Response): Promise<void> {
        const { problemId, answer } = req.body;
        try {
            const result = await this.gameService.checkAnswer(problemId, answer);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error submitting answer', error });
        }
    }
}