import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="home-content">
                <h1 className="home-title">Welcome to Calculus Interactive! 🎓</h1>
                <p className="home-subtitle">Learn calculus the fun way - like Duolingo, but for math!</p>
                
                <div className="features">
                    <div className="feature-card">
                        <span className="feature-icon">📚</span>
                        <h3>Interactive Lessons</h3>
                        <p>Learn concepts step-by-step</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🎯</span>
                        <h3>Practice Questions</h3>
                        <p>Master skills with guided practice</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🏆</span>
                        <h3>Track Progress</h3>
                        <p>See your improvement over time</p>
                    </div>
                </div>

                <button 
                    className="start-button-modern"
                    onClick={() => navigate('/topics')}
                >
                    Start Learning →
                </button>
            </div>
        </div>
    );
};

export default Home;