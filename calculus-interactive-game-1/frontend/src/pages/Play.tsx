import React from 'react';
import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';

const Play: React.FC = () => {
    const { 
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
        skipProblem 
    } = useGame();

    return (
        <div className="play-page">
            <GameBoard 
                score={score}
                problems={problems}
                currentProblemIndex={currentProblemIndex}
                isGameOver={isGameOver}
                showHelp={showHelp}
                wasWrong={wasWrong}
                answerProblem={answerProblem}
                resetGame={resetGame}
                requestHelp={requestHelp}
                closeHelp={closeHelp}
                skipProblem={skipProblem}
            />
        </div>
    );
};

export default Play;