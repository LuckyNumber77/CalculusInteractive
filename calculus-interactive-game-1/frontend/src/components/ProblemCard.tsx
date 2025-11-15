import React from 'react';

interface ProblemCardProps {
    problem: string;
    onSolve: (solution: string) => void;
    onRequestHelp: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSolve, onRequestHelp }) => {
    const [solution, setSolution] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSolve(solution);
        setSolution('');
    };

    return (
        <div className="problem-card">
            <h3>Problem:</h3>
            <p>{problem}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Your solution"
                />
                <button type="submit">Submit</button>
            </form>
            <button 
                type="button" 
                className="help-button"
                onClick={onRequestHelp}
            >
                Need Help?
            </button>
        </div>
    );
};

export default ProblemCard;