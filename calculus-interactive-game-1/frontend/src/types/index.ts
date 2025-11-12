export type Problem = {
    id: number;
    question: string;
    answer: number;
    options: number[];
};

export type User = {
    id: number;
    name: string;
    score: number;
};

export type GameState = {
    currentProblem: Problem | null;
    score: number;
    totalProblems: number;
    isGameOver: boolean;
};