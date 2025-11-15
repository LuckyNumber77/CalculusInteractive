import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Topic, Lesson } from '../types/topic';

const LessonView: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopic();
    }, [topicId]);

    const fetchTopic = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/topics/${topicId}`);
            const data = await response.json();
            setTopic(data);
            if (data.lessons && data.lessons.length > 0) {
                setCurrentLesson(data.lessons[0]);
            }
        } catch (error) {
            console.error('Error fetching topic:', error);
        } finally {
            setLoading(false);
        }
    };

    const startQuestions = () => {
        if (currentLesson) {
            navigate(`/topic/${topicId}/lesson/${currentLesson.id}/questions`);
        }
    };

    const goBack = () => {
        navigate('/topics');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading lesson...</p>
            </div>
        );
    }

    if (!topic || !currentLesson) {
        return (
            <div className="error-screen">
                <h2>Lesson not found</h2>
                <button className="button" onClick={goBack}>Back to Topics</button>
            </div>
        );
    }

    return (
        <div className="lesson-view">
            <div className="lesson-header">
                <button className="back-button" onClick={goBack}>
                    ← Back to Topics
                </button>
                <div className="lesson-title-section">
                    <span className="topic-icon-large" style={{ background: topic.color }}>
                        {topic.icon}
                    </span>
                    <div>
                        <h1>{currentLesson.title}</h1>
                        <p className="topic-name">{topic.name}</p>
                    </div>
                </div>
            </div>

            <div className="lesson-content">
                <div className="content-card">
                    <h2>📚 Learn</h2>
                    <p className="lesson-text">{currentLesson.content}</p>
                </div>

                {currentLesson.examples && currentLesson.examples.length > 0 && (
                    <div className="examples-section">
                        <h2>💡 Examples</h2>
                        {currentLesson.examples.map((example, index) => (
                            <div key={index} className="example-card">
                                <div className="example-problem">
                                    <strong>Problem:</strong> {example.problem}
                                </div>
                                <div className="example-solution">
                                    <strong>Solution:</strong> {example.solution}
                                </div>
                                <div className="example-explanation">
                                    <strong>Explanation:</strong> {example.explanation}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="lesson-actions">
                    <button 
                        className="button-primary button-large"
                        onClick={startQuestions}
                    >
                        Start Practice! 🚀
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonView;
