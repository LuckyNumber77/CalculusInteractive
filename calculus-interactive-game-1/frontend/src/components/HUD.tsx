import React from 'react';

const HUD: React.FC = () => {
    return (
        <div className="hud">
            <h2>Game Status</h2>
            <p>Score: 0</p>
            <p>Time Remaining: 00:00</p>
            <p>Current Level: 1</p>
        </div>
    );
};

export default HUD;