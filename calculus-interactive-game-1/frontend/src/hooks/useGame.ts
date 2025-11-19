import { useState, useEffect } from 'react';

interface Problem {
    question: string;
    answer: string;
    lessonTopic?: string;
    lessonUrl?: string;
}

const useGame = () => {
    const [score, setScore] = useState(0);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [wasWrong, setWasWrong] = useState(false);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // Try to fetch problems from the backend API
                const response = await fetch('/api/games/problems');
                if (response.ok) {
                    const data = await response.json();
                    // Extract problems array from the response
                    const fetchedProblems = data.problems || data;
                    if (Array.isArray(fetchedProblems) && fetchedProblems.length > 0) {
                        setProblems(fetchedProblems);
                        console.log(`Loaded ${fetchedProblems.length} problems from API`);
                        return;
                    }
                }
                // If fetch fails or no problems, fall back to local generation
                console.log('Falling back to local problem generation');
                const localProblems = await generateProblems();
                setProblems(localProblems);
            } catch (error) {
                // If fetch fails, fall back to local generation
                console.log('Error fetching problems from API, using fallback:', error);
                const localProblems = await generateProblems();
                setProblems(localProblems);
            }
        };

        fetchProblems();
    }, []);

    const generateProblems = async (): Promise<Problem[]> => {
        return [
            { 
                question: 'What is the derivative of x^2?', 
                answer: '2x',
                lessonTopic: 'Derivatives',
                lessonUrl: 'https://www.whitman.edu/mathematics/multivariable/multivariable_13_Derivatives.html'
            },
            { 
                question: 'What is the integral of x?', 
                answer: '0.5x^2 + C',
                lessonTopic: 'Integration',
                lessonUrl: 'https://www.whitman.edu/mathematics/multivariable/multivariable_14_Integration.html'
            },
        ];
    };

    const answerProblem = (answer: string) => {
        if (isGameOver) return;

        const currentProblem = problems[currentProblemIndex];
        const isCorrect = answer === currentProblem.answer;
        
        if (isCorrect) {
            setScore(score + 1);
            setWasWrong(false);
            setShowHelp(false);
            // Move to next problem
            if (currentProblemIndex < problems.length - 1) {
                setCurrentProblemIndex(currentProblemIndex + 1);
            } else {
                setIsGameOver(true);
            }
        } else {
            // Show help when answer is wrong
            setWasWrong(true);
            setShowHelp(true);
        }
    };

    const requestHelp = () => {
        setShowHelp(true);
    };

    const closeHelp = () => {
        setShowHelp(false);
    };

    const skipProblem = () => {
        setWasWrong(false);
        setShowHelp(false);
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
        setShowHelp(false);
        setWasWrong(false);
    };

    return {
        score,
        problems,
        currentProblemIndex,
        isGameOver,
        showHelp,
        wasWrong,
        answerProblem,
        resetGame,
        requestHelp,
        closeHelp,
        skipProblem,
    };
};

export default useGame;