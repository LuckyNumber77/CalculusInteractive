export interface Topic {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    topicId: string;
    title: string;
    content: string;
    examples: Example[];
    questions: Question[];
}

export interface Example {
    problem: string;
    solution: string;
    explanation: string;
}

export interface Question {
    id: string;
    type: 'multiple-choice' | 'input' | 'true-false';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    hint?: string;
}

export interface UserProgress {
    topicId: string;
    lessonId: string;
    completedQuestions: number;
    totalQuestions: number;
    score: number;
    streak: number;
}
