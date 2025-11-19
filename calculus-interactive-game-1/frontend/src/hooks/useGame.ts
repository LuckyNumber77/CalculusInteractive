import { useState, useEffect } from 'react';
import { progressStore } from '../utils/progressStore';
import { analytics } from '../utils/analytics';
import { handleIncorrectAnswer, handleCorrectAnswer, fetchLessonByConcept, Question, Lesson } from '../utils/feedback';
import { ErrorAnalysis } from '../utils/errorDetection';

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
                id: 'fallback_001',
                question: 'What is the derivative of x^2?', 
                answer: '2x',
                conceptIds: ['power-rule'],
                hints: ['Remember the power rule: d/dx[x^n] = n*x^(n-1)'],
                lessonTopic: 'Derivatives',
                lessonUrl: 'https://www.whitman.edu/mathematics/multivariable/multivariable_13_Derivatives.html'
            },
            { 
                id: 'fallback_002',
                question: 'What is the integral of x?', 
                answer: '0.5x^2 + C',
                conceptIds: ['integration-power-rule'],
                hints: ['Use the power rule for integration: ∫x^n dx = x^(n+1)/(n+1) + C'],
                lessonTopic: 'Integration',
                lessonUrl: 'https://www.whitman.edu/mathematics/multivariable/multivariable_14_Integration.html'
            },
        ];
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

    const requestHelp = () => {
        setShowHelp(true);
        analytics.trackEvent('hint_requested', {
            questionId: problems[currentProblemIndex]?.id,
        });
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