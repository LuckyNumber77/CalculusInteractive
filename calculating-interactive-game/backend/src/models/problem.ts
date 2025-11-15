export interface Problem {
  id: string;
  question: string;
  correctAnswer: number;
  options?: number[];
  difficulty?: string;
  topic?: string;
}
