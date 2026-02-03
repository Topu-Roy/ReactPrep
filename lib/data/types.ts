export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Severity = "warning" | "error" | "info";

export interface QuestionMistake {
  id: string;
  lineNumber: number;
  message: string;
  severity: Severity;
}

export interface Question {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  correctCode: string;
  suboptimalCode: string;
  mistakes: QuestionMistake[];
  proTips: string[];
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
}
