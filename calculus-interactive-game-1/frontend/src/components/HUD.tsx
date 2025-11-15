import React from 'react';
import { useLocation } from 'react-router-dom';

const HUD: React.FC = () => {
    const location = useLocation();
    const isGamePage = location.pathname === '/play';

    return (
        <div className="hud">
            <h2>Calculus Interactive Game</h2>
            {isGamePage && (
                <p>Answer calculus problems to increase your score!</p>
            )}
        </div>
    );
};

export default HUD;