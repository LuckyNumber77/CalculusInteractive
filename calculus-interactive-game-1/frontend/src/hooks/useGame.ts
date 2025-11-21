/**
 * Custom hook for managing calculus game state.
 * 
 * This hook manages the game logic including:
 * - Loading and shuffling problems (from API or fallback generator)
 * - Randomized polynomial derivative problem generation
 * - Progressive hint system with LaTeX formatting
 * - Answer checking and feedback
 * 
 * NOTE: Math rendering requires KaTeX to be installed:
 *   npm install katex @types/katex
 * And KaTeX CSS must be imported in index.tsx or App.tsx:
 *   import 'katex/dist/katex.min.css';
 */

import { useState, useEffect } from 'react';
import { progressStore } from '../utils/progressStore';
import { analytics } from '../utils/analytics';
import { handleIncorrectAnswer, handleCorrectAnswer, fetchLessonByConcept, Question, Lesson } from '../utils/feedback';
import { ErrorAnalysis } from '../utils/errorDetection';
import { toLatex } from '../utils/formatMath';

interface Problem {
    id: string;
    question: string;
    answer: string;
    topic?: string;
    conceptIds?: string[];
    hints?: string[];
    solutionSteps?: string[];
    lessonTopic?: string;
    lessonUrl?: string;
}

type FeedbackMode = 'none' | 'hint' | 'lesson' | 'solution' | 'error';

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const useGame = () => {
    const [score, setScore] = useState(0);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [wasWrong, setWasWrong] = useState(false);
    const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('none');
    const [currentHint, setCurrentHint] = useState<string>('');
    const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [currentSolution, setCurrentSolution] = useState<string[]>([]);
    const [currentError, setCurrentError] = useState<ErrorAnalysis | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);

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
                        // Shuffle the problems array to vary the first problem shown
                        const shuffledProblems = shuffleArray(fetchedProblems);
                        setProblems(shuffledProblems);
                        console.log(`Loaded ${shuffledProblems.length} problems from API (shuffled)`);
                        return;
                    }
                }
                // If fetch fails or no problems, fall back to local generation
                console.log('Falling back to local problem generation');
                const localProblems = await generateProblems();
                // Shuffle fallback problems too
                const shuffledProblems = shuffleArray(localProblems);
                setProblems(shuffledProblems);
            } catch (error) {
                // If fetch fails, fall back to local generation
                console.log('Error fetching problems from API, using fallback:', error);
                const localProblems = await generateProblems();
                // Shuffle fallback problems too
                const shuffledProblems = shuffleArray(localProblems);
                setProblems(shuffledProblems);
            }
        };

        fetchProblems();
    }, []);

    /**
     * Generates randomized polynomial derivative problems.
     * Each problem has random coefficient (-4 to 4, excluding 0) and exponent (1 to 5).
     * Provides progressive LaTeX-formatted hints: conceptual, applied, final answer.
     */
    const generateProblems = async (): Promise<Problem[]> => {
        const numProblems = 10; // Generate 10 varied problems
        const problems: Problem[] = [];
        
        for (let i = 0; i < numProblems; i++) {
            // Random coefficient between -4 and 4, excluding 0
            let coeff = Math.floor(Math.random() * 9) - 4;
            if (coeff === 0) coeff = 1;
            
            // Random exponent between 1 and 5
            const exp = Math.floor(Math.random() * 5) + 1;
            
            // Build the question
            const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff.toString();
            const expStr = exp === 1 ? '' : `^${exp}`;
            const question = `What is the derivative of ${coeffStr}x${expStr}?`;
            
            // Calculate the answer
            const answerCoeff = coeff * exp;
            const answerExp = exp - 1;
            
            let answer: string;
            if (answerExp === 0) {
                // Result is a constant
                answer = answerCoeff.toString();
            } else if (answerExp === 1) {
                // Result is linear: ax
                if (answerCoeff === 1) {
                    answer = 'x';
                } else if (answerCoeff === -1) {
                    answer = '-x';
                } else {
                    answer = `${answerCoeff}x`;
                }
            } else {
                // Result has exponent: ax^n
                if (answerCoeff === 1) {
                    answer = `x^${answerExp}`;
                } else if (answerCoeff === -1) {
                    answer = `-x^${answerExp}`;
                } else {
                    answer = `${answerCoeff}x^${answerExp}`;
                }
            }
            
            // Generate progressive hints in LaTeX format
            const hints: string[] = [
                // Hint 1: Conceptual - remind them of the power rule
                toLatex(`Remember the power rule: d/dx[x^n] = n*x^(n-1)`),
                // Hint 2: Applied - apply to this specific problem
                toLatex(`For ${coeffStr}x${expStr}, bring down the exponent ${exp} and multiply by the coefficient, then reduce the exponent by 1`),
                // Hint 3: Final - show the answer
                toLatex(`The derivative is ${answer}`)
            ];
            
            problems.push({
                id: `fallback_derivative_${i + 1}`,
                question,
                answer,
                conceptIds: ['power-rule'],
                hints,
                lessonTopic: 'Derivatives - Power Rule',
                lessonUrl: 'https://www.whitman.edu/mathematics/multivariable/multivariable_13_Derivatives.html'
            });
        }
        
        return problems;
    };

    const answerProblem = async (answer: string) => {
        if (isGameOver) return;

        const currentProblem = problems[currentProblemIndex];
        const isCorrect = answer.trim().toLowerCase() === currentProblem.answer.trim().toLowerCase();
        
        if (isCorrect) {
            setScore(score + 1);
            setWasWrong(false);
            setShowHelp(false);
            setFeedbackMode('none');
            
            // Track correct answer
            handleCorrectAnswer(currentProblem as Question);
            
            // Move to next problem
            if (currentProblemIndex < problems.length - 1) {
                setCurrentProblemIndex(currentProblemIndex + 1);
            } else {
                setIsGameOver(true);
            }
        } else {
            // Handle incorrect answer with layered feedback
            setWasWrong(true);
            setShowHelp(true);
            
            const feedbackAction = await handleIncorrectAnswer(
                currentProblem as Question,
                answer,
                progressStore,
                {
                    showHint: (hint: string, hintIndex: number) => {
                        setCurrentHint(hint);
                        setCurrentHintIndex(hintIndex);
                        setFeedbackMode('hint');
                    },
                    showLesson: (lesson: Lesson) => {
                        setCurrentLesson(lesson);
                        setFeedbackMode('lesson');
                    },
                    showSolutionSteps: (steps: string[]) => {
                        setCurrentSolution(steps);
                        setFeedbackMode('solution');
                    },
                    showMessage: (message: string) => {
                        setCurrentHint(message);
                        setFeedbackMode('hint');
                    },
                    showErrorAnalysis: (analysis: ErrorAnalysis) => {
                        setCurrentError(analysis);
                        // Error analysis is shown alongside other feedback
                    }
                },
                fetchLessonByConcept
            );
        }
    };

    const requestHelp = async () => {
        const currentProblem = problems[currentProblemIndex];

        // Nothing loaded yet — open the generic lesson/text
        if (!currentProblem) {
            setFeedbackMode('lesson');
            setCurrentLesson(null);
            setShowHelp(true);
            analytics.trackEvent('hint_requested', { questionId: undefined, mode: 'none' });
            return;
        }

        // Prefer showing an explicit hint
        if (Array.isArray(currentProblem.hints) && currentProblem.hints.length > 0) {
            setCurrentHint(currentProblem.hints[0]);
            setCurrentHintIndex(0);
            setFeedbackMode('hint');
            setShowHelp(true);
            analytics.trackEvent('hint_requested', { questionId: currentProblem.id, mode: 'hint' });
            return;
        }

        // If there are no hints but there is a lesson reference, show it
        if (currentProblem.lessonUrl || currentProblem.lessonTopic) {
            setCurrentLesson({
                title: currentProblem.lessonTopic || 'Calculus Text',
                url: currentProblem.lessonUrl || '/assets/calculus.txt',
            } as any);
            setFeedbackMode('lesson');
            setShowHelp(true);
            analytics.trackEvent('hint_requested', { questionId: currentProblem.id, mode: 'lesson' });
            return;
        }

        // Fallback: open generic lesson/text
        setFeedbackMode('lesson');
        setCurrentLesson(null);
        setShowHelp(true);
        analytics.trackEvent('hint_requested', { questionId: currentProblem.id, mode: 'fallback' });
    };

    const closeHelp = () => {
        setShowHelp(false);
        setFeedbackMode('none');
    };

    const skipProblem = () => {
        setWasWrong(false);
        setShowHelp(false);
        setFeedbackMode('none');
        
        analytics.trackEvent('question_skipped', {
            questionId: problems[currentProblemIndex]?.id,
        });
        
        if (currentProblemIndex < problems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const retryQuestion = () => {
        setWasWrong(false);
        setShowHelp(false);
        setFeedbackMode('none');
        setCurrentError(null);
        
        analytics.trackEvent('question_retried', {
            questionId: problems[currentProblemIndex]?.id,
        });
    };

    const resetGame = () => {
        setScore(0);
        setCurrentProblemIndex(0);
        setIsGameOver(false);
        setShowHelp(false);
        setWasWrong(false);
        setFeedbackMode('none');
        setCurrentError(null);
        // Note: We don't reset progress store so students can continue learning
    };

    const toggleDashboard = () => {
        setShowDashboard(!showDashboard);
    };

    return {
        score,
        problems,
        currentProblemIndex,
        isGameOver,
        showHelp,
        wasWrong,
        feedbackMode,
        currentHint,
        currentHintIndex,
        currentLesson,
        currentSolution,
        currentError,
        showDashboard,
        answerProblem,
        resetGame,
        requestHelp,
        closeHelp,
        skipProblem,
        retryQuestion,
        toggleDashboard,
    };
};

export default useGame;