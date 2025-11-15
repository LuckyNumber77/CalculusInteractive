import React from 'react';
import ProblemCard from './ProblemCard';
import HelpModal from './HelpModal';

interface Problem {
    question: string;
    answer: string;
    lessonTopic?: string;
    lessonUrl?: string;
}

interface GameBoardProps {
    score: number;
    problems: Problem[];
    currentProblemIndex: number;
    isGameOver: boolean;
    showHelp: boolean;
    wasWrong: boolean;
    answerProblem: (answer: string) => void;
    resetGame: () => void;
    requestHelp: () => void;
    closeHelp: () => void;
    skipProblem: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
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
}) => {
    const currentProblem = problems[currentProblemIndex];

    return (
        <div className="game-board">
            <h1>Calculus Interactive Game</h1>
            <div className="score-display">
                <h2>Score: {score} / {problems.length}</h2>
            </div>
            
            {!isGameOver && currentProblem ? (
                <>
                    <ProblemCard 
                        problem={currentProblem.question} 
                        onSolve={answerProblem}
                        onRequestHelp={requestHelp}
                    />
                    {showHelp && (
                        <HelpModal
                            lessonTopic={currentProblem.lessonTopic}
                            lessonUrl={currentProblem.lessonUrl}
                            wasWrong={wasWrong}
                            onClose={closeHelp}
                            onSkip={skipProblem}
                        />
                    )}
                </>
            ) : isGameOver ? (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Your final score: {score} / {problems.length}</p>
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