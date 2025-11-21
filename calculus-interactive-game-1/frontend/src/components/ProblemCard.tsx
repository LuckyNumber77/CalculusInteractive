import React from 'react';
import { renderMathToHTML } from '../utils/formatMath';

interface ProblemCardProps {
    problem: string;
    onSolve: (solution: string) => void;
    onRequestHelp: () => void;
    showFeedback?: boolean;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSolve, onRequestHelp, showFeedback }) => {
    const [solution, setSolution] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (solution.trim()) {
            onSolve(solution);
            setSolution('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Allow submit with Enter key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (solution.trim()) {
                onSolve(solution);
                setSolution('');
            }
        }
    };

    return (
        <div className="problem-card" role="region" aria-label="Problem card">
            <h3 id="problem-title">Problem:</h3>
            <p 
                className="problem-text" 
                aria-labelledby="problem-title"
                dangerouslySetInnerHTML={{ __html: renderMathToHTML(problem) }}
            />
            
            {showFeedback && (
                <div className="feedback-message incorrect" role="alert">
                    ❌ That's not quite right. Try again or view a hint below!
                </div>
            )}
            
            <form onSubmit={handleSubmit} aria-label="Answer form">
                <label htmlFor="solution-input" className="visually-hidden">
                    Your solution
                </label>
                <input
                    id="solution-input"
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Your solution"
                    aria-required="true"
                    aria-invalid={showFeedback}
                    autoComplete="off"
                />
                <button 
                    type="submit" 
                    className="button primary"
                    disabled={!solution.trim()}
                    aria-label="Submit answer"
                >
                    Submit
                </button>
            </form>
            
            <button 
                type="button" 
                className="help-button button secondary"
                onClick={onRequestHelp}
                aria-label="Request help with this problem"
            >
                💡 Need Help?
            </button>
        </div>
    );
};

export default ProblemCard;