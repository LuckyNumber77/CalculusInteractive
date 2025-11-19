import React from 'react';

interface HelpModalProps {
    lessonTopic?: string;
    lessonUrl?: string;
    wasWrong: boolean;
    hint?: string;
    hintIndex?: number;
    hasMoreHints?: boolean;
    solutionSteps?: string[];
    onClose: () => void;
    onSkip: () => void;
    onRetry: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ 
    lessonTopic, 
    lessonUrl, 
    wasWrong,
    hint,
    hintIndex,
    hasMoreHints,
    solutionSteps,
    onClose, 
    onSkip,
    onRetry,
}) => {
    // Default to viewing the full calculus text if no specific lesson URL is provided
    const defaultUrl = '/assets/calculus.txt';
    const linkUrl = lessonUrl || defaultUrl;

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="help-modal-title">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="modal-close" 
                    onClick={onClose}
                    aria-label="Close help"
                >
                    ×
                </button>
                
                <h2 id="help-modal-title">
                    {hint ? '💡 Hint' : solutionSteps ? '📝 Solution Steps' : 'Need Help?'}
                </h2>
                
                {wasWrong && !hint && !solutionSteps && (
                    <p className="wrong-answer-message" role="alert">
                        That answer was incorrect. Let's review the lesson!
                    </p>
                )}

                {hint && (
                    <div className="hint-content">
                        {hintIndex !== undefined && (
                            <p className="hint-number">Hint {hintIndex + 1}</p>
                        )}
                        <p className="hint-text">{hint}</p>
                        {hasMoreHints && (
                            <p className="hint-info">
                                💡 Try answering again. If you need more help, another hint will appear.
                            </p>
                        )}
                    </div>
                )}

                {solutionSteps && solutionSteps.length > 0 && (
                    <div className="solution-content">
                        <p>Here's how to solve this problem:</p>
                        <ol className="solution-steps">
                            {solutionSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {!hint && !solutionSteps && (
                    <p>
                        {lessonTopic 
                            ? `Learn more about ${lessonTopic}.`
                            : 'Review calculus concepts in the full textbook.'
                        }
                    </p>
                )}
                
                <div className="help-actions">
                    {(hint || solutionSteps) && (
                        <button 
                            className="button primary" 
                            onClick={onRetry}
                            aria-label="Try the question again"
                        >
                            Try Again
                        </button>
                    )}
                    
                    {!hint && !solutionSteps && (
                        <>
                            <a 
                                href={linkUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="button primary"
                            >
                                View Calculus Text
                            </a>
                            <button className="button" onClick={onRetry}>
                                Try Again
                            </button>
                        </>
                    )}
                    
                    <button 
                        className="button secondary" 
                        onClick={onSkip}
                        aria-label="Skip this problem"
                    >
                        Skip Problem
                    </button>
                    
                    <button 
                        className="button secondary" 
                        onClick={onClose}
                        aria-label="Close and continue"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
