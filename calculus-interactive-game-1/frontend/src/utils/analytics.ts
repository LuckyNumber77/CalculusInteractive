// Analytics utility for tracking student interactions

export type AnalyticsEvent = 
  | 'wrong_answer'
  | 'hint_requested'
  | 'hint_viewed'
  | 'lesson_opened'
  | 'lesson_completed'
  | 'solution_viewed'
  | 'question_retried'
  | 'question_skipped'
  | 'correct_answer';

export interface AnalyticsData {
  event: AnalyticsEvent;
  questionId?: string;
  conceptId?: string;
  attemptNumber?: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class AnalyticsService {
  private readonly ANALYTICS_KEY = 'calculus_game_analytics';
  private readonly MAX_EVENTS = 1000; // Keep last 1000 events

  private getEvents(): AnalyticsData[] {
    try {
      const data = localStorage.getItem(this.ANALYTICS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveEvents(events: AnalyticsData[]): void {
    try {
      // Keep only the most recent events
      const trimmedEvents = events.slice(-this.MAX_EVENTS);
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(trimmedEvents));
    } catch (e) {
      console.error('Failed to save analytics:', e);
    }
  }

  trackEvent(
    event: AnalyticsEvent,
    data?: {
      questionId?: string;
      conceptId?: string;
      attemptNumber?: number;
      metadata?: Record<string, any>;
    }
  ): void {
    const analyticsData: AnalyticsData = {
      event,
      timestamp: Date.now(),
      ...data,
    };

    const events = this.getEvents();
    events.push(analyticsData);
    this.saveEvents(events);

    // Also log to console for debugging
    console.log('[Analytics]', event, data);
  }

  getEventsByType(eventType: AnalyticsEvent): AnalyticsData[] {
    return this.getEvents().filter(e => e.event === eventType);
  }

  getEventsByQuestion(questionId: string): AnalyticsData[] {
    return this.getEvents().filter(e => e.questionId === questionId);
  }

  getEventsByConcept(conceptId: string): AnalyticsData[] {
    return this.getEvents().filter(e => e.conceptId === conceptId);
  }

  getRecentEvents(count: number = 50): AnalyticsData[] {
    const events = this.getEvents();
    return events.slice(-count);
  }

  clearAnalytics(): void {
    localStorage.removeItem(this.ANALYTICS_KEY);
  }

  // Useful metrics
  getMetrics() {
    const events = this.getEvents();
    const wrongAnswers = events.filter(e => e.event === 'wrong_answer').length;
    const correctAnswers = events.filter(e => e.event === 'correct_answer').length;
    const hintsViewed = events.filter(e => e.event === 'hint_viewed').length;
    const lessonsOpened = events.filter(e => e.event === 'lesson_opened').length;
    const lessonsCompleted = events.filter(e => e.event === 'lesson_completed').length;

    return {
      totalAttempts: wrongAnswers + correctAnswers,
      correctAnswers,
      wrongAnswers,
      accuracyRate: correctAnswers > 0 ? (correctAnswers / (wrongAnswers + correctAnswers)) * 100 : 0,
      hintsViewed,
      lessonsOpened,
      lessonsCompleted,
      lessonCompletionRate: lessonsOpened > 0 ? (lessonsCompleted / lessonsOpened) * 100 : 0,
    };
  }
}

// Singleton instance
export const analytics = new AnalyticsService();
