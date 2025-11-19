// Progress tracking using localStorage

export interface ProgressStore {
  getMistakesForQuestion(qid: string): number;
  incrementMistakeForQuestion(qid: string): void;
  getMistakesForConcept(conceptId: string): number;
  incrementMistakeForConcept(conceptId: string): void;
  getHintIndexForQuestion(qid: string): number;
  incrementHintIndexForQuestion(qid: string): void;
  hasViewedLesson(conceptId: string): boolean;
  markLessonViewed(conceptId: string): void;
  reset(): void;
}

class LocalStorageProgressStore implements ProgressStore {
  private readonly QUESTION_MISTAKES_KEY = 'calculus_game_question_mistakes';
  private readonly CONCEPT_MISTAKES_KEY = 'calculus_game_concept_mistakes';
  private readonly HINT_INDEX_KEY = 'calculus_game_hint_index';
  private readonly LESSONS_VIEWED_KEY = 'calculus_game_lessons_viewed';

  private getStoredData<T>(key: string): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : {};
    } catch {
      return {} as T;
    }
  }

  private setStoredData<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  getMistakesForQuestion(qid: string): number {
    const mistakes = this.getStoredData<Record<string, number>>(this.QUESTION_MISTAKES_KEY);
    return mistakes[qid] || 0;
  }

  incrementMistakeForQuestion(qid: string): void {
    const mistakes = this.getStoredData<Record<string, number>>(this.QUESTION_MISTAKES_KEY);
    mistakes[qid] = (mistakes[qid] || 0) + 1;
    this.setStoredData(this.QUESTION_MISTAKES_KEY, mistakes);
  }

  getMistakesForConcept(conceptId: string): number {
    const mistakes = this.getStoredData<Record<string, number>>(this.CONCEPT_MISTAKES_KEY);
    return mistakes[conceptId] || 0;
  }

  incrementMistakeForConcept(conceptId: string): void {
    const mistakes = this.getStoredData<Record<string, number>>(this.CONCEPT_MISTAKES_KEY);
    mistakes[conceptId] = (mistakes[conceptId] || 0) + 1;
    this.setStoredData(this.CONCEPT_MISTAKES_KEY, mistakes);
  }

  getHintIndexForQuestion(qid: string): number {
    const hints = this.getStoredData<Record<string, number>>(this.HINT_INDEX_KEY);
    return hints[qid] || 0;
  }

  incrementHintIndexForQuestion(qid: string): void {
    const hints = this.getStoredData<Record<string, number>>(this.HINT_INDEX_KEY);
    hints[qid] = (hints[qid] || 0) + 1;
    this.setStoredData(this.HINT_INDEX_KEY, hints);
  }

  hasViewedLesson(conceptId: string): boolean {
    const viewed = this.getStoredData<Record<string, boolean>>(this.LESSONS_VIEWED_KEY);
    return viewed[conceptId] || false;
  }

  markLessonViewed(conceptId: string): void {
    const viewed = this.getStoredData<Record<string, boolean>>(this.LESSONS_VIEWED_KEY);
    viewed[conceptId] = true;
    this.setStoredData(this.LESSONS_VIEWED_KEY, viewed);
  }

  reset(): void {
    localStorage.removeItem(this.QUESTION_MISTAKES_KEY);
    localStorage.removeItem(this.CONCEPT_MISTAKES_KEY);
    localStorage.removeItem(this.HINT_INDEX_KEY);
    localStorage.removeItem(this.LESSONS_VIEWED_KEY);
  }
}

// Singleton instance
export const progressStore: ProgressStore = new LocalStorageProgressStore();
