import { type Question } from "../types";

export const hooksEasyQuestions: Question[] = [
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
    hints: [
      "Check what happens to the interval when count changes.",
      "Think about closures and when the useEffect function is created.",
    ],
    explanation:
      "When an empty dependency array is used, the effect runs only once. The closure inside setInterval captures the initial value of 'count' (0). Using a functional update `setCount(c => c + 1)` allows React to use the latest state without closure stale issues.",
  },
  {
    id: "h2",
    slug: "conditional-hook-call",
    title: "Conditional Hook Call",
    difficulty: "EASY",
    description:
      "React hooks must be called in the same order on every render. Identify why calling a hook inside an if-statement breaks this rule.",
    suboptimalCode: `function UserProfile({ id }) {
  if (!id) {
    return "No user ID provided";
  }

  // Hook called conditionally!
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  return <div>{user?.name}</div>;
}`,
    correctCode: `function UserProfile({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUser(id).then(setUser);
    }
  }, [id]);

  if (!id) {
    return "No user ID provided";
  }

  return <div>{user?.name}</div>;
}`,
    mistakes: [
      {
        id: "m-cond-1",
        lineNumber: 7,
        message:
          "Hooks cannot be called inside conditions. This changes the order of hooks if 'id' is falsy, which breaks React's internal state tracking.",
        severity: "error",
      },
    ],
    proTips: [
      "Always call hooks at the top level of your component.",
      "If you need a conditional effect, put the condition inside the useEffect, not around it.",
    ],
    hints: [
      "Check where the useState is declared compared to the return statement.",
      "Think about what happens when 'id' is missing versus when it's present.",
    ],
    explanation:
      "React relies on the order in which Hooks are called to associate state with the correct component. Calling hooks conditionally disrupts this order, leading to bugs where state from one hook might be given to another.",
  },
  {
    id: "h4",
    slug: "stale-state-multi-update",
    title: "Multiple State Updates",
    difficulty: "EASY",
    description:
      "Why does calling setCount(count + 1) three times in a row only increment the count by one?",
    suboptimalCode: `function TripleCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Each call uses the same 'count' from the current render
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={increment}>Count: {count}</button>;
}`,
    correctCode: `function TripleCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Functional updates use the latest state
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  return <button onClick={increment}>Count: {count}</button>;
}`,
    mistakes: [
      {
        id: "m-stale-1",
        lineNumber: 6,
        message:
          "All three calls use the same 'count' value from the closure of the current render. If count is 0, all three calls effectively do 'setCount(0 + 1)'.",
        severity: "error",
      },
    ],
    proTips: [
      "Use functional updates 'setCount(prev => prev + 1)' when the new state depends on the previous one.",
      "React batches state updates, but the values used in the update still depend on the closure.",
    ],
    hints: [
      "What is the value of 'count' during the entire execution of the increment function?",
      "Does 'count' change immediately after 'setCount' is called?",
    ],
    explanation:
      "State updates are not immediate. In the suboptimal example, 'count' remains the same value throughout the single execution of the 'increment' function. Using the functional form ensures each update works with the most recent 'queued' state.",
  },
  {
    id: "h5",
    slug: "infinite-effect-loop",
    title: "Infinite useEffect Loop",
    difficulty: "EASY",
    description:
      "Find the mistake that causes this component to re-render until the browser crashes.",
    suboptimalCode: `function AutoCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Updating 'count' triggers the effect again...
    setCount(count + 1);
  }, [count]); // ...because 'count' is in the dependencies

  return <div>{count}</div>;
}`,
    correctCode: `function AutoCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Run only once on mount`,
    mistakes: [
      {
        id: "m-loop-1",
        lineNumber: 6,
        message:
          "The effect updates 'count', which tells React to re-run the effect because 'count' changed. This results in an infinite loop.",
        severity: "error",
      },
    ],
    proTips: [
      "Be careful when an effect's dependency is also the value it updates.",
      "Use functional updates inside effects to remove the value from the dependency array.",
    ],
    hints: [
      "Track the sequence of events: Render -> Effect -> Update -> Re-render -> Effect.",
      "How can we increment count without making the effect depend on its value?",
    ],
    explanation:
      "When you include a state variable in a `useEffect` dependency array and then update that same variable inside the effect, you create a feedback loop. Every update triggers the effect, which triggers another update.",
  },
];
