import User from '../models/user';

// Problem interface definition
interface Problem {
    id: string | number;
    question: string;
    correctAnswer: number;
    difficulty?: string;
}

export class GameService {
    private problems: Problem[];
    private currentProblemIndex: number;
    private user?: any; // Optional user instance from mongoose model

    constructor(user?: any) {
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

    // New method expected by GameController
    public async fetchGameProblems(): Promise<Problem[]> {
        return this.problems;
    }

    // New method expected by GameController
    public async checkAnswer(problemId: string | number, answer: number): Promise<{ correct: boolean; message?: string }> {
        const currentProblem = this.getCurrentProblem();
        if (!currentProblem) {
            return { correct: false, message: 'No problem available' };
        }
        
        const isCorrect = this.submitAnswer(answer);
        return {
            correct: isCorrect,
            message: isCorrect ? 'Correct answer!' : 'Incorrect answer, try again.'
        };
    }
}