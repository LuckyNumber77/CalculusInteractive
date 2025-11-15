import { Problem } from '../models/problem';
import User from '../models/user';

export class GameService {
    private problems: Problem[];
    private currentProblemIndex: number;
    private user?: User;

    constructor(user?: User) {
        this.user = user;
        this.problems = this.loadProblems();
        this.currentProblemIndex = 0;
    }

    private loadProblems(): Problem[] {
        // Load problems from a data source (e.g., database, file)
        return []; // Placeholder for actual problem loading logic
    }

    public getCurrentProblem(): Problem | null {
        if (this.currentProblemIndex < this.problems.length) {
            return this.problems[this.currentProblemIndex];
        }
        return null;
    }

    public submitAnswer(answer: number): boolean {
        const currentProblem = this.getCurrentProblem();
        if (currentProblem && currentProblem.correctAnswer === answer) {
            this.currentProblemIndex++;
            return true;
        }
        return false;
    }

    public hasMoreProblems(): boolean {
        return this.currentProblemIndex < this.problems.length;
    }

    public getUserScore(): number {
        // Logic to calculate user score based on correct answers
        return 0; // Placeholder for actual score calculation
    }
}