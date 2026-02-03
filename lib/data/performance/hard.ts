import { type Question } from "../types";

export const performanceHardQuestions: Question[] = [
  {
    id: "p24",
    slug: "web-worker-computation",
    title: "Offloading the Thread",
    difficulty: "HARD",
    description:
      "A data transformation takes 500ms, causing the UI to freeze entirely. How do you move this work off the main thread?",
    suboptimalCode: `function Dashboard({ rawData }) {
  const processed = useMemo(() => heavyTransform(rawData), [rawData]);
  return <Chart data={processed} />;
}`,
    correctCode: `function Dashboard({ rawData }) {
  const [processed, setProcessed] = useState(null);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    worker.postMessage(rawData);
    worker.onmessage = (e) => setProcessed(e.data);
    return () => worker.terminate();
  }, [rawData]);

  return processed ? <Chart data={processed} /> : <Loader />;
}`,
    mistakes: [
      {
        id: "m-p-worker",
        lineNumber: 2,
        message:
          "Even with useMemo, the calculation happens on the main thread. 500ms of work will block all user interaction (clicks, typing) until it finishes.",
        severity: "error",
      },
    ],
    proTips: [
      "Any task taking longer than 50ms should ideally be moved to a Web Worker to keep the UI fluid at 60fps.",
    ],
    hints: [
      "How can we run JavaScript in parallel to the main UI thread?",
      "Is there a browser API for background tasks?",
    ],
    explanation:
      "Standard JavaScript is single-threaded. `useMemo` prevents *re-calculating*, but the *first* calculation still locks the browser. Web Workers run in a separate OS thread, allowing the main thread to stay responsive while the worker grinds through the data.",
  },
  {
    id: "p25",
    slug: "memo-children-trap",
    title: "The Children Memo Trap",
    difficulty: "HARD",
    description:
      "Identify why wrapping this 'Wrapper' component in React.memo doesn't prevent its re-render when the parent updates.",
    suboptimalCode: `const Wrapper = React.memo(({ children }) => {
  return <div className="p-4">{children}</div>;
});

// usage in parent
<Wrapper>
  <span>Static Content</span>
</Wrapper>`,
    correctCode: `// The parent MUST memoize the children to maintain reference equality:
const children = useMemo(() => <span>Static Content</span>, []);

return <Wrapper>{children}</Wrapper>;`,
    mistakes: [
      {
        id: "m-p-children-memo",
        lineNumber: 1,
        message:
          "The `children` prop is actually syntactic sugar for `props.children`. In the suboptimal code, a new array/JSX element is created every render, which is a 'new object' to React.memo.",
        severity: "warning",
      },
    ],
    proTips: [
      "React.memo on a component with 'children' is often useless unless the parent also memoizes the children or uses a stable reference.",
    ],
    hints: [
      "Is `<span>Static</span>` the same object every time the parent function runs?",
      "How does React.memo compare the `children` prop?",
    ],
    explanation:
      "In JSX, `<Wrapper><span>...</span></Wrapper>` is transformed into `React.createElement(Wrapper, { children: React.createElement('span', ...) })`. Since `createElement` returns a new object every time, the `children` prop changes every render, causing `React.memo` to always fail its shallow check.",
  },
  {
    id: "p26",
    slug: "layout-thrashing-loop",
    title: "The Layout Thrash",
    difficulty: "HARD",
    description:
      "Identify the critical performance flaw in this loop that updates multiple elements' heights.",
    suboptimalCode: `items.forEach((item, i) => {
  const height = elementRefs[i].current.offsetHeight; // Read
  elementRefs[i].current.style.height = (height + 10) + 'px'; // Write
});`,
    correctCode: `const heights = items.map((_, i) => elementRefs[i].current.offsetHeight); // Batch Reads
heights.forEach((h, i) => {
  elementRefs[i].current.style.height = (h + 10) + 'px'; // Batch Writes
});`,
    mistakes: [
      {
        id: "m-p-thrash",
        lineNumber: 2,
        message:
          "Alternating between reading layout (offsetHeight) and writing to layout (style) forces the browser to recalculate the page layout on every single iteration.",
        severity: "error",
      },
    ],
    proTips: [
      "Always 'Batch Reads' then 'Batch Writes'. This allows the browser to perform a single layout calculation instead of N calculations.",
    ],
    hints: [
      "Google for 'Layout Thrashing' or 'Reflow'.",
      "What happens when you ask the browser for a size RIGHT after you changed a size?",
    ],
    explanation:
      "When you change a style (Write), the browser marks the layout as 'dirty'. If you immediately ask for a measurement like `offsetHeight` (Read), the browser must STOP and calculate the entire page layout immediately to give you an accurate number. Doing this in a loop is devastating for performance.",
  },
  {
    id: "p27",
    slug: "usesyncexternalstore-nonreact",
    title: "The External Store Bridge",
    difficulty: "HARD",
    description:
      "You have a global legacy object `window.state` that updates outside of React. How do you bridge it to React efficiently without massive re-renders?",
    suboptimalCode: `useEffect(() => {
  const handler = () => forceUpdate();
  legacyStore.subscribe(handler);
  return () => legacyStore.unsubscribe(handler);
}, []);`,
    correctCode: `const state = useSyncExternalStore(
  legacyStore.subscribe,
  legacyStore.getSnapshot,
  legacyStore.getServerSnapshot // Optional for SSR
);`,
    mistakes: [
      {
        id: "m-p-external",
        lineNumber: 1,
        message:
          "Manual 'forceUpdate' techniques can lead to 'tearing' where different parts of the UI show different data versions during a single render.",
        severity: "warning",
      },
    ],
    proTips: [
      "useSyncExternalStore is the official React 18 hook for connecting to non-React state management libraries or browser APIs.",
    ],
    hints: [
      "Is there a standard hook for external data?",
      "How do you avoid 'Inconsistent UI' when rendering concurrently?",
    ],
    explanation:
      "Concurrent React can pause and resume renders. If an external store changes while React is 'paused', different components might see different values when React resumes. `useSyncExternalStore` forces a 'consistent' view and prevents this 'tearing' effect.",
  },
  {
    id: "p28",
    slug: "svg-path-complexity",
    title: "The SVG Bottleneck",
    difficulty: "HARD",
    description:
      "A maps application with thousands of SVG paths is sluggish on pan/zoom. What is the best internal React optimization?",
    suboptimalCode: `<svg>
  {paths.map(p => <Path key={p.id} data={p} />)}
</svg>`,
    correctCode: `<svg>
  <g transform={transform}>
    {useMemo(() => paths.map(p => <Path key={p.id} data={p} />), [paths])}
  </g>
</svg>`,
    mistakes: [
      {
        id: "m-p-svg",
        lineNumber: 2,
        message:
          "Re-rendering thousands of <path> components on every frame of a pan/zoom operation is a major CPU cost in React's reconciliation phase.",
        severity: "warning",
      },
    ],
    proTips: [
      "For complex SVGs or Canvas, use CSS transforms on a parent container for movement, rather than re-calculating the internal coordinates of thousands of elements.",
    ],
    hints: [
      "Do the paths themselves change during a pan, or just their container's position?",
      "Think about GPU vs CPU rendering.",
    ],
    explanation:
      "If you pan an SVG, the *shapes* don't change, just their container. By wrapping the paths in a group `<g>` and using `useMemo` to KEEP the paths the same, React skips the virtual DOM diffing for the thousands of shapes. The panning is then handled by CSS `transform` on the `<g>`, which is hardware-accelerated by the GPU.",
  },
  {
    id: "p29",
    slug: "usedeferredvalue-dual-render",
    title: "The Dual-Render Pattern",
    difficulty: "HARD",
    description:
      "You're using useDeferredValue to keep an input snappy, but the stale UI isn't visually distinct. How do you implement a 'pending' overlay?",
    suboptimalCode: `const deferredValue = useDeferredValue(value);
return <Results data={deferredValue} />;`,
    correctCode: `const deferredValue = useDeferredValue(value);
const isStale = value !== deferredValue;

return (
  <div style={{ opacity: isStale ? 0.5 : 1 }}>
     <Results data={deferredValue} />
  </div>
);`,
    mistakes: [
      {
        id: "m-p-stale-ui",
        lineNumber: 2,
        message:
          "Without visual feedback, the user might think the app is broken or not responding because the results don't match their typing.",
        severity: "info",
      },
    ],
    proTips: [
      "Always provide visual feedback (like reduced opacity or a spinner) when showing 'stale' deferred content.",
    ],
    hints: [
      "How can you tell if the value the user typed is the SAME as the value currently being displayed in the results?",
      "Think about the logic: input !== display.",
    ],
    explanation:
      "`useDeferredValue` returns the 'old' value while the background render is happening. By comparing the 'current' state with the 'deferred' state, you can detect exactly when a background update is in progress and inform the user.",
  },
  {
    id: "p30",
    slug: "ref-micro-store",
    title: "The Ref-as-Store Escape",
    difficulty: "HARD",
    description:
      "You have a real-time collaborative editor. 50 players are updating their mouse positions. Context re-renders the whole page. What is the solution?",
    suboptimalCode: `<PlayerContext.Provider value={playerPositions}>
  <App />
</PlayerContext.Provider>`,
    correctCode: `// Inside the App
const playerPositions = useRef({});

// Children subscribe to the ref directly
useEffect(() => {
  socket.on('update', (data) => {
    playerPositions.current = data;
    // Only notify specific targeted components
    emitter.emit('players-updated');
  });
}, []);`,
    mistakes: [
      {
        id: "m-p-context-overload",
        lineNumber: 1,
        message:
          "React Context is NOT designed for high-frequency updates (60fps). It will force every component in your app to re-calculate, even if they don't use the data.",
        severity: "error",
      },
    ],
    proTips: [
      "For gaming, collaborative tools, or financial data, use a subscription-based 'External Store' (like Zustand or a custom Ref+Emitter system) instead of Context.",
    ],
    hints: [
      "How do high-performance libraries like Redux or Zustand avoid re-rendering the whole tree?",
      "Is there a way to bypass the 'Render' cycle for data that updates too fast?",
    ],
    explanation:
      "By keeping the high-frequency data in a `useRef`, you prevent React from knowing about the changes at the top level. Individual components then 'subscribe' to specific updates and only trigger their own local `setState` when relevant. This turns an O(N) re-render into an O(1) update.",
  },
  {
    id: "p31",
    slug: "profiler-hook-usage",
    title: "Profiling in Production",
    difficulty: "HARD",
    description:
      "You need to track how long it takes for a search results list to render for actual users. How do you implement this in code?",
    suboptimalCode: `// No tracking, just guessing from DevTools.`,
    correctCode: `<Profiler id="SearchList" onRender={(id, phase, actualDuration) => {
  if (actualDuration > 100) {
    sendToAnalytics({ id, phase, duration: actualDuration });
  }
}}>
  <SearchResults />
</Profiler>`,
    mistakes: [
      {
        id: "m-p-guesswork",
        lineNumber: 1,
        message:
          "Local performance is often much better than performance on users' low-end mobile devices. Don't rely on your developer's high-end machine.",
        severity: "info",
      },
    ],
    proTips: [
      "The React <Profiler> is a built-in way to collect real-world performance metrics from your users.",
    ],
    hints: [
      "How can we Measure the 'commit' time of a component tree?",
      "Check the React docs for the Profiler component.",
    ],
    explanation:
      "The `<Profiler>` component measures how often a React application renders and what the 'cost' of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.",
  },
  {
    id: "p32",
    slug: "vdom-walk-depth",
    title: "Depth vs Density",
    difficulty: "HARD",
    description:
      "Which is more expensive for React: A flat list of 100 simple items, or a single component nested 100 levels deep? Explain the VDOM overhead.",
    suboptimalCode: `// Flat List
{items.map(i => <div key={i}>{i}</div>)}

// Deep Nesting
<A><B><C>...[100 layers]...<Z /></C></B></A>`,
    correctCode: `// The Flat List is usually better. 
// Deep Nesting forces a huge recursive stack during reconciliation.`,
    mistakes: [
      {
        id: "m-p-nesting",
        lineNumber: 1,
        message:
          "Extremely deep component trees increased the 'Work' React has to do during the 'Begin Work' phase of reconciliation, even if nothing changes.",
        severity: "info",
      },
    ],
    proTips: [
      "Keep your component tree as 'flat' as possible. Deep nesting often occurs from over-using 'HOCs' or 'Wrapper' design patterns.",
    ],
    hints: [
      "How does React 'find' the component that needs updating?",
      "Think about the Fiber tree structure.",
    ],
    explanation:
      "React's reconciler (Fiber) is essentially a walk through a tree. Every layer adds a 'next' step. Deep nesting creates a long linked-list that React must traverse. A flat structure allows React to quickly 'sibling walk', which is much more efficient for the reconciler's internal pointer logic.",
  },
  {
    id: "p33",
    slug: "usetransition-parallel-fetching",
    title: "The Transition Suspense",
    difficulty: "HARD",
    description:
      "When using Suspense for data fetching, why should you ALWAYS wrap the navigation/state update in a 'startTransition'?",
    suboptimalCode: `const showProfile = () => {
  setUserId(123); // Triggers Suspense immediately
};
// Result: UI disappears and is replaced by a whole-page skeleton.`,
    correctCode: `const [isPending, startTransition] = useTransition();
const showProfile = () => {
  startTransition(() => {
    setUserId(123);
  });
};
// Result: Current page stays interactive, and ONLY the 
// new content shows a skeleton once it's ready.`,
    mistakes: [
      {
        id: "m-p-suspense-jar",
        lineNumber: 2,
        message:
          "Updating state that triggers a Suspense boundary without a Transition causes the 'nearest' boundary to fallback immediately, which is often a jarring 're-loading' experience.",
        severity: "warning",
      },
    ],
    proTips: [
      "In React 18+, startTransition is the key to 'Seamless' loading states with Suspense. It prevents the current UI from disappearing.",
    ],
    hints: [
      "Does the current page 'vanish' when you click a link?",
      "How can we 'stay' on the current page while the next one loads?",
    ],
    explanation:
      "If a state update causes a component to Suspend, React will try to'wait' for the data if that update happened inside a Transition. This is revolutionary because it means the user stays on the *old* screen (which is still interactive!) while the *new* screen is being prepared in the background.",
  },
];
