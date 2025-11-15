import React from 'react';
import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';

const Play: React.FC = () => {
    const { score, problems, currentProblemIndex, isGameOver, answerProblem, resetGame } = useGame();

    return (
        <div className="play-page">
            <GameBoard 
                score={score}
                problems={problems}
                currentProblemIndex={currentProblemIndex}
                isGameOver={isGameOver}
                answerProblem={answerProblem}
                resetGame={resetGame}
            />
        </div>
    );
};

export default Play;