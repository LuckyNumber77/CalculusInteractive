import React from 'react';
import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';

const Play: React.FC = () => {
    const gameData = useGame();

    return (
        <div className="play-page">
            <GameBoard />
        </div>
    );
};

export default Play;