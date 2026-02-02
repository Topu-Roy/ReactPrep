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

export const TOPICS: Topic[] = [
  {
    id: "hooks",
    slug: "react-hooks",
    name: "React Hooks",
    description: "Master useEffect, useCallback, and custom hooks.",
    icon: "Anchor",
  },
  {
    id: "performance",
    slug: "performance-optimization",
    name: "Performance",
    description: "Rendering cycles, memoization, and profiling.",
    icon: "Zap",
  },
  {
    id: "patterns",
    slug: "design-patterns",
    name: "Design Patterns",
    description: "Composition, HOCs, and Compound Components.",
    icon: "Layout",
  },
];

export const QUESTIONS: Record<string, Question[]> = {
  hooks: [
    {
      id: "h1",
      slug: "useeffect-missing-deps",
      title: "Missing useEffect Dependencies",
      difficulty: "EASY",
      description:
        "Find the common mistake in this useEffect implementation where a dependency is forgotten, leading to stale closures.",
      suboptimalCode: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("Count is:", count);
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty deps but uses 'count'

  return <h1>{count}</h1>;
}`,
      correctCode: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // Cleaner approach using functional update`,
      mistakes: [
        {
          id: "m1",
          lineNumber: 8,
          message:
            'The variable "count" is used inside but not declared in the dependency array. This leads to a stale closure where "count" is always 0.',
          severity: "error",
        },
      ],
      proTips: [
        "Always use the functional update form of setState when the new state depends on the old state.",
        "The exhaustive-deps lint rule is your best friend.",
      ],
    },
  ],
};
