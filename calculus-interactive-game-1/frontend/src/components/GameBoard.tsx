import React from 'react';
import ProblemCard from './ProblemCard';
import HelpModal from './HelpModal';
import LessonModal from './LessonModal';
import { Lesson } from '../utils/feedback';

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

type FeedbackMode = 'none' | 'hint' | 'lesson' | 'solution';

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
    answerProblem: (answer: string) => void;
    resetGame: () => void;
    requestHelp: () => void;
    closeHelp: () => void;
    skipProblem: () => void;
    retryQuestion: () => void;
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
    answerProblem,
    resetGame,
    requestHelp,
    closeHelp,
    skipProblem,
    retryQuestion,
}) => {
    const currentProblem = problems[currentProblemIndex];

    return (
        <div className="game-board">
            <h1>Calculus Interactive Game</h1>
            <div className="score-display">
                <h2>Score: {score} / {problems.length}</h2>
                <p>Question {currentProblemIndex + 1} of {problems.length}</p>
            </div>
            
            {!isGameOver && currentProblem ? (
                <>
                    <ProblemCard 
                        problem={currentProblem.question} 
                        onSolve={answerProblem}
                        onRequestHelp={requestHelp}
                        showFeedback={wasWrong}
                    />
                    
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