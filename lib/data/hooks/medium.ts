import { type Question } from "../types";

export const hooksMediumQuestions: Question[] = [
  {
    id: "h3",
    slug: "useref-avoiding-rerenders",
    title: "useRef vs useState for Form Data",
    difficulty: "MEDIUM",
    description:
      "Understand when to use useRef instead of useState to avoid unnecessary re-renders in large forms.",
    suboptimalCode: `function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("LoginForm rendered");

  return (
    <form>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
    </form>
  );
}`,
    correctCode: `function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  console.log("LoginForm rendered once");

  return (
    <form>
      <input ref={emailRef} />
      <input ref={passwordRef} />
    </form>
  );
}`,
    mistakes: [
      {
        id: "m3",
        lineNumber: 2,
        message:
          "Using useState for form fields that don't need real-time validation or immediate UI feedback causes a re-render on every keystroke.",
        severity: "info",
      },
    ],
    proTips: [
      "useRef is perfect for values that need to persist between renders but don't need to trigger a re-render.",
      "Consider uncontrolled components for performance-heavy forms.",
    ],
    hints: [
      "Watch the console to see how many times the component renders.",
      "Do we really need to update the UI on every keystroke?",
    ],
    explanation:
      "Using `useState` for every keystroke in a form causes the entire component to re-render. `useRef` allows you to store the value without triggering renders, which is much more performant for simple input fields.",
  },
  {
    id: "h16",
    slug: "usecallback-memo-break",
    title: "Broken Memo Branch",
    difficulty: "MEDIUM",
    description:
      "Identify why React.memo fails to prevent re-renders when a non-memoized callback is passed to the child.",
    suboptimalCode: `function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Re-render</button>
      <MemoizedChild onClick={handleClick} />
    </>
  );
}`,
    correctCode: `function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Re-render</button>
      <MemoizedChild onClick={handleClick} />
    </>
  );
}`,
    mistakes: [
      {
        id: "m-memo-break",
        lineNumber: 4,
        message:
          "The 'handleClick' function is recreated on every render. Even with React.memo, the Child sees a 'new' prop and re-renders.",
        severity: "error",
      },
    ],
    proTips: [
      "React.memo only works if the props passed have stable references. Use useCallback for functions and useMemo for objects/arrays.",
    ],
    hints: [
      "Is the identity of 'handleClick' the same after the Parent re-renders?",
      "Check the definition of shallow equality in React.memo.",
    ],
    explanation:
      "React.memo performs a shallow compare of props. In JavaScript, functions are compared by reference. Since `handleClick` is defined inside the component body, it's a new memory address on every render, causing the memoized child to re-render anyway.",
  },
  {
    id: "h17",
    slug: "usememo-effect-dependency",
    title: "The Unstable Dependency Loop",
    difficulty: "MEDIUM",
    description: "This useEffect runs infinitely. Why is the dependency array not stopping it?",
    suboptimalCode: `function DataFetcher({ query }) {
  const options = { url: '/api', query };
  
  useEffect(() => {
    fetch(options.url + options.query).then(res => res.json());
  }, [options]);

  return <div>Fetching...</div>;
}`,
    correctCode: `function DataFetcher({ query }) {
  const options = useMemo(() => ({ url: '/api', query }), [query]);
  
  useEffect(() => {
    fetch(options.url + options.query).then(res => res.json());
  }, [options]);

  return <div>Fetching...</div>;
}`,
    mistakes: [
      {
        id: "m-unstable-loop",
        lineNumber: 2,
        message:
          "The 'options' object is redefined on every render. Because objects are compared by reference, the useEffect thinks the dependency changed every time.",
        severity: "error",
      },
    ],
    proTips: [
      "Avoid creating objects or arrays directly in the component body if they are used as dependencies for hooks.",
    ],
    hints: [
      "Look at where 'options' is created.",
      "How does React check if `options` in render N is the same as in render N+1?",
    ],
    explanation:
      "The `options` literal `{ url: '/api', query }` is a new object every time the component renders. Even if `query` is the same, `{} !== {}`. Wrapping it in `useMemo` ensures the reference only changes when `query` actually changes.",
  },
  {
    id: "h18",
    slug: "uselayouteffect-flicker-fix",
    title: "Curing the Render Flicker",
    difficulty: "MEDIUM",
    description:
      "A tooltip appears at (0,0) for a split second before moving to the correct target. Which hook fixes this?",
    suboptimalCode: `useEffect(() => {
  const { width } = ref.current.getBoundingClientRect();
  setLeft(width / 2);
}, []);`,
    correctCode: `useLayoutEffect(() => {
  const { width } = ref.current.getBoundingClientRect();
  setLeft(width / 2);
}, []);`,
    mistakes: [
      {
        id: "m-flicker",
        lineNumber: 1,
        message:
          "useEffect runs AFTER the browser has painted. The user sees the initial (incorrect) position before the state update triggers a second render.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use useLayoutEffect ONLY when you need to measure the DOM and update state before the user sees the paint.",
    ],
    hints: [
      "Think about the timing of useEffect vs the browser's paint cycle.",
      "Is there a version of useEffect that runs synchronously before paint?",
    ],
    explanation:
      "Standard `useEffect` is asynchronous and runs after the screen is updated. `useLayoutEffect` runs synchronously after all DOM mutations but before the browser paints. This allows you to measure elements and update state without the user seeing an 'intermediate' frame.",
  },
  {
    id: "h19",
    slug: "useimperativehandle-focus",
    title: "Leaking the Input Ref",
    difficulty: "MEDIUM",
    description:
      "The parent wants to call focus() on this custom input component. How do you expose only that specific method?",
    suboptimalCode: `const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});`,
    correctCode: `const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));

  return <input ref={inputRef} {...props} />;
});`,
    mistakes: [
      {
        id: "m-imperative",
        lineNumber: 1,
        message:
          "Simply forwarding the ref exposes the entire DOM node to the parent. This violates encapsulation.",
        severity: "info",
      },
    ],
    proTips: [
      "useImperativeHandle helps maintain clean boundaries between components by limiting what the parent can access in a child's ref.",
    ],
    hints: [
      "What if we want the parent to ONLY be able to call `focus` but not change the input's style?",
      "Check the hook that goes with forwardRef.",
    ],
    explanation:
      "While `forwardRef` is standard, `useImperativeHandle` allows you to customize the instance value that is exposed to parent components when using `ref`. This prevents parents from doing dangerous things like directly deleting the input or messing with internal CSS.",
  },
  {
    id: "h20",
    slug: "useid-accessibility-sync",
    title: "ID Generation Mismatch",
    difficulty: "MEDIUM",
    description:
      "Why is generating random IDs with Math.random() inside a component a bad idea for Server-Side Rendering (SSR)?",
    suboptimalCode: `function FormField() {
  const id = "field-" + Math.random();
  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} />
    </>
  );
}`,
    correctCode: `function FormField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} />
    </>
  );
}`,
    mistakes: [
      {
        id: "m-id-match",
        lineNumber: 2,
        message:
          "Math.random() generates different values on the server and the client, causing hydration mismatches in React.",
        severity: "error",
      },
    ],
    proTips: [
      "useId is stable across server and client, ensuring that labels and inputs are always correctly linked.",
    ],
    hints: [
      "Think about what happens when HTML generated on the server is 'taken over' by JavaScript in the browser.",
      "How does React make sure the IDs stay the same across environments?",
    ],
    explanation:
      "In SSR, React renders the component once on the server. If `Math.random()` is used, the ID in the HTML will be X. When the client loads, it runs the code again, generating ID Y. This mismatch breaks the link between labels and inputs and triggers a hydration warning.",
  },
  {
    id: "h21",
    slug: "useeffect-abort-controller",
    title: "Race Condition Fetch",
    difficulty: "MEDIUM",
    description:
      "The user clicks through categories quickly. How do you prevent old requests from updating the UI after a newer one has started?",
    suboptimalCode: `useEffect(() => {
  fetch('/api/' + category).then(res => res.json()).then(setData);
}, [category]);`,
    correctCode: `useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/' + category, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(e => { if (e.name !== 'AbortError') console.error(e) });

  return () => controller.abort();
}, [category]);`,
    mistakes: [
      {
        id: "m-race-condition",
        lineNumber: 1,
        message:
          "Multiple fetches can run concurrently. If a slow request for 'Category A' returns AFTER a fast request for 'Category B', the UI will show data for 'Category A' incorrectly.",
        severity: "error",
      },
    ],
    proTips: [
      "Always cancel outbound requests in the cleanup function if the dependency changes before the request finishes.",
    ],
    hints: [
      "What happens if the second fetch finishes BEFORE the first one?",
      "Look into the AbortController API.",
    ],
    explanation:
      "Network requests take variable time. If a user triggers Fetch 1, then Fetch 2, you want Fetch 2 to win. Without an AbortController or a 'boolean flag' cleanup, Fetch 1 might finish later and overwrite the correct data from Fetch 2.",
  },
  {
    id: "h22",
    slug: "usereducer-stale-initial",
    title: "Lazy Reducer Init",
    difficulty: "MEDIUM",
    description:
      "The initial state of this reducer depends on a expensive calculation based on props. How should it be initialized properly?",
    suboptimalCode: `const [state, dispatch] = useReducer(reducer, computeInitialState(props.data));`,
    correctCode: `const [state, dispatch] = useReducer(reducer, props.data, computeInitialState);`,
    mistakes: [
      {
        id: "m-reducer-init",
        lineNumber: 1,
        message:
          "Passing the result of computeInitialState directly means it executes on every render, even though the reducer only uses it once.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use the third argument of useReducer for lazy initialization, similar to the function-form of useState.",
    ],
    hints: [
      "Check the 3rd argument of the useReducer signature.",
      "Does useReducer support lazy initialization like useState?",
    ],
    explanation:
      "Just like `useState`, `useReducer` can avoid expensive re-calculations of initial state. By passing a function as the third argument, React will only run it once during the mount, passing the second argument as the initial argument to it.",
  },
  {
    id: "h23",
    slug: "usedeferredvalue-slow-list",
    title: "Unblocking the Input",
    difficulty: "MEDIUM",
    description:
      "An expensive list filter makes the input feel 'laggy' as the user types. How can we keep the input responsive?",
    suboptimalCode: `function Search({ query }) {
  const filteredItems = items.filter(i => i.includes(query));
  return <List items={filteredItems} />;
}`,
    correctCode: `function Search({ query }) {
  const deferredQuery = useDeferredValue(query);
  const filteredItems = useMemo(() => 
    items.filter(i => i.includes(deferredQuery)), 
  [deferredQuery]);
  
  return <List items={filteredItems} />;
}`,
    mistakes: [
      {
        id: "m-laggy-input",
        lineNumber: 2,
        message:
          "The filter operation runs synchronously on every keystroke. Large lists will block the main thread and make the input unresponsive.",
        severity: "warning",
      },
    ],
    proTips: [
      "useDeferredValue is great for things that are slow to render but aren't strictly 'pending' (like a search list vs a page navigation).",
    ],
    hints: [
      "How can we tell React that updating the list is less important than keeping the typing smooth?",
      "Look into the useDeferredValue hook.",
    ],
    explanation:
      "By deferring the query, React can update the input IMMEDIATELY (high priority) and then work on the list filtering in the background (lower priority). If the user types again before the filter finishes, React will restart the filter with the new value.",
  },
  {
    id: "h24",
    slug: "custom-hook-stale-closure",
    title: "Custom Hook Secret Leak",
    difficulty: "MEDIUM",
    description:
      "Identify why this useInterval hook eventually starts using the wrong 'callback' function.",
    suboptimalCode: `function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay]); // Missing 'callback' in deps
}`,
    correctCode: `function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}`,
    mistakes: [
      {
        id: "m-stale-custom",
        lineNumber: 5,
        message:
          "By omitting 'callback' from the deps, the interval continues to use the version of the function from the very first render, even if the parent passed a new one.",
        severity: "error",
      },
    ],
    proTips: [
      "Using a ref to store a callback allows you to execute the latest version of that function without triggering effects to restart.",
    ],
    hints: [
      "If 'callback' changes, should we restart the interval? (Probably not).",
      "How can we 'get' the latest callback without re-running the setInterval effect?",
    ],
    explanation:
      "This is a advanced pattern. If you add `callback` to the dependency array, the interval will clear and restart every time the function changes (which might be every render). By using a ref, we keep the interval alive but always point it to the newest 'version' of the logic.",
  },
  {
    id: "h25",
    slug: "usetransition-load-state",
    title: "Pending Navigation",
    difficulty: "MEDIUM",
    description:
      "How can we show a loading indicator for a non-async state transition that involves heavy rendering?",
    suboptimalCode: `function TabButton({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}`,
    correctCode: `function TabButton({ children, onClick }) {
  const [isPending, startTransition] = useTransition();
  
  return (
    <button 
      onClick={() => startTransition(onClick)} 
      style={{ opacity: isPending ? 0.5 : 1 }}
    >
      {children}
    </button>
  );
}`,
    mistakes: [
      {
        id: "m-nav-freeze",
        lineNumber: 1,
        message:
          "Switching tabs for large components causes the UI to 'freeze' until the new tab is ready. The user gets no feedback that something is happening.",
        severity: "info",
      },
    ],
    proTips: [
      "useTransition is perfect for 'interruptible' updates, like switching views or tabs, where you want to keep the current UI responsive.",
    ],
    hints: [
      "How can we explicitly mark a state update as 'slow' and show a spinner?",
      "Check out the startTransition function.",
    ],
    explanation:
      "`useTransition` allows you to mark a state update as a 'transition'. React will try to render the next state in memory, and if it takes too long, it won't block the current UI. `isPending` tells you when React is still working on that 'future' screen.",
  },
];
