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
  {
    id: "h6",
    slug: "usestate-lazy-init",
    title: "Expensive Lazy Initialization",
    difficulty: "EASY",
    description:
      "Calling an expensive function directly in useState causes it to run on every render. Fix it to only run once.",
    suboptimalCode: `function ExpensiveState() {
  const [data, setData] = useState(computeExpensiveValue());

  return <div>Data: {data}</div>;
}`,
    correctCode: `function ExpensiveState() {
  const [data, setData] = useState(() => computeExpensiveValue());

  return <div>Data: {data}</div>;
}`,
    mistakes: [
      {
        id: "m-lazy-1",
        lineNumber: 2,
        message:
          "computeExpensiveValue() is called on every render. Although React only uses the initial value for the first render, the function still executes.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use lazy initialization for any state that requires heavy computation or Reading from LocalStorage.",
    ],
    hints: [
      "Look at how the initial value is passed to useState.",
      "Think about when the function inside useState is executed.",
    ],
    explanation:
      "When you pass a function call like `computeExpensiveValue()` to `useState`, it executes on every render of the component. By passing a function reference `() => computeExpensiveValue()`, React only executes it once during the initial mount.",
  },
  {
    id: "h7",
    slug: "useeffect-cleanup-listener",
    title: "Zombies: Missing Cleanup",
    difficulty: "EASY",
    description:
      "Identify why this window resize listener causes memory leaks and unexpected behavior.",
    suboptimalCode: `useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);`,
    correctCode: `useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`,
    mistakes: [
      {
        id: "m-cleanup-1",
        lineNumber: 2,
        message:
          "The event listener is never removed. If the component unmounts and remounts, you'll have multiple duplicate listeners running.",
        severity: "error",
      },
    ],
    proTips: [
      "Always clean up subscriptions, intervals, and event listeners in the useEffect return function.",
    ],
    hints: [
      "What happens to the 'handleResize' function when the component is destroyed?",
      "How does React handle side-effect teardown?",
    ],
    explanation:
      "Side effects like event listeners persist as long as the window exists. If you don't remove them when the component unmounts, they continue to fire, often trying to update unmounted state, leading to memory leaks.",
  },
  {
    id: "h8",
    slug: "useeffect-async-no-await",
    title: "Async useEffect Disaster",
    difficulty: "EASY",
    description:
      "Find why marking the useEffect callback as 'async' causes a React warning and breaks cleanup.",
    suboptimalCode: `useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);`,
    correctCode: `useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);`,
    mistakes: [
      {
        id: "m-async-1",
        lineNumber: 1,
        message:
          "useEffect expects a function that returns either nothing or a cleanup function. Async functions return a Promise, which React doesn't allow.",
        severity: "error",
      },
    ],
    proTips: [
      "Define the async logic inside a separate function within the effect and call it immediately.",
    ],
    hints: [
      "What does an async function return implicitly?",
      "Check the console for warnings about useEffect return values.",
    ],
    explanation:
      "React expects the return value of `useEffect` to be a cleanup function or `undefined`. Since an `async` function always returns a `Promise`, React cannot use it to handle cleanups. Instead, define an internal async function and call it.",
  },
  {
    id: "h9",
    slug: "incorrect-hook-naming",
    title: "The Case of the Missing 'use'",
    difficulty: "EASY",
    description: "Why doesn't the linting rule caught bugs in this custom logic sharing function?",
    suboptimalCode: `function logger(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}`,
    correctCode: `function useLogger(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}`,
    mistakes: [
      {
        id: "m-name-1",
        lineNumber: 1,
        message:
          "Custom hooks must start with 'use'. Without this prefix, React's ESLint rules won't check if you're using other hooks correctly inside it.",
        severity: "warning",
      },
    ],
    proTips: [
      "Naming conventions are not just for humans; tools like ESLint rely on the 'use' prefix to enforce the Rules of Hooks.",
    ],
    hints: [
      "Compare the function name to standard hooks like useState or useEffect.",
      "Why might a linter ignore this function even though it contains hooks?",
    ],
    explanation:
      "React's ESLint plugin specifically looks for the `use` prefix to identify custom hooks. If you omit it, the plugin won't verify the order of hooks or missing dependencies within that function.",
  },
  {
    id: "h10",
    slug: "useeffect-no-deps",
    title: "The Accidental Every-Render Effect",
    difficulty: "EASY",
    description:
      "This effect is intended to log when the component mounts, but it logs on every keystroke. Why?",
    suboptimalCode: `function UserForm() {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Component Mounted");
  }); // Missing dependency array

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`,
    correctCode: `function UserForm() {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Component Mounted");
  }, []); // Added empty dependency array

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`,
    mistakes: [
      {
        id: "m-deps-1",
        lineNumber: 6,
        message:
          "Omitting the dependency array causes the effect to run after EVERY render, which is rarely what you want for initialization logic.",
        severity: "warning",
      },
    ],
    proTips: [
      "Always include a dependency array, even if it's empty, to explicitly control when the effect runs.",
    ],
    hints: [
      "What's the difference between no array and an empty array `[]`?",
      "Watch how the console logs when you type in the input.",
    ],
    explanation:
      "If you don't provide a second argument to `useEffect`, it runs after every single render. To run it only once on mount, you must provide an empty array `[]`.",
  },
  {
    id: "h11",
    slug: "usememo-over-optimization",
    title: "Primitive useMemo Waste",
    difficulty: "EASY",
    description: "Identify why using useMemo here is actually making the component slower.",
    suboptimalCode: `const formattedTotal = useMemo(() => {
  return price + tax;
}, [price, tax]);`,
    correctCode: `const formattedTotal = price + tax;`,
    mistakes: [
      {
        id: "m-memo-1",
        lineNumber: 1,
        message:
          "useMemo has an overhead. Using it for simple arithmetic like addition is more expensive than just calculating it during render.",
        severity: "info",
      },
    ],
    proTips: [
      "Don't use useMemo for basic operations. Use it for 'expensive' calculations (like sorting large arrays) or to preserve reference equality.",
    ],
    hints: [
      "Is addition an expensive operation for a CPU?",
      "What is the memory/CPU cost of the useMemo hook itself?",
    ],
    explanation:
      "Every time `useMemo` runs, React has to compare the dependencies. For simple tasks like adding two numbers, the overhead of the comparison and the hook call is greater than the task itself. Premature optimization is the root of all evil!",
  },
  {
    id: "h12",
    slug: "useref-render-assignment",
    title: "Ref Body Assignment",
    difficulty: "EASY",
    description:
      "Find the mistake where a ref is modified during the render phase, leading to unpredictable behavior.",
    suboptimalCode: `function Tracker({ value }) {
  const prevValue = useRef();
  
  // Directly assigning during render!
  prevValue.current = value;

  return <div>Current: {value}</div>;
}`,
    correctCode: `function Tracker({ value }) {
  const prevValue = useRef();

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return <div>Current: {value}</div>;
}`,
    mistakes: [
      {
        id: "m-ref-1",
        lineNumber: 5,
        message:
          "Writing to a ref during the render phase is not safe. It makes the component impure and can lead to inconsistent UI states.",
        severity: "error",
      },
    ],
    proTips: [
      "Refs should only be modified in useEffect or event handlers. Render should be kept pure.",
    ],
    hints: [
      "Is it safe to change a value while React is still trying to figure out what the UI looks like?",
      "Where did we learn to put side-effects in a component?",
    ],
    explanation:
      "React expects the render function to be pure. Assigning to `prevValue.current` during the render phase is a side effect. It can cause issues with features like Concurrent Mode, where React might render the same component multiple times before committing.",
  },
  {
    id: "h13",
    slug: "hook-in-event-handler",
    title: "Local Hook Violation",
    difficulty: "EASY",
    description:
      "Explain why calling a hook inside an event handler will crash your React application.",
    suboptimalCode: `function Search() {
  const handleClick = () => {
    // Calling hook inside handler!
    const [results, setResults] = useState([]);
    fetchResults().then(setResults);
  };
  return <button onClick={handleClick}>Search</button>;
}`,
    correctCode: `function Search() {
  const [results, setResults] = useState([]);
  
  const handleClick = () => {
    fetchResults().then(setResults);
  };
  return <button onClick={handleClick}>Search</button>;
}`,
    mistakes: [
      {
        id: "m-event-1",
        lineNumber: 4,
        message:
          "useState cannot be called inside a function that is not the top level of a component. Hooks must always be called at the root.",
        severity: "error",
      },
    ],
    proTips: [
      "Hooks are linked to the component based on their fixed call order. Putting one inside a nested function breaks that link.",
    ],
    hints: [
      "What are the two basic rules of hooks?",
      "Can the order of hooks change if we put them inside a button click?",
    ],
    explanation:
      "React doesn't know which state belongs to which component if the number or order of hooks changes between renders. Event handlers are called long after the render phase, so you cannot introduce new hooks there.",
  },
  {
    id: "h14",
    slug: "state-mutation-error",
    title: "The Object Mutation Trap",
    difficulty: "EASY",
    description:
      "Why doesn't the UI update when the user name is changed but the setProfile is called?",
    suboptimalCode: `const [profile, setProfile] = useState({ name: 'Bob' });

const updateName = () => {
  profile.name = 'Alice'; // Mutation!
  setProfile(profile);
};`,
    correctCode: `const [profile, setProfile] = useState({ name: 'Bob' });

const updateName = () => {
  setProfile({ ...profile, name: 'Alice' }); // Immutability
};`,
    mistakes: [
      {
        id: "m-mut-1",
        lineNumber: 4,
        message:
          "You are mutating the existing object. React compares objects by reference, so it thinks nothing has changed.",
        severity: "error",
      },
    ],
    proTips: [
      "Always treat React state as immutable. Use the spread operator (...) or libraries like Immer to create new copies.",
    ],
    hints: [
      "Does React look at the values inside the object or just the object's identity?",
      "Why would `oldProfile === newProfile` be true in the suboptimal code?",
    ],
    explanation:
      "React uses a shallow reference check (`Object.is`) to determine if state has changed. If you modify an object's properties but pass the same object back to `setProfile`, React sees the same memory address and skips the re-render.",
  },
  {
    id: "h15",
    slug: "usecontext-missing-provider",
    title: "The Silent context Null",
    difficulty: "EASY",
    description: "Why is the theme always undefined despite using the useContext hook?",
    suboptimalCode: `// Child.js
const theme = useContext(ThemeContext);
return <div style={{ color: theme.color }}>Hello</div>;

// App.js
function App() {
  return <Child />; // Context is missing here!
}`,
    correctCode: `function App() {
  return (
    <ThemeContext.Provider value={{ color: 'blue' }}>
      <Child />
    </ThemeContext.Provider>
  );
}`,
    mistakes: [
      {
        id: "m-ctx-1",
        lineNumber: 7,
        message:
          "Child is rendered outside of the ThemeContext.Provider, so useContext returns the default value (or undefined).",
        severity: "warning",
      },
    ],
    proTips: [
      "Always provide a sensible default value to createContext, or throw a helpful error if the context is missing.",
    ],
    hints: [
      "Where does useContext look for its value in the component tree?",
      "Is there a Provider wrapping the Child component?",
    ],
    explanation:
      "The `useContext` hook looks up the tree for the nearest matching `Provider`. If no Provider is found, it falls back to the default value provided when the context was created with `createContext(defaultValue)`.",
  },
];
