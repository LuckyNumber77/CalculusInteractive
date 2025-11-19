export type Problem = {
    id: string;
    question: string;
    answer: string;
    topic?: string;
    difficulty?: string;
    conceptIds?: string[];
    hints?: string[];
    solutionSteps?: string[];
    lessonTopic?: string;
    lessonUrl?: string;
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