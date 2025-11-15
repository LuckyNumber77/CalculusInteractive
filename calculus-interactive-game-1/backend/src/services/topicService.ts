import { Topic, Lesson, Question } from '../models/topic';

export class TopicService {
    private topics: Topic[];

    constructor() {
        this.topics = this.initializeTopics();
    }

    private initializeTopics(): Topic[] {
        return [
            {
                id: 'derivatives',
                name: 'Derivatives',
                description: 'Learn about rates of change and slopes',
                icon: '📈',
                color: '#4CAF50',
                lessons: [
                    {
                        id: 'basic-derivatives',
                        topicId: 'derivatives',
                        title: 'Basic Derivatives',
                        content: 'A derivative represents the rate of change of a function. For a function f(x), the derivative f\'(x) tells us how quickly f is changing at any point x.',
                        examples: [
                            {
                                problem: 'Find the derivative of f(x) = x²',
                                solution: 'f\'(x) = 2x',
                                explanation: 'Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹, we get 2·x²⁻¹ = 2x'
                            },
                            {
                                problem: 'Find the derivative of f(x) = x³',
                                solution: 'f\'(x) = 3x²',
                                explanation: 'Using the power rule: d/dx(x³) = 3·x³⁻¹ = 3x²'
                            }
                        ],
                        questions: [
                            {
                                id: 'q1',
                                type: 'multiple-choice',
                                question: 'What is the derivative of x²?',
                                options: ['x', '2x', 'x²', '2'],
                                correctAnswer: '2x',
                                explanation: 'Using the power rule, d/dx(x²) = 2x',
                                hint: 'Remember the power rule: d/dx(xⁿ) = n·xⁿ⁻¹'
                            },
                            {
                                id: 'q2',
                                type: 'multiple-choice',
                                question: 'What is the derivative of x³?',
                                options: ['x²', '3x', '3x²', 'x³'],
                                correctAnswer: '3x²',
                                explanation: 'Using the power rule, d/dx(x³) = 3x²'
                            },
                            {
                                id: 'q3',
                                type: 'multiple-choice',
                                question: 'What is the derivative of 5x?',
                                options: ['5', 'x', '5x', '0'],
                                correctAnswer: '5',
                                explanation: 'The derivative of a constant times x is just the constant: d/dx(5x) = 5'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'integrals',
                name: 'Integrals',
                description: 'Learn about area under curves and antiderivatives',
                icon: '∫',
                color: '#2196F3',
                lessons: [
                    {
                        id: 'basic-integrals',
                        topicId: 'integrals',
                        title: 'Basic Integrals',
                        content: 'An integral represents the area under a curve. Integration is the reverse process of differentiation. The integral of f(x) gives us a function F(x) whose derivative is f(x).',
                        examples: [
                            {
                                problem: 'Find the integral of x',
                                solution: '∫x dx = (1/2)x² + C',
                                explanation: 'Using the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C'
                            },
                            {
                                problem: 'Find the integral of x²',
                                solution: '∫x² dx = (1/3)x³ + C',
                                explanation: 'Applying the power rule: ∫x² dx = x³/3 + C'
                            }
                        ],
                        questions: [
                            {
                                id: 'q1',
                                type: 'multiple-choice',
                                question: 'What is the integral of x?',
                                options: ['x²', '(1/2)x² + C', 'x² + C', '2x + C'],
                                correctAnswer: '(1/2)x² + C',
                                explanation: 'Using the power rule for integration: ∫x dx = x²/2 + C',
                                hint: 'Remember: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C'
                            },
                            {
                                id: 'q2',
                                type: 'multiple-choice',
                                question: 'What is the integral of 2x?',
                                options: ['x² + C', '2', 'x²', '(1/2)x² + C'],
                                correctAnswer: 'x² + C',
                                explanation: 'Factor out the constant: ∫2x dx = 2·∫x dx = 2·(x²/2) + C = x² + C'
                            },
                            {
                                id: 'q3',
                                type: 'multiple-choice',
                                question: 'What is the integral of x²?',
                                options: ['x³ + C', '(1/3)x³ + C', '2x + C', '3x² + C'],
                                correctAnswer: '(1/3)x³ + C',
                                explanation: 'Using the power rule: ∫x² dx = x³/3 + C'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'limits',
                name: 'Limits',
                description: 'Understand the foundation of calculus',
                icon: '→',
                color: '#FF9800',
                lessons: [
                    {
                        id: 'basic-limits',
                        topicId: 'limits',
                        title: 'Basic Limits',
                        content: 'A limit describes the value a function approaches as the input approaches some value. Limits are the foundation of calculus and help us understand behavior at specific points.',
                        examples: [
                            {
                                problem: 'Find lim(x→2) x² as x approaches 2',
                                solution: '4',
                                explanation: 'We can directly substitute: 2² = 4'
                            },
                            {
                                problem: 'Find lim(x→3) (x+1) as x approaches 3',
                                solution: '4',
                                explanation: 'Direct substitution: 3 + 1 = 4'
                            }
                        ],
                        questions: [
                            {
                                id: 'q1',
                                type: 'multiple-choice',
                                question: 'What is lim(x→2) x² ?',
                                options: ['2', '4', '8', 'undefined'],
                                correctAnswer: '4',
                                explanation: 'Direct substitution: 2² = 4',
                                hint: 'Try substituting x = 2 into the function'
                            },
                            {
                                id: 'q2',
                                type: 'multiple-choice',
                                question: 'What is lim(x→1) (x+2) ?',
                                options: ['1', '2', '3', '4'],
                                correctAnswer: '3',
                                explanation: 'Direct substitution: 1 + 2 = 3'
                            },
                            {
                                id: 'q3',
                                type: 'multiple-choice',
                                question: 'What is lim(x→0) (2x+5) ?',
                                options: ['0', '2', '5', '7'],
                                correctAnswer: '5',
                                explanation: 'Substitute x = 0: 2(0) + 5 = 5'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'chain-rule',
                name: 'Chain Rule',
                description: 'Master composite function derivatives',
                icon: '🔗',
                color: '#9C27B0',
                lessons: [
                    {
                        id: 'basic-chain-rule',
                        topicId: 'chain-rule',
                        title: 'The Chain Rule',
                        content: 'The chain rule is used to find the derivative of composite functions. If y = f(g(x)), then dy/dx = f\'(g(x)) · g\'(x). In other words, differentiate the outer function, multiply by the derivative of the inner function.',
                        examples: [
                            {
                                problem: 'Find the derivative of (x²+1)³',
                                solution: '3(x²+1)² · 2x = 6x(x²+1)²',
                                explanation: 'Outer function: u³, inner function: u = x²+1. Apply chain rule: 3u² · 2x'
                            }
                        ],
                        questions: [
                            {
                                id: 'q1',
                                type: 'multiple-choice',
                                question: 'What is the derivative of (x+1)²?',
                                options: ['2(x+1)', '2x', 'x+1', '2'],
                                correctAnswer: '2(x+1)',
                                explanation: 'Using chain rule: d/dx[(x+1)²] = 2(x+1) · 1 = 2(x+1)',
                                hint: 'Chain rule: d/dx[f(g(x))] = f\'(g(x)) · g\'(x)'
                            },
                            {
                                id: 'q2',
                                type: 'multiple-choice',
                                question: 'What is the derivative of (2x)³?',
                                options: ['6x²', '3(2x)² · 2', '24x²', '6(2x)²'],
                                correctAnswer: '3(2x)² · 2',
                                explanation: 'Chain rule: 3(2x)² · 2 = 3·4x²·2 = 24x² (but in chain rule form)'
                            }
                        ]
                    }
                ]
            }
        ];
    }

    public getAllTopics(): Topic[] {
        return this.topics;
    }

    public getTopicById(id: string): Topic | undefined {
        return this.topics.find(topic => topic.id === id);
    }

    public getLessonById(topicId: string, lessonId: string): Lesson | undefined {
        const topic = this.getTopicById(topicId);
        return topic?.lessons.find(lesson => lesson.id === lessonId);
    }
}
