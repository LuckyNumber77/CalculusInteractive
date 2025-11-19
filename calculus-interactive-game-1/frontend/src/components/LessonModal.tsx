import React, { useState } from 'react';
import { Lesson, LessonStep } from '../utils/feedback';
import { analytics } from '../utils/analytics';
import { progressStore } from '../utils/progressStore';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onRetry: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onRetry }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceResult, setPracticeResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showPracticeSolution, setShowPracticeSolution] = useState(false);

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
      setPracticeAnswer('');
      setPracticeResult(null);
      setShowPracticeSolution(false);
    } else {
      // Mark lesson as completed
      progressStore.markLessonViewed(lesson.conceptId);
      analytics.trackEvent('lesson_completed', {
        conceptId: lesson.conceptId,
      });
      onClose();
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
      setPracticeAnswer('');
      setPracticeResult(null);
      setShowPracticeSolution(false);
    }
  };

  const handlePracticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep.type === 'practice' && currentStep.answer) {
      // Simple answer checking (normalize whitespace)
      const normalizedAnswer = practiceAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
      const normalizedCorrect = currentStep.answer.trim().toLowerCase().replace(/\s+/g, ' ');
      
      if (normalizedAnswer === normalizedCorrect) {
        setPracticeResult('correct');
      } else {
        setPracticeResult('incorrect');
      }
    }
  };

  const handleSkipPractice = () => {
    setShowPracticeSolution(true);
    setPracticeResult(null);
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'explanation':
        return (
          <div className="lesson-step explanation">
            <h4>📚 Understanding the Concept</h4>
            <p>{currentStep.content}</p>
          </div>
        );

      case 'example':
        return (
          <div className="lesson-step example">
            <h4>💡 Example</h4>
            <p>{currentStep.content}</p>
            {currentStep.solution && (
              <div className="example-solution">
                <strong>Solution:</strong>
                <p>{currentStep.solution}</p>
              </div>
            )}
          </div>
        );

      case 'practice':
        return (
          <div className="lesson-step practice">
            <h4>✏️ Practice Problem</h4>
            <p>{currentStep.content}</p>
            
            {!showPracticeSolution && !practiceResult && (
              <form onSubmit={handlePracticeSubmit} className="practice-form">
                <input
                  type="text"
                  value={practiceAnswer}
                  onChange={(e) => setPracticeAnswer(e.target.value)}
                  placeholder="Your answer"
                  aria-label="Practice answer input"
                />
                <div className="practice-buttons">
                  <button type="submit" className="button primary">
                    Check Answer
                  </button>
                  <button 
                    type="button" 
                    className="button secondary"
                    onClick={handleSkipPractice}
                  >
                    Show Solution
                  </button>
                </div>
              </form>
            )}

            {practiceResult === 'correct' && (
              <div className="practice-feedback correct" role="alert">
                <strong>✓ Correct!</strong> Great job! You've got it.
              </div>
            )}

            {practiceResult === 'incorrect' && (
              <div className="practice-feedback incorrect" role="alert">
                <strong>✗ Not quite.</strong>
                {currentStep.hint && <p>Hint: {currentStep.hint}</p>}
                <button 
                  className="button secondary"
                  onClick={() => {
                    setPracticeAnswer('');
                    setPracticeResult(null);
                  }}
                >
                  Try Again
                </button>
                <button 
                  className="button secondary"
                  onClick={handleSkipPractice}
                >
                  Show Solution
                </button>
              </div>
            )}

            {showPracticeSolution && currentStep.answer && (
              <div className="practice-solution">
                <strong>Solution:</strong>
                <p>{currentStep.answer}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="lesson-title">
      <div className="modal-content lesson-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close lesson"
        >
          ×
        </button>
        
        <div className="lesson-header">
          <h2 id="lesson-title">{lesson.title}</h2>
          <p className="lesson-description">{lesson.shortDescription}</p>
        </div>

        <div className="lesson-progress">
          <span>Step {currentStepIndex + 1} of {lesson.steps.length}</span>
          <div className="progress-bar" role="progressbar" aria-valuenow={currentStepIndex + 1} aria-valuemin={1} aria-valuemax={lesson.steps.length}>
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="lesson-content">
          {renderStepContent()}
        </div>

        <div className="lesson-navigation">
          <button
            className="button secondary"
            onClick={handlePrevious}
            disabled={isFirstStep}
            aria-label="Previous step"
          >
            ← Previous
          </button>

          <button
            className="button primary"
            onClick={handleNext}
            aria-label={isLastStep ? "Complete lesson" : "Next step"}
          >
            {isLastStep ? 'Complete Lesson' : 'Next →'}
          </button>
        </div>

        <div className="lesson-actions">
          <button 
            className="button" 
            onClick={() => {
              progressStore.markLessonViewed(lesson.conceptId);
              onRetry();
            }}
          >
            Try Question Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
