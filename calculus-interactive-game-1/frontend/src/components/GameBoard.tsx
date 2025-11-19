import React from 'react';
import ProblemCard from './ProblemCard';
import HelpModal from './HelpModal';
import LessonModal from './LessonModal';
import ConceptProgress from './ConceptProgress';
import ProgressDashboard from './ProgressDashboard';
import { Lesson } from '../utils/feedback';
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

interface GameBoardProps {
    score: number;
    problems: Problem[];
    currentProblemIndex: number;
    isGameOver: boolean;
    showHelp: boolean;
    wasWrong: boolean;
    feedbackMode: FeedbackMode;
    currentHint: string;
    currentHintIndex: number;
    currentLesson: Lesson | null;
    currentSolution: string[];
    currentError: ErrorAnalysis | null;
    showDashboard: boolean;
    answerProblem: (answer: string) => void;
    resetGame: () => void;
    requestHelp: () => void;
    closeHelp: () => void;
    skipProblem: () => void;
    retryQuestion: () => void;
    toggleDashboard: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
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
}) => {
    const currentProblem = problems[currentProblemIndex];

    return (
        <div className="game-board">
            <h1>Calculus Interactive Game</h1>
            <div className="score-display">
                <h2>Score: {score} / {problems.length}</h2>
                <p>Question {currentProblemIndex + 1} of {problems.length}</p>
                <button 
                    className="button dashboard-button" 
                    onClick={toggleDashboard}
                    aria-label="View progress dashboard"
                >
                    📊 My Progress
                </button>
            </div>
            
            {!isGameOver && currentProblem ? (
                <>
                    {currentError && wasWrong && (
                        <div className="error-analysis-card" role="alert">
                            <h3>🔍 {currentError.explanation}</h3>
                            <p className="error-suggestion">{currentError.suggestion}</p>
                        </div>
                    )}
                    
                    <ProblemCard 
                        problem={currentProblem.question} 
                        onSolve={answerProblem}
                        onRequestHelp={requestHelp}
                        showFeedback={wasWrong}
                    />
                    
                    {currentProblem.conceptIds && currentProblem.conceptIds.length > 0 && (
                        <ConceptProgress conceptIds={currentProblem.conceptIds} />
                    )}
                    
                    {showHelp && feedbackMode === 'hint' && currentHint && (
                        <HelpModal
                            lessonTopic={currentProblem.lessonTopic}
                            lessonUrl={currentProblem.lessonUrl}
                            wasWrong={wasWrong}
                            hint={currentHint}
                            hintIndex={currentHintIndex}
                            hasMoreHints={currentProblem.hints ? currentHintIndex < currentProblem.hints.length - 1 : false}
                            onClose={closeHelp}
                            onSkip={skipProblem}
                            onRetry={retryQuestion}
                        />
                    )}
                    
                    {showHelp && feedbackMode === 'solution' && currentSolution.length > 0 && (
                        <HelpModal
                            lessonTopic={currentProblem.lessonTopic}
                            lessonUrl={currentProblem.lessonUrl}
                            wasWrong={wasWrong}
                            solutionSteps={currentSolution}
                            onClose={closeHelp}
                            onSkip={skipProblem}
                            onRetry={retryQuestion}
                        />
                    )}
                    
                    {showHelp && feedbackMode === 'lesson' && currentLesson && (
                        <LessonModal
                            lesson={currentLesson}
                            onClose={closeHelp}
                            onRetry={retryQuestion}
                        />
                    )}
                    
                    {showDashboard && (
                        <ProgressDashboard onClose={toggleDashboard} />
                    )}
                </>
            ) : isGameOver ? (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Your final score: {score} / {problems.length}</p>
                    <p>Great job working through these calculus problems!</p>
                    <button className="button" onClick={resetGame}>Play Again</button>
                </div>
            ) : (
                <div className="loading">
                    <p>Loading problems...</p>
                </div>
            )}
        </div>
    );
};

export default GameBoard;