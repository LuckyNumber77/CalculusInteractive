import React from 'react';
import { analytics } from '../utils/analytics';

interface ProgressDashboardProps {
  onClose: () => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onClose }) => {
  const metrics = analytics.getMetrics();
  const recentEvents = analytics.getRecentEvents(10);

  const formatAccuracy = (rate: number) => {
    return rate > 0 ? `${rate.toFixed(1)}%` : 'N/A';
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dashboard-title">
      <div className="modal-content dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close dashboard"
        >
          ×
        </button>
        
        <h2 id="dashboard-title">📊 Your Progress Dashboard</h2>
        
        <div className="dashboard-content">
          <section className="metrics-section" aria-labelledby="metrics-heading">
            <h3 id="metrics-heading">Overall Performance</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{metrics.totalAttempts}</div>
                <div className="metric-label">Total Attempts</div>
              </div>
              
              <div className="metric-card success">
                <div className="metric-value">{metrics.correctAnswers}</div>
                <div className="metric-label">Correct Answers</div>
              </div>
              
              <div className="metric-card warning">
                <div className="metric-value">{metrics.wrongAnswers}</div>
                <div className="metric-label">Wrong Answers</div>
              </div>
              
              <div className="metric-card info">
                <div className="metric-value">{formatAccuracy(metrics.accuracyRate)}</div>
                <div className="metric-label">Accuracy Rate</div>
              </div>
            </div>
          </section>

          <section className="metrics-section" aria-labelledby="learning-heading">
            <h3 id="learning-heading">Learning Resources Used</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{metrics.hintsViewed}</div>
                <div className="metric-label">Hints Viewed</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{metrics.lessonsOpened}</div>
                <div className="metric-label">Lessons Opened</div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{metrics.lessonsCompleted}</div>
                <div className="metric-label">Lessons Completed</div>
              </div>
              
              <div className="metric-card info">
                <div className="metric-value">{formatAccuracy(metrics.lessonCompletionRate)}</div>
                <div className="metric-label">Lesson Completion</div>
              </div>
            </div>
          </section>

          <section className="activity-section" aria-labelledby="activity-heading">
            <h3 id="activity-heading">Recent Activity</h3>
            <div className="activity-list">
              {recentEvents.length > 0 ? (
                recentEvents.map((event, idx) => (
                  <div key={idx} className="activity-item">
                    <span className="activity-icon">{getEventIcon(event.event)}</span>
                    <span className="activity-text">{formatEventText(event)}</span>
                    <span className="activity-time">{formatTime(event.timestamp)}</span>
                  </div>
                ))
              ) : (
                <p className="no-activity">No activity yet. Start solving problems!</p>
              )}
            </div>
          </section>

          <div className="dashboard-tip">
            <strong>💡 Tip:</strong> Keep practicing! Using hints and lessons helps you learn more effectively.
            {metrics.accuracyRate < 50 && metrics.totalAttempts > 5 && (
              <span> Consider reviewing lessons for concepts where you're struggling.</span>
            )}
          </div>
        </div>
        
        <div className="dashboard-actions">
          <button className="button primary" onClick={onClose}>
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

function getEventIcon(event: string): string {
  const icons: Record<string, string> = {
    'correct_answer': '✓',
    'wrong_answer': '✗',
    'hint_viewed': '💡',
    'lesson_opened': '📚',
    'lesson_completed': '🎓',
    'solution_viewed': '📝',
    'question_retried': '🔄',
    'question_skipped': '⏭️'
  };
  return icons[event] || '•';
}

function formatEventText(event: any): string {
  const texts: Record<string, string> = {
    'correct_answer': 'Answered correctly',
    'wrong_answer': 'Wrong answer',
    'hint_viewed': 'Viewed hint',
    'lesson_opened': 'Opened lesson',
    'lesson_completed': 'Completed lesson',
    'solution_viewed': 'Viewed solution',
    'question_retried': 'Retried question',
    'question_skipped': 'Skipped question'
  };
  return texts[event.event] || event.event;
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export default ProgressDashboard;
