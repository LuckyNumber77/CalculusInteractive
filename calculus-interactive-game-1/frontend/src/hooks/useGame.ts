import { useState, useEffect } from 'react';

interface Problem {
    question: string;
    answer: string;
}

const useGame = () => {
    const [score, setScore] = useState(0);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const fetchProblems = async () => {
            const fetchedProblems = await generateProblems();
            setProblems(fetchedProblems);
        };

        fetchProblems();
    }, []);

    const generateProblems = async (): Promise<Problem[]> => {
        return [
            { question: 'What is the derivative of x^2?', answer: '2x' },
            { question: 'What is the integral of x?', answer: '0.5x^2 + C' },
        ];
    };

    const answerProblem = (answer: string) => {
        if (isGameOver) return;

        const currentProblem = problems[currentProblemIndex];
        if (answer === currentProblem.answer) {
            setScore(score + 1);
        }

        if (currentProblemIndex < problems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const resetGame = () => {
        setScore(0);
        setCurrentProblemIndex(0);
        setIsGameOver(false);
    };

    return {
        score,
        problems,
        currentProblemIndex,
        isGameOver,
        answerProblem,
        resetGame,
    };
};

export default useGame;