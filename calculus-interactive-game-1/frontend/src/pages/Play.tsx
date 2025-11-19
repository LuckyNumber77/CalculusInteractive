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
                feedbackMode={feedbackMode}
                currentHint={currentHint}
                currentHintIndex={currentHintIndex}
                currentLesson={currentLesson}
                currentSolution={currentSolution}
                answerProblem={answerProblem}
                resetGame={resetGame}
                requestHelp={requestHelp}
                closeHelp={closeHelp}
                skipProblem={skipProblem}
                retryQuestion={retryQuestion}
            />
        </div>
    );
};

export default Play;