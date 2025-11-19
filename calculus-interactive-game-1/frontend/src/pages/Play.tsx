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
        currentError,
        showDashboard,
        answerProblem, 
        resetGame, 
        requestHelp, 
        closeHelp, 
        skipProblem,
        retryQuestion,
        toggleDashboard,
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
                currentError={currentError}
                showDashboard={showDashboard}
                answerProblem={answerProblem}
                resetGame={resetGame}
                requestHelp={requestHelp}
                closeHelp={closeHelp}
                skipProblem={skipProblem}
                retryQuestion={retryQuestion}
                toggleDashboard={toggleDashboard}
            />
        </div>
    );
};

export default Play;