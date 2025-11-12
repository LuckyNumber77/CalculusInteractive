import React from 'react';
import GameBoard from '../components/GameBoard';
import HUD from '../components/HUD';
import useGame from '../hooks/useGame';

const Play: React.FC = () => {
    const { gameState, startGame, resetGame } = useGame();

    return (
        <div className="play-page">
            <HUD gameState={gameState} onReset={resetGame} />
            <GameBoard gameState={gameState} onStart={startGame} />
        </div>
    );
};

export default Play;