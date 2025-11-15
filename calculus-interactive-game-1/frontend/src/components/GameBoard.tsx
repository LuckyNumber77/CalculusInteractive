import React from 'react';
import ProblemCard from './ProblemCard';

interface Problem {
    question: string;
    answer: string;
}

interface GameBoardProps {
    score: number;
    problems: Problem[];
    currentProblemIndex: number;
    isGameOver: boolean;
    answerProblem: (answer: string) => void;
    resetGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
    score,
    problems,
    currentProblemIndex,
    isGameOver,
    answerProblem,
    resetGame,
}) => {
    const currentProblem = problems[currentProblemIndex];

    return (
        <div className="game-board">
            <h1>Calculus Interactive Game</h1>
            <div className="score-display">
                <h2>Score: {score} / {problems.length}</h2>
            </div>
            
            {!isGameOver && currentProblem ? (
                <ProblemCard 
                    problem={currentProblem.question} 
                    onSolve={answerProblem} 
                />
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