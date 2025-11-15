import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types/topic';

const TopicSelection: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/topics');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error);
            // Use fallback data if API fails
            setTopics(getFallbackTopics());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackTopics = (): Topic[] => {
        return [
            {
                id: 'derivatives',
                name: 'Derivatives',
                description: 'Learn about rates of change and slopes',
                icon: '📈',
                color: '#4CAF50',
                lessons: []
            },
            {
                id: 'integrals',
                name: 'Integrals',
                description: 'Learn about area under curves',
                icon: '∫',
                color: '#2196F3',
                lessons: []
            },
            {
                id: 'limits',
                name: 'Limits',
                description: 'Understand the foundation of calculus',
                icon: '→',
                color: '#FF9800',
                lessons: []
            },
            {
                id: 'chain-rule',
                name: 'Chain Rule',
                description: 'Master composite function derivatives',
                icon: '🔗',
                color: '#9C27B0',
                lessons: []
            }
        ];
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading topics...</p>
            </div>
        );
    }

    return (
        <div className="topic-selection">
            <div className="topic-header">
                <h1>Choose Your Calculus Adventure! 🎓</h1>
                <p>Select a topic to start learning and practicing</p>
            </div>
            
            <div className="topics-grid">
                {topics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                ))}
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Day Streak</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Total XP</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-value">0</div>
                    <div className="stat-label">Achievements</div>
                </div>
            </div>
        </div>
    );
};

export default TopicSelection;
