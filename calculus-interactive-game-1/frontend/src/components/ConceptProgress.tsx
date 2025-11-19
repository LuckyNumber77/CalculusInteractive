import React from 'react';
import { progressStore } from '../utils/progressStore';

interface ConceptProgressProps {
  conceptIds: string[];
}

const ConceptProgress: React.FC<ConceptProgressProps> = ({ conceptIds }) => {
  if (!conceptIds || conceptIds.length === 0) {
    return null;
  }

  const conceptData = conceptIds.map(conceptId => {
    const mistakes = progressStore.getMistakesForConcept(conceptId);
    const hasViewed = progressStore.hasViewedLesson(conceptId);
    
    // Determine mastery level based on mistakes
    let masteryLevel: 'strong' | 'medium' | 'weak' | 'unknown';
    let masteryText: string;
    
    if (mistakes === 0) {
      masteryLevel = 'unknown';
      masteryText = 'Not yet attempted';
    } else if (mistakes <= 2) {
      masteryLevel = 'strong';
      masteryText = 'Good understanding';
    } else if (mistakes <= 4) {
      masteryLevel = 'medium';
      masteryText = 'Needs review';
    } else {
      masteryLevel = 'weak';
      masteryText = 'Needs practice';
    }

    return {
      conceptId,
      mistakes,
      hasViewed,
      masteryLevel,
      masteryText
    };
  });

  // Only show if there's meaningful data
  const hasData = conceptData.some(c => c.mistakes > 0);
  if (!hasData) {
    return null;
  }

  return (
    <div className="concept-progress" role="region" aria-label="Your progress on this concept">
      <h4>📊 Your Progress</h4>
      {conceptData.map(({ conceptId, mistakes, hasViewed, masteryLevel, masteryText }) => (
        <div key={conceptId} className={`concept-item ${masteryLevel}`}>
          <div className="concept-name">{formatConceptName(conceptId)}</div>
          <div className="concept-stats">
            <span className="mistakes-count" title="Number of mistakes">
              ⚠️ {mistakes} {mistakes === 1 ? 'mistake' : 'mistakes'}
            </span>
            {hasViewed && (
              <span className="lesson-viewed" title="You've viewed the lesson">
                ✓ Lesson reviewed
              </span>
            )}
          </div>
          <div className={`mastery-indicator ${masteryLevel}`} role="status" aria-label={masteryText}>
            {masteryText}
          </div>
        </div>
      ))}
    </div>
  );
};

function formatConceptName(conceptId: string): string {
  // Convert kebab-case to Title Case
  return conceptId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default ConceptProgress;
