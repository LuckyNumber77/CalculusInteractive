// Feedback handler for incorrect answers - implements layered feedback system

import { progressStore, ProgressStore } from './progressStore';
import { analytics } from './analytics';

export type Question = {
  id: string;
  question: string;
  answer: string;
  conceptIds?: string[];
  hints?: string[];
  solutionSteps?: string[];
  topic?: string;
};

export type Lesson = {
  id: string;
  conceptId: string;
  title: string;
  shortDescription: string;
  steps: LessonStep[];
};

export type LessonStep = {
  type: 'explanation' | 'example' | 'practice';
  content: string;
  solution?: string;
  answer?: string;
  hint?: string;
};

export type FeedbackAction = 
  | { type: 'show_hint'; hint: string; hintIndex: number }
  | { type: 'show_lesson'; lesson: Lesson }
  | { type: 'show_solution'; steps: string[] }
  | { type: 'show_message'; message: string };

export interface UIHooks {
  showHint: (hint: string, hintIndex: number) => void;
  showLesson: (lesson: Lesson) => void;
  showSolutionSteps: (steps: string[]) => void;
  showMessage: (message: string) => void;
}

/**
 * Handles incorrect answer feedback with layered approach:
 * 1. First mistakes: Show progressive hints
 * 2. After 2+ mistakes: Offer lesson
 * 3. Fallback: Show solution steps
 */
export async function handleIncorrectAnswer(
  question: Question,
  userAnswer: string,
  progress: ProgressStore,
  ui: UIHooks,
  fetchLessonByConcept: (conceptId: string) => Promise<Lesson | null>
): Promise<FeedbackAction> {
  // Track the mistake
  progress.incrementMistakeForQuestion(question.id);
  
  // Track mistakes for all concepts this question covers
  if (question.conceptIds) {
    for (const conceptId of question.conceptIds) {
      progress.incrementMistakeForConcept(conceptId);
    }
  }

  const qMistakes = progress.getMistakesForQuestion(question.id);
  const hintIndex = progress.getHintIndexForQuestion(question.id);

  // Track analytics
  analytics.trackEvent('wrong_answer', {
    questionId: question.id,
    conceptId: question.conceptIds?.[0],
    attemptNumber: qMistakes,
  });

  // Layered feedback policy:
  // 1-2 mistakes: Show progressive hints (if available)
  if (question.hints && question.hints.length > 0 && hintIndex < question.hints.length) {
    const hint = question.hints[hintIndex];
    progress.incrementHintIndexForQuestion(question.id);
    
    analytics.trackEvent('hint_viewed', {
      questionId: question.id,
      conceptId: question.conceptIds?.[0],
      attemptNumber: qMistakes,
      metadata: { hintIndex },
    });

    ui.showHint(hint, hintIndex);
    return { type: 'show_hint', hint, hintIndex };
  }

  // After hints exhausted or 3+ mistakes: Try to fetch and show lesson
  if (question.conceptIds && question.conceptIds.length > 0) {
    const primaryConcept = question.conceptIds[0];
    
    try {
      const lesson = await fetchLessonByConcept(primaryConcept);
      if (lesson) {
        analytics.trackEvent('lesson_opened', {
          questionId: question.id,
          conceptId: primaryConcept,
          attemptNumber: qMistakes,
        });

        ui.showLesson(lesson);
        return { type: 'show_lesson', lesson };
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    }
  }

  // Fallback: Show full solution steps if available
  if (question.solutionSteps && question.solutionSteps.length > 0) {
    analytics.trackEvent('solution_viewed', {
      questionId: question.id,
      conceptId: question.conceptIds?.[0],
      attemptNumber: qMistakes,
    });

    ui.showSolutionSteps(question.solutionSteps);
    return { type: 'show_solution', steps: question.solutionSteps };
  }

  // Last resort: Generic message
  const message = "That's not quite right. Review the fundamentals for this topic and try again!";
  ui.showMessage(message);
  return { type: 'show_message', message };
}

/**
 * Handle correct answer - track analytics
 */
export function handleCorrectAnswer(question: Question): void {
  const qMistakes = progressStore.getMistakesForQuestion(question.id);
  
  analytics.trackEvent('correct_answer', {
    questionId: question.id,
    conceptId: question.conceptIds?.[0],
    attemptNumber: qMistakes + 1, // +1 because this is the successful attempt
  });
}

/**
 * Fetch lesson from backend or local data
 */
export async function fetchLessonByConcept(conceptId: string): Promise<Lesson | null> {
  try {
    // Try to fetch from backend API first
    const response = await fetch(`/api/lessons/${conceptId}`);
    if (response.ok) {
      return await response.json();
    }
    
    // Fallback: Load from local lessons data
    const lessonsResponse = await fetch('/data/lessons.json');
    if (lessonsResponse.ok) {
      const lessonsData = await lessonsResponse.json();
      const lesson = lessonsData.lessons?.find((l: Lesson) => l.conceptId === conceptId);
      return lesson || null;
    }
  } catch (error) {
    console.error('Error fetching lesson:', error);
  }
  
  return null;
}
