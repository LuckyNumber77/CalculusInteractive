import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Topic } from '../types/topic';

interface TopicCardProps {
    topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/topic/${topic.id}`);
    };

    return (
        <div 
            className="topic-card" 
            onClick={handleClick}
            style={{ borderColor: topic.color }}
        >
            <div className="topic-icon" style={{ background: topic.color }}>
                {topic.icon}
            </div>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div className="topic-progress">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '0%', background: topic.color }}></div>
                </div>
                <span className="progress-text">Start Learning</span>
            </div>
        </div>
    );
};

export default TopicCard;
