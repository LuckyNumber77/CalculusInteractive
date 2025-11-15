import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const LessonComplete: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { topicId } = useParams<{ topicId: string }>();
    const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

    const percentage = totalQuestions > 0 ? Math.round((score / (totalQuestions * 10)) * 100) : 0;

    const getMessage = () => {
        if (percentage >= 90) return { emoji: '🏆', text: 'Outstanding!', color: '#FFD700' };
        if (percentage >= 70) return { emoji: '🎉', text: 'Great Job!', color: '#4CAF50' };
        if (percentage >= 50) return { emoji: '👍', text: 'Good Effort!', color: '#2196F3' };
        return { emoji: '💪', text: 'Keep Practicing!', color: '#FF9800' };
    };

    const message = getMessage();

    return (
        <div className="lesson-complete">
            <div className="celebration-container">
                <div className="celebration-emoji" style={{ color: message.color }}>
                    {message.emoji}
                </div>
                <h1 className="celebration-title">{message.text}</h1>
                <p className="celebration-subtitle">Lesson Complete!</p>

                <div className="results-card">
                    <div className="result-item">
                        <div className="result-label">Your Score</div>
                        <div className="result-value">{score}</div>
                    </div>
                    <div className="result-item">
                        <div className="result-label">Questions</div>
                        <div className="result-value">{totalQuestions}</div>
                    </div>
                    <div className="result-item">
                        <div className="result-label">Accuracy</div>
                        <div className="result-value">{percentage}%</div>
                    </div>
                </div>

                <div className="celebration-actions">
                    <button 
                        className="button-primary button-large"
                        onClick={() => navigate('/topics')}
                    >
                        Back to Topics
                    </button>
                    <button 
                        className="button-secondary button-large"
                        onClick={() => navigate(`/topic/${topicId}`)}
                    >
                        Review Lesson
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonComplete;
