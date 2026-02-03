import { type Question } from "../types";

export const hooksHardQuestions: Question[] = [
  {
    id: "h26",
    slug: "usesyncexternalstore-media-query",
    title: "Syncing the Window",
    difficulty: "HARD",
    description:
      "Implement a custom useMediaQuery hook that stay in sync with the browser without causing hydration mismatches or zombie listeners.",
    suboptimalCode: `function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const handler = (e) => setMatches(e.matches);
    list.addEventListener('change', handler);
    return () => list.removeEventListener('change', handler);
  }, [query]);

  return matches;
}`,
    correctCode: `function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', callback);
      return () => list.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false // SSR Default
  );
}`,
    mistakes: [
      {
        id: "m-sync-1",
        lineNumber: 1,
        message:
          "Manually managing state and listeners for external browser APIs is error-prone and can lead to hydration mismatches during SSR.",
        severity: "warning",
      },
    ],
    proTips: [
      "useSyncExternalStore is the recommended way to subscribe to external data sources since React 18, ensuring consistency across concurrent rendering.",
    ],
    hints: [
      "How can we avoid the 'useState + useEffect' ceremony for global browser state?",
      "Is there a hook specifically designed for external data?",
    ],
    explanation:
      "External APIs like `matchMedia` are 'external' to React's state. Using `useSyncExternalStore` allows React to subscribe to updates more efficiently than `useEffect`. It also provides a third argument for the 'server snapshot', which prevents hydration errors by giving the server a consistent default value.",
  },
  {
    id: "h27",
    slug: "useoptimistic-like-button",
    title: "The Zero-Latency Like",
    difficulty: "HARD",
    description:
      "The UI feels slow because it waits for the server response before updating the 'Like' count. Use the latest React 19 hook to fix this.",
    suboptimalCode: `const handleLike = async () => {
  const newCount = await api.likePost(id);
  setLikes(newCount);
};`,
    correctCode: `const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (state, newLike) => state + 1
);

const handleLike = async () => {
  addOptimisticLike(1); // Immediate update
  const newCount = await api.likePost(id);
  setLikes(newCount); // Reverts if error, otherwise confirms
};`,
    mistakes: [
      {
        id: "m-optimistic",
        lineNumber: 1,
        message:
          "Waiting for network confirmation before updating the UI creates a perceived lag for the user.",
        severity: "info",
      },
    ],
    proTips: [
      "useOptimistic allows you to show what the state *should* be while a background action is in flight, automatically reverting if the action fails.",
    ],
    hints: [
      "Check out the experimental/React 19 hooks for form-like interactions.",
      "How can we 'assume' the update worked?",
    ],
    explanation:
      "`useOptimistic` is a state hook designed specifically for optimistic UI patterns. When you call the 'add' function, it temporarily modifies the state. Once the asynchronous work in your handler finishes (or your main state updates), the optimistic state is automatically resolved back to the 'real' source of truth.",
  },
  {
    id: "h28",
    slug: "useactionstate-form-handling",
    title: "The Modern Form State",
    difficulty: "HARD",
    description:
      "Replace the manually managed 'loading' and 'error' states for this form with the refined useActionState (formerly useFormState).",
    suboptimalCode: `function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const action = async (formData) => {
    setLoading(true);
    const result = await submit(formData);
    if (result.error) setError(result.error);
    setLoading(false);
  };
}`,
    correctCode: `function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submit(formData);
      return result; // contains { error, success }
    },
    { error: null, success: false }
  );
  
  return <form action={formAction}>...</form>;
}`,
    mistakes: [
      {
        id: "m-action-state",
        lineNumber: 2,
        message:
          "Manually toggling loading/error states for every form is repetitive and prone to 'forgetting' to reset them in edge cases.",
        severity: "info",
      },
    ],
    proTips: [
      "useActionState integrates perfectly with React Server Actions, providing built-in pending status tracking.",
    ],
    hints: [
      "Look for a hook that returns [state, action, isPending].",
      "How does Next.js 15 handle form feedback in the App Router?",
    ],
    explanation:
      "`useActionState` (available in React 19) simplifies form management by bundling the state of the form, the action itself, and a native `isPending` flag. It handles the lifecycle of the transition automatically, reducing the boilerplate required for robust forms.",
  },
  {
    id: "h29",
    slug: "uselayouteffect-resize-observer",
    title: "Responsive without Queries",
    difficulty: "HARD",
    description:
      "A component needs to change its layout based on ITS OWN width, not the screen width. Use a ResizeObserver inside a hook.",
    suboptimalCode: `useEffect(() => {
  const observer = new ResizeObserver((entries) => {
    setWidth(entries[0].contentRect.width);
  });
  observer.observe(ref.current);
  return () => observer.disconnect();
}, []);`,
    correctCode: `useLayoutEffect(() => {
  if (!ref.current) return;
  const observer = new ResizeObserver((entries) => {
    // Wrap in requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
    window.requestAnimationFrame(() => {
      if (!ref.current) return;
      setWidth(entries[0].contentRect.width);
    });
  });
  observer.observe(ref.current);
  return () => observer.disconnect();
}, []);`,
    mistakes: [
      {
        id: "m-resize-loop",
        lineNumber: 2,
        message:
          "Directly updating state inside a ResizeObserver callback can trigger an infinite loop if the state change itself changes the element's size.",
        severity: "error",
      },
    ],
    proTips: [
      "Always use requestAnimationFrame when updating state from within a ResizeObserver for stability.",
    ],
    hints: [
      "What happens if changing the width causes a second resize event immediately?",
      "Think about 'render loops'.",
    ],
    explanation:
      "ResizeObservers can be dangerous. If your component changes its layout (and size) because of a width change, you might trigger the observer again instantly. Wrapping the update in `requestAnimationFrame` ensures the work happens in the next frame, settling the layout.",
  },
  {
    id: "h30",
    slug: "custom-hook-stale-closure-complex",
    title: "The Event Listener Trap",
    difficulty: "HARD",
    description:
      "Identify why this document listener always logs the value from the initial render, even after many state changes.",
    suboptimalCode: `useEffect(() => {
  const handler = () => console.log("Value is:", value);
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}, []); // Empty dependency array`,
    correctCode: `const handlerRef = useRef(null);
handlerRef.current = () => console.log("Value is:", value);

useEffect(() => {
  const listener = () => handlerRef.current();
  document.addEventListener('click', listener);
  return () => document.removeEventListener('click', listener);
}, []);`,
    mistakes: [
      {
        id: "m-listener-stale",
        lineNumber: 5,
        message:
          "The function 'handler' is a closure that captures 'value' at the time the effect ran. Since the effect only runs once, it only ever knows the initial value.",
        severity: "error",
      },
    ],
    proTips: [
      "If an event listener needs to access dynamic state without re-attaching itself to the DOM every render, use a ref to point to the latest logic.",
    ],
    hints: [
      "If we added 'value' to the dependency array, what would happen to the listener every render?",
      "How can we 'update' the listener's logic without 'updating' the listener itself?",
    ],
    explanation:
      "Standard closures 'lock in' their scope. If an effect runs once, the functions inside it are stuck with those stale values. Using a ref allows the callback to dynamically point to whatever the CURRENT value is without needing to destroy and recreate the underlying DOM listener.",
  },
  {
    id: "h31",
    slug: "usedeferredvalue-memo-heavy",
    title: "Interruptible Data Viz",
    difficulty: "HARD",
    description:
      "A chart with 5000 points is re-calculating on every slider move, causing the slider to stutter. Coordinate useDeferredValue and useMemo correctly.",
    suboptimalCode: `function Chart({ points }) {
  const processed = dataProcessing(points);
  return <Graph data={processed} />;
}`,
    correctCode: `function Chart({ points }) {
  const deferredPoints = useDeferredValue(points);
  const processed = useMemo(() => 
    dataProcessing(deferredPoints), 
  [deferredPoints]);

  return <Graph data={processed} isStale={points !== deferredPoints} />;
}`,
    mistakes: [
      {
        id: "m-heavy-memo",
        lineNumber: 2,
        message:
          "Calculating heavy data processing inside the render body blocks the main thread. Even useMemo doesn't help if the input changes every 16ms (slider move).",
        severity: "warning",
      },
    ],
    proTips: [
      "Combine useDeferredValue with useMemo to ensure expensive work only happens for the deferred value, allowing the high-priority UI (sliders, inputs) to stay snappy.",
    ],
    hints: [
      "How can we tell the chart to 'catch up' when it can, while the slider stays smooth?",
      "Think about how useMemo and useDeferredValue interact.",
    ],
    explanation:
      "When you use `useDeferredValue`, React will try to re-render with the new value in the background. If you wrap the work in `useMemo` keyed to that deferred value, React can actually 'pause' the work if the user interacts again, then resume it later.",
  },
  {
    id: "h32",
    slug: "useimperativehandle-validation",
    title: "Validating from the Parent",
    difficulty: "HARD",
    description:
      "A parent form needs to trigger validation in a nested child component before allowing submission. Expose a validate() method properly.",
    suboptimalCode: `const Step = forwardRef((props, ref) => {
  ref.current = { validate: () => checkValid() };
  return <div>Step Content</div>;
});`,
    correctCode: `const Step = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    validate: () => checkValid()
  }), []); // Stable handle

  return <div>Step Content</div>;
});`,
    mistakes: [
      {
        id: "m-ref-manual",
        lineNumber: 2,
        message:
          "Manually assigning to ref.current during render is unsafe. It might be overwritten or missed by React's internal resolution.",
        severity: "error",
      },
    ],
    proTips: [
      "useImperativeHandle is the only officially supported way to expose methods to a parent ref in a functional component.",
    ],
    hints: [
      "What hook exists specifically for customizing the object a parent sees in their ref?",
      "Is manual ref assignment safe in Concurrent React?",
    ],
    explanation:
      "Manual ref assignment in the render body is unstable. `useImperativeHandle` ensures that the exposed object is correctly updated and cleaned up by React's internal systems, and it works correctly with `forwardRef` and `useRef` in the parent.",
  },
  {
    id: "h33",
    slug: "useinsertioneffect-css-in-js",
    title: "The Dynamic Style Glitch",
    difficulty: "HARD",
    description:
      "Identify why using useEffect or useLayoutEffect to inject dynamic <style> tags into the head causes layout jitters during rapid theme changes.",
    suboptimalCode: `useLayoutEffect(() => {
  injectStyleTag(themeStyles);
}, [themeStyles]);`,
    correctCode: `useInsertionEffect(() => {
  injectStyleTag(themeStyles);
}, [themeStyles]);`,
    mistakes: [
      {
        id: "m-insertion-effect",
        lineNumber: 1,
        message:
          "Injecting styles in useEffect/useLayoutEffect happens after or during layout. This can cause the browser to recalculate layouts multiple times in one frame.",
        severity: "warning",
      },
    ],
    proTips: [
      "useInsertionEffect runs BEFORE all other effects and BEFORE layout. It's designed strictly for CSS-in-JS libraries to inject styles.",
    ],
    hints: [
      "Is there a hook that runs even earlier than useLayoutEffect?",
      "Check the React 18 hooks for library authors.",
    ],
    explanation:
      "Injecting styles into the DOM during the layout phase (where `useLayoutEffect` runs) forces the browser to re-measure and re-calculate positions. `useInsertionEffect` fires before React even touches the DOM for layout, giving the browser the CSS it needs to do the layout correctly the first time.",
  },
  {
    id: "h34",
    slug: "usecontext-selector-optimization",
    title: "Context Re-render Overload",
    difficulty: "HARD",
    description:
      "A huge Context Provider contains { user, settings, theme }. A component only using 'theme' re-renders when 'user' changes. How do you fix this WITHOUT breaking the Context into three?",
    suboptimalCode: `const { theme } = useContext(LargeContext);
return <div className={theme}>Content</div>;`,
    correctCode: `const theme = useContextSelector(LargeContext, v => v.theme);
// Or wrap the consumer in a memoized component:
const theme = useContext(LargeContext).theme;
return useMemo(() => <Child theme={theme} />, [theme]);`,
    mistakes: [
      {
        id: "m-context-selector",
        lineNumber: 1,
        message:
          "Any change to any property in a Context value object triggers a re-render in ALL consumers, regardless of which property they use.",
        severity: "warning",
      },
    ],
    proTips: [
      "Native React Context does NOT have selectors. You must either split the context, use useMemo to block children, or use a library like 'use-context-selector'.",
    ],
    hints: [
      "Does React.useContext support picking specific keys from an object?",
      "Think about high-performance context management.",
    ],
    explanation:
      "React Context is a 'broadcast' mechanism. If you pass an object as a value, any change to that object (even a deep one) notifies all subscribers. Splitting state into multiple smaller Contexts is often the cleanest solution, but `useMemo` on the JSX tree can also limit the damage.",
  },
  {
    id: "h35",
    slug: "useref-coordinating-animations",
    title: "The Logic-only Ref",
    difficulty: "HARD",
    description:
      "Use a ref to coordinate two parallel animations without triggering a re-render of the component on every frame.",
    suboptimalCode: `const [offset, setOffset] = useState(0);
useFrame(() => {
  setOffset(prev => prev + 1); // Renders 60fps!
});`,
    correctCode: `const offsetRef = useRef(0);
useFrame(() => {
  offsetRef.current += 1;
  box1.style.transform = \`translateX(\${offsetRef.current}px)\`;
  box2.style.transform = \`translateY(\${offsetRef.current}px)\`;
});`,
    mistakes: [
      {
        id: "m-ref-animation",
        lineNumber: 3,
        message:
          "Updating state at 60fps for values that don't need to be React-rendered (like direct DOM manipulations for animation) is extremely wasteful.",
        severity: "warning",
      },
    ],
    proTips: [
      "For high-frequency updates that only affect DOM properties (like style.transform or canvas), use refs for storage and direct DOM mutation.",
    ],
    hints: [
      "Do we need React to 'know' about every single pixel of movement?",
      "How do animation libraries like GSAP handle state?",
    ],
    explanation:
      "React is for declarative UI. High-frequency animations are often best handled imperatively. By storing the animation state in a ref and updating the DOM nodes directly, you bypass React's entire reconciliation process for every frame, yielding smooth 60fps performance.",
  },
];
