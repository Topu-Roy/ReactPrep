import { type Question } from "../types";

export const performanceMediumQuestions: Question[] = [
  {
    id: "p1",
    slug: "object-literal-props",
    title: "Object Literal Prop Re-renders",
    difficulty: "MEDIUM",
    description:
      "Identify why the UserProfile component re-renders on every parent render despite being wrapped in React.memo.",
    suboptimalCode: `function Parent() {
  const [val, setVal] = useState(0);
  
  return (
    <div>
      <button onClick={() => setVal(v => v + 1)}>Re-render Parent</button>
      <UserProfile config={{ theme: 'dark' }} />
    </div>
  );
}

const UserProfile = memo(({ config }) => {
  console.log("Child render");
  return <div>Theme: {config.theme}</div>;
});`,
    correctCode: `const THEME_CONFIG = { theme: 'dark' };

function Parent() {
  const [val, setVal] = useState(0);
  
  return (
    <div>
       <button onClick={() => setVal(v => v + 1)}>Re-render Parent</button>
       <UserProfile config={THEME_CONFIG} />
    </div>
  );
}`,
    mistakes: [
      {
        id: "mp1",
        lineNumber: 7,
        message:
          "Passing an object literal directly to a prop creates a new object reference on every render, breaking memoization.",
        severity: "error",
      },
    ],
    proTips: [
      "Move static objects outside the component to preserve reference equality.",
      "Use useMemo for objects that depend on state or props.",
    ],
    hints: [
      "React.memo uses shallow comparison for props.",
      "Is \`{ theme: 'dark' }\` the same object on every render?",
    ],
    explanation:
      "Object literals create a new reference on every render. Since \`React.memo\` performs a shallow comparison, it sees a 'new' object every time, causing the child to re-render unnecessarily.",
  },
  {
    id: "p3",
    slug: "redundant-states",
    title: "Redundant Derived State",
    difficulty: "MEDIUM",
    description:
      "Learn why syncing state in useEffect is often an anti-pattern when you can derive data during render.",
    suboptimalCode: `function UserList({ users }) {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(users.filter(u => u.active));
  }, [users]);

  return <div>Active: {filteredUsers.length}</div>;
}`,
    correctCode: `function UserList({ users }) {
  const filteredUsers = useMemo(() => 
    users.filter(u => u.active), 
  [users]);

  return <div>Active: {filteredUsers.length}</div>;
}`,
    mistakes: [
      {
        id: "mp3",
        lineNumber: 5,
        message:
          "Updating state inside useEffect based on props causes an extra unnecessary render cycle. Derive it directly or use useMemo.",
        severity: "warning",
      },
    ],
    proTips: ["Don't use state for things that can be calculated from props or other state."],
    hints: [
      "How many times does this component render when 'users' changes?",
      "Can we calculate 'filteredUsers' during the render phase?",
    ],
    explanation:
      "Setting state in \`useEffect\` based on prop changes causes a second render cycle. For simple filtering, you should either calculate it during the render or wrap the calculation in \`useMemo\` if it's expensive.",
  },
  {
    id: "p14",
    slug: "memoizing-list-filter",
    title: "Filtering 1000 Items",
    difficulty: "MEDIUM",
    description:
      "An expensive filter runs on every render of the component. How can you ensure it only runs when the search query or the list changes?",
    suboptimalCode: `function SearchList({ items, query }) {
  const filtered = items.filter(item => item.name.includes(query));
  return <List items={filtered} />;
}`,
    correctCode: `function SearchList({ items, query }) {
  const filtered = useMemo(() => 
    items.filter(item => item.name.includes(query)), 
  [items, query]);
  
  return <List items={filtered} />;
}`,
    mistakes: [
      {
        id: "m-p-filter",
        lineNumber: 2,
        message:
          "The .filter() operation is a loop. If SearchList re-renders for other reasons (e.g. a timer), this loop runs unnecessarily.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use useMemo for any array transformation (filter, map, sort) that involves more than a few dozen items.",
    ],
    hints: [
      "Is there a hook to 'cache' the result of a calculation?",
      "What are the dependencies of the filter logic?",
    ],
    explanation:
      "`useMemo` caches the result of the filter. If the `items` array and `query` string stay the same between renders, React skips the filter loop entirely and returns the previous result.",
  },
  {
    id: "p15",
    slug: "stable-callback-dependency",
    title: "The Re-ordering Callback",
    difficulty: "MEDIUM",
    description:
      "A parent passes a remove() function to multiple list items. Why do all items re-render when a single item is removed?",
    suboptimalCode: `function Parent() {
  const [items, setItems] = useState([...]);
  const remove = (id) => setItems(items.filter(i => i.id !== id));
  
  return items.map(i => <Item key={i.id} onRemove={remove} />);
}`,
    correctCode: `const remove = useCallback((id) => {
  setItems(prevItems => prevItems.filter(i => i.id !== id));
}, []); // No dependency on 'items' state!`,
    mistakes: [
      {
        id: "m-p-callback",
        lineNumber: 3,
        message:
          "The 'remove' function depends on the current 'items' state. When an item is removed, the function is recreated, breaking memoization for all remaining items.",
        severity: "error",
      },
    ],
    proTips: [
      "Combine useCallback with functional state updates (setItems(prev => ...)) to keep the callback reference stable forever.",
    ],
    hints: [
      "Check the dependencies of your useCallback.",
      "How can you update state without needing the state variable itself in the effect scope?",
    ],
    explanation:
      "By using the functional update form of `setItems`, the `remove` function no longer needs `items` in its dependency array. It stays the same function reference for the entire lifecycle of the component, allowing all children to stay memoized.",
  },
  {
    id: "p16",
    slug: "intro-to-windowing",
    title: "The 10,000 Row Problem",
    difficulty: "MEDIUM",
    description:
      "React becomes unresponsive when rendering a list of 10,000 items. What is the fundamental technique to fix this?",
    suboptimalCode: `<div>
  {hugeList.map(item => <Row key={item.id} data={item} />)}
</div>`,
    correctCode: `<FixedSizeList
  height={500}
  itemCount={10000}
  itemSize={35}
  width={300}
>
  {Row}
</FixedSizeList>`,
    mistakes: [
      {
        id: "m-p-windowing",
        lineNumber: 2,
        message:
          "Rendering thousands of DOM nodes at once consumes massive memory. Most of these nodes are invisible to the user.",
        severity: "error",
      },
    ],
    proTips: [
      "Use 'Windowing' or 'Virtualization' libraries like react-window or react-virtuoso to only render what's actually visible on screen.",
    ],
    hints: [
      "Does the user need all 10,000 items in the DOM at the same time?",
      "Think about high-performance lists in mobile apps.",
    ],
    explanation:
      "Windowing works by only rendering the 10-20 items currently visible in the scroll container. As you scroll, React reuses the same nodes for new data. This keeps the DOM small (20 nodes instead of 10,000) and the UI extremely fast.",
  },
  {
    id: "p17",
    slug: "ref-for-timers",
    title: "Silent State: Timers",
    difficulty: "MEDIUM",
    description: "Explain why storing a setInterval ID in state is a performance anti-pattern.",
    suboptimalCode: `const [intervalId, setIntervalId] = useState(null);

useEffect(() => {
  const id = setInterval(() => {...}, 1000);
  setIntervalId(id);
}, []);`,
    correctCode: `const intervalRef = useRef(null);

useEffect(() => {
  intervalRef.current = setInterval(() => {...}, 1000);
  return () => clearInterval(intervalRef.current);
}, []);`,
    mistakes: [
      {
        id: "m-p-ref-timer",
        lineNumber: 1,
        message:
          "Updating state triggers a re-render. Since the interval ID doesn't affect what the user sees, rendering the whole component just to store a number is wasteful.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use useRef for any value that needs to persist across renders but shouldn't trigger a visual update when it changes.",
    ],
    hints: [
      "Does the interval ID change the UI directly?",
      "Which hook stores data without triggering renders?",
    ],
    explanation:
      "The `intervalId` is just a utility value needed for cleanup. Storing it in `useState` forces React to run the render function, diff the virtual DOM, and check for updates—none of which are necessary for a background timer ID.",
  },
  {
    id: "p18",
    slug: "debounced-search-logic",
    title: "Debouncing the API",
    difficulty: "MEDIUM",
    description: "Identify the performance benefit of debouncing a search input.",
    suboptimalCode: `useEffect(() => {
  // Runs on every single keystroke!
  fetch('/api/search?q=' + text);
}, [text]);`,
    correctCode: `useEffect(() => {
  const handler = setTimeout(() => {
    fetch('/api/search?q=' + text);
  }, 300);
  
  return () => clearTimeout(handler);
}, [text]);`,
    mistakes: [
      {
        id: "m-p-debounce",
        lineNumber: 3,
        message:
          "Firing network requests on every character change wastes server resources and can cause 'flickery' results due to race conditions.",
        severity: "warning",
      },
    ],
    proTips: [
      "Debouncing saves server costs and improves UI stability. 300ms is usually the 'sweet spot' for user-perceived responsiveness.",
    ],
    hints: ["How can we wait for the user to 'finish' typing?", "Think about network congestion."],
    explanation:
      "Debouncing ensures that the expensive operation (the network fetch) only happens once the user pauses for a specified time. This drastically reduces the number of requests and ensures the final request is the most relevant one.",
  },
  {
    id: "p19",
    slug: "react-lazy-splitting",
    title: "Splitting the Bundle",
    difficulty: "MEDIUM",
    description:
      "How do you prevent a heavy 500kb 'StatsDashboard' component from slowing down the initial load of your landing page?",
    suboptimalCode: `import StatsDashboard from './StatsDashboard';

function App() {
  return isOpen ? <StatsDashboard /> : <Landing />;
}`,
    correctCode: `const StatsDashboard = React.lazy(() => import('./StatsDashboard'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      {isOpen ? <StatsDashboard /> : <Landing />}
    </Suspense>
  );
}`,
    mistakes: [
      {
        id: "m-p-lazy",
        lineNumber: 1,
        message:
          "Standard imports include the component in the main bundle. The user has to download the 'Dashboard' code even if they only see the 'Landing' page.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use React.lazy for routes or heavy hidden components (like Modals or Analytics Dashboards) to keep your initial JS bundle small.",
    ],
    hints: [
      "How can we load a component 'on demand'?",
      "What happens if the code isn't downloaded yet when `isOpen` becomes true?",
    ],
    explanation:
      "`React.lazy` combined with dynamic `import()` tells the bundler to put that component into a separate file (chunk). It is only downloaded by the browser once it's actually about to be rendered. `Suspense` handles the waiting period while the file is flying over the network.",
  },
  {
    id: "p20",
    slug: "context-memo-child",
    title: "Context Consumer Block",
    difficulty: "MEDIUM",
    description:
      "A component consumes a value from Context. How do you prevent its children (which don't use context) from re-rendering?",
    suboptimalCode: `function Consumer() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ color: theme.color }}>
       <ExpensiveChild />
    </div>
  );
}`,
    correctCode: `function Consumer() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ color: theme.color }}>
       {useMemo(() => <ExpensiveChild />, [])}
    </div>
  );
}`,
    mistakes: [
      {
        id: "m-p-ctx-memo",
        lineNumber: 5,
        message:
          "When ThemeContext updates, Consumer re-renders. By default, ExpensiveChild also re-renders even though it doesn't care about the theme.",
        severity: "warning",
      },
    ],
    proTips: [
      "Memoizing the JSX tree with useMemo or using 'Component Composition' (passing children as a prop) are the most effective ways to optimize Context consumers.",
    ],
    hints: [
      "Is there a way to 'freeze' the ExpensiveChild render?",
      "Does every child of a context consumer HAVE to re-render?",
    ],
    explanation:
      "Context updates are like state updates—they trigger a re-render of the consumer and all its descendants. If you wrap the descendant in `useMemo`, React will reuse the previous render result for that child, effectively blocking the render-bubble from traveling further down.",
  },
  {
    id: "p21",
    slug: "usetransition-search-ux",
    title: "Non-Blocking Filter",
    difficulty: "MEDIUM",
    description:
      "The typing in the search box is stuttering because the list below is massive. Use useTransition to prioritize the input.",
    suboptimalCode: `const onChange = (e) => {
  setQuery(e.target.value);
  setFilteredItems(items.filter(i => i.includes(e.target.value)));
};`,
    correctCode: `const [isPending, startTransition] = useTransition();

const onChange = (e) => {
  setQuery(e.target.value); // Priority 1: Update input
  startTransition(() => {
    // Priority 2: Update heavy list (can be interrupted)
    setFilteredItems(items.filter(i => i.includes(e.target.value)));
  });
};`,
    mistakes: [
      {
        id: "m-p-transition",
        lineNumber: 3,
        message:
          "Running heavy filtering in the same sync task as the input update makes the typing feel unresponsive 'laggy'.",
        severity: "warning",
      },
    ],
    proTips: [
      "useTransition makes heavy updates 'interruptible'. If the user types a new character before the filter finishes, React will throw away the old work and start fresh.",
    ],
    hints: [
      "How can we separate the 'urgent' update from the 'slow' update?",
      "Look for a hook that returns [isPending, startTransition].",
    ],
    explanation:
      "By wrapping `setFilteredItems` in `startTransition`, we tell React that updating the list is less urgent than keeping the input responsive. React will render the input update immediately and work on the list update in the background, keeping the FPS high.",
  },
  {
    id: "p22",
    slug: "hover-prefetch-ux",
    title: "UX Speed: Hover Pre-fetch",
    difficulty: "MEDIUM",
    description:
      "How can you make navigation feel 'instant' for the user without pre-loading every possible page?",
    suboptimalCode: `<Link to="/profile">Profile</Link>`,
    correctCode: `<Link 
  to="/profile" 
  onMouseEnter={() => queryClient.prefetchQuery(['user'])}
>
  Profile
</Link>`,
    mistakes: [
      {
        id: "m-p-prefetch",
        lineNumber: 1,
        message:
          "Waiting for the 'click' to start data fetching introduces a delay. The few hundred milliseconds 'hover' time is wasted potential.",
        severity: "info",
      },
    ],
    proTips: [
      "The average user hovers over a link for 200-400ms before clicking. Starting the fetch on hover can make the next page feel like it loaded instantly.",
    ],
    hints: ["What event happens just before a 'click'?", "Think about predictive data fetching."],
    explanation:
      "This is a UX-driven performance optimization. By the time the user actually clicks, most of the data is already in the cache. This eliminates the 'loading spinner' screen and makes the app feel extremely professional and fast.",
  },
  {
    id: "p23",
    slug: "throttled-scroll-event",
    title: "The Scroll Performance Lag",
    difficulty: "MEDIUM",
    description:
      "Identify why updating a navbar's visibility based on window.scrollY is lagging on mobile.",
    suboptimalCode: `window.addEventListener('scroll', () => {
  setScrollY(window.scrollY); // Fires 100+ times per second
});`,
    correctCode: `// Use throttle from lodash or a custom implementation
const throttledHandler = throttle(() => {
  setScrollY(window.scrollY);
}, 100);

window.addEventListener('scroll', throttledHandler);`,
    mistakes: [
      {
        id: "m-p-throttle",
        lineNumber: 2,
        message:
          "Scroll events fire at extremely high frequencies. Updating React state for every single pixel of movement is overkill and kills battery life.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use Throttling for scroll/resize to limit executions to a fixed rate (e.g. once every 100ms). Use Debouncing for searches to wait for a pause.",
    ],
    hints: [
      "Do we need to know the scroll position for every single pixel?",
      "What's the difference between throttle and debounce?",
    ],
    explanation:
      "Throttling limits the number of times a function can be called over a period of time. By only updating the state every 100ms, we still get smooth feedback for the user but reduce the React render workload by 90%.",
  },
];
