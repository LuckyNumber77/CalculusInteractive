import React from 'react';
import GameBoard from '../components/GameBoard';
import FontSizeControl from '../components/FontSizeControl';
import useGame from '../hooks/useGame';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

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

    // Enable keyboard shortcuts when not in game over state
    useKeyboardShortcuts({
        onHelp: requestHelp,
        onSkip: skipProblem,
        onRetry: retryQuestion,
        onDashboard: toggleDashboard,
    }, !isGameOver);

    return (
        <div className="play-page">
            <div className="accessibility-controls">
                <FontSizeControl />
            </div>
            <div className="keyboard-hint" role="note" aria-label="Keyboard shortcuts">
                💡 Shortcuts: <kbd>H</kbd> Help • <kbd>S</kbd> Skip • <kbd>R</kbd> Retry • <kbd>D</kbd> Dashboard
            </div>
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