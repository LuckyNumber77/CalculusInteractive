import React from 'react';

interface HelpModalProps {
    lessonTopic?: string;
    lessonUrl?: string;
    wasWrong: boolean;
    onClose: () => void;
    onSkip: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ 
    lessonTopic, 
    lessonUrl, 
    wasWrong,
    onClose, 
    onSkip 
}) => {
    const baseUrl = 'https://www.whitman.edu/mathematics/multivariable/';
    const linkUrl = lessonUrl || baseUrl;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Need Help?</h2>
                {wasWrong && (
                    <p className="wrong-answer-message">
                        That answer was incorrect. Let's review the lesson!
                    </p>
                )}
                <p>
                    {lessonTopic 
                        ? `Learn more about ${lessonTopic} from the Whitman College Multivariable Calculus resource.`
                        : 'Review calculus concepts from the Whitman College Multivariable Calculus resource.'
                    }
                </p>
                <div className="help-actions">
                    <a 
                        href={linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button primary"
                    >
                        Open Lesson
                    </a>
                    <a 
                        href="/assets/calculus.txt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button"
                    >
                        View Full Calculus Text
                    </a>
                    <button className="button" onClick={onClose}>
                        Try Again
                    </button>
                    <button className="button secondary" onClick={onSkip}>
                        Skip Problem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
