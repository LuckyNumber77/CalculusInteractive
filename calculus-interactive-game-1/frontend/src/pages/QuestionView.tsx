import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question, Lesson } from '../types/topic';

const QuestionView: React.FC = () => {
    const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLesson();
    }, [topicId, lessonId]);

    const fetchLesson = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/topics/${topicId}/lessons/${lessonId}`);
            const data = await response.json();
            setLesson(data);
        } catch (error) {
            console.error('Error fetching lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    const currentQuestion = lesson?.questions[currentQuestionIndex];

    const handleAnswerSelect = (answer: string) => {
        if (!showFeedback) {
            setSelectedAnswer(answer);
        }
    };

    const handleSubmit = () => {
        if (!selectedAnswer || !currentQuestion) return;

        const correct = selectedAnswer === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 10);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }
    };

    const handleNext = () => {
        if (lesson && currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setShowFeedback(false);
            setShowHint(false);
        } else {
            // Lesson complete
            navigate(`/topic/${topicId}/complete`, { 
                state: { score, totalQuestions: lesson?.questions.length || 0 } 
            });
        }
    };

    const goBackToTopics = () => {
        navigate('/topics');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading questions...</p>
            </div>
        );
    }

    if (!lesson || !currentQuestion) {
        return (
            <div className="error-screen">
                <h2>Questions not found</h2>
                <button className="button" onClick={goBackToTopics}>Back to Topics</button>
            </div>
        );
    }

    return (
        <div className="question-view">
            <div className="question-header">
                <button className="back-button-small" onClick={goBackToTopics}>
                    ← Menu
                </button>
                <div className="progress-section">
                    <div className="question-progress">
                        Question {currentQuestionIndex + 1} of {lesson.questions.length}
                    </div>
                    <div className="progress-bar-thin">
                        <div 
                            className="progress-fill-animated" 
                            style={{ width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="score-display-small">
                    <span className="score-label">Score:</span> {score}
                    {streak > 1 && <span className="streak-badge">🔥 {streak}</span>}
                </div>
            </div>

            <div className="question-container">
                <div className="question-card-interactive">
                    <h2 className="question-text">{currentQuestion.question}</h2>

                    {currentQuestion.type === 'multiple-choice' && (
                        <div className="options-grid">
                            {currentQuestion.options?.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-button ${
                                        selectedAnswer === option ? 'selected' : ''
                                    } ${
                                        showFeedback && option === currentQuestion.correctAnswer
                                            ? 'correct'
                                            : showFeedback && selectedAnswer === option
                                            ? 'incorrect'
                                            : ''
                                    }`}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={showFeedback}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span className="option-text">{option}</span>
                                    {showFeedback && option === currentQuestion.correctAnswer && (
                                        <span className="check-icon">✓</span>
                                    )}
                                    {showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                                        <span className="x-icon">✗</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {showFeedback && (
                        <div className={`feedback-card ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                            <div className="feedback-header">
                                {isCorrect ? (
                                    <>
                                        <span className="feedback-emoji">🎉</span>
                                        <h3>Correct!</h3>
                                    </>
                                ) : (
                                    <>
                                        <span className="feedback-emoji">💡</span>
                                        <h3>Not quite right</h3>
                                    </>
                                )}
                            </div>
                            <p className="feedback-explanation">{currentQuestion.explanation}</p>
                        </div>
                    )}

                    <div className="question-actions">
                        {!showFeedback && (
                            <>
                                {currentQuestion.hint && (
                                    <button 
                                        className="button-hint"
                                        onClick={() => setShowHint(!showHint)}
                                    >
                                        💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                                    </button>
                                )}
                                <button
                                    className="button-submit"
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                >
                                    Check Answer
                                </button>
                            </>
                        )}
                        {showFeedback && (
                            <button
                                className="button-next"
                                onClick={handleNext}
                            >
                                {currentQuestionIndex < lesson.questions.length - 1 ? 'Next Question →' : 'Complete! 🎉'}
                            </button>
                        )}
                    </div>

                    {showHint && !showFeedback && currentQuestion.hint && (
                        <div className="hint-card">
                            <strong>💡 Hint:</strong> {currentQuestion.hint}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionView;
