import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to the Calculus Interactive Game!</h1>
            <p>Test your calculus skills and have fun!</p>
            <a href="/play" className="start-button">Start Playing</a>
        </div>
    );
};

export default Home;