import { hooksQuestions } from "./hooks";
import { patternsQuestions } from "./patterns";
import { performanceQuestions } from "./performance";
import { type Question, type Topic } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "hooks",
    slug: "react-hooks",
    name: "React Hooks",
    description: "Master useEffect, useCallback, and custom hooks.",
  },
  {
    id: "performance",
    slug: "performance-optimization",
    name: "Performance",
    description: "Rendering cycles, memoization, and profiling.",
  },
  {
    id: "patterns",
    slug: "design-patterns",
    name: "Design Patterns",
    description: "Composition, HOCs, and Compound Components.",
  },
];

export const QUESTIONS: Record<string, Question[]> = {
  hooks: hooksQuestions,
  performance: performanceQuestions,
  patterns: patternsQuestions,
};
