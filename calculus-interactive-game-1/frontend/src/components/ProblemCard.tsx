import React from 'react';

interface ProblemCardProps {
    problem: string;
    onSolve: (solution: string) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSolve }) => {
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
        </div>
    );
};

export default ProblemCard;