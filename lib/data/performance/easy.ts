import { type Question } from "../types";

export const performanceEasyQuestions: Question[] = [
  {
    id: "p2",
    slug: "map-key-index",
    title: "Index as Key Warning",
    difficulty: "EASY",
    description:
      "Why using the array index as a key can lead to bugs and poor performance during list updates.",
    suboptimalCode: `function List({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
}`,
    correctCode: `function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}`,
    mistakes: [
      {
        id: "mp2",
        lineNumber: 5,
        message:
          "Using index as a key causes issues when items are reordered, added, or removed, as React can't properly track identities.",
        severity: "warning",
      },
    ],
    proTips: [
      "Always use a unique, stable ID for keys (like database IDs).",
      "If you must use index, ensure the list is static and won't change.",
    ],
    hints: [
      "What happens if we reverse the items in the list?",
      "Does the index stick to the item or the position?",
    ],
    explanation:
      "React uses keys to identify which items have changed, been added, or been removed. Using the index as a key is problematic when the order of items changes, as React may reuse the wrong component state for an item.",
  },
  {
    id: "p4",
    slug: "memo-static-child",
    title: "Static Component Memo",
    difficulty: "EASY",
    description:
      "A header component re-renders every time the parent counter increments. How do you stop this?",
    suboptimalCode: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Header />
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  );
}`,
    correctCode: `const Header = React.memo(() => {
  return <h1>Site Title</h1>;
});`,
    mistakes: [
      {
        id: "m-p-memo",
        lineNumber: 1,
        message:
          "Functional components re-render by default when their parent re-renders, even if they have no props or state.",
        severity: "info",
      },
    ],
    proTips: [
      "Use React.memo for components that render the same output given the same props to avoid unnecessary 'virtual DOM' updates.",
    ],
    hints: [
      "Check if Header has any props that change.",
      "How do you tell React to 'remember' a component?",
    ],
    explanation:
      "By default, React re-renders all children when a parent state changes. Wrapping a component in `React.memo` makes React skip the render if the props are identical to the previous render.",
  },
  {
    id: "p5",
    slug: "inline-style-object",
    title: "The Style Reference Leak",
    difficulty: "EASY",
    description:
      "Identify why passing a style object literal directly in JSX is a minor performance anti-pattern.",
    suboptimalCode: `<div style={{ padding: '20px', color: 'blue' }}>
  Content
</div>`,
    correctCode: `const BOX_STYLE = { padding: '20px', color: 'blue' };

function MyComponent() {
  return <div style={BOX_STYLE}>Content</div>;
}`,
    mistakes: [
      {
        id: "m-p-style",
        lineNumber: 1,
        message:
          "Passing an object literal `{{...}}` creates a new object on every render. If this is passed to a memoized component, it will break memoization.",
        severity: "info",
      },
    ],
    proTips: ["Move static style objects outside the component to keep a stable reference."],
    hints: [
      "Is `{} === {}` in JavaScript?",
      "What happens to the object identity when the component function runs again?",
    ],
    explanation:
      "While small for a `div`, if you pass `{{...}}` to a custom component wrapped in `React.memo`, it will re-render every time because it sees a 'new' style object. Moving it outside the component keeps the reference stable across renders.",
  },
  {
    id: "p6",
    slug: "state-localization",
    title: "Lifting State Too High",
    difficulty: "EASY",
    description:
      "The entire App re-renders when a user types in a single search input. How do you fix this?",
    suboptimalCode: `function App() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <Navbar query={query} setQuery={setQuery} />
      <ExpensiveMainContent />
    </div>
  );
}`,
    correctCode: `function Navbar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

function App() {
  return (
    <div>
      <Navbar />
      <ExpensiveMainContent />
    </div>
  );
}`,
    mistakes: [
      {
        id: "m-p-lifting",
        lineNumber: 2,
        message:
          "State is 'lifted' into App even though ExpensiveMainContent doesn't need it. This causes the main content to re-render on every keystroke.",
        severity: "warning",
      },
    ],
    proTips: [
      "Keep state as local as possible. Only 'lift' state when multiple distant components actually need it.",
    ],
    hints: [
      "Does `ExpensiveMainContent` care about the search query?",
      "Which component is the 'owner' of the input state?",
    ],
    explanation:
      "Lifting state up is a common React pattern, but over-doing it leads to 'render pollution'. If only the Navbar needs the `query` state for the input, keeping it inside Navbar prevents the rest of the App from re-rendering during typing.",
  },
  {
    id: "p7",
    slug: "fragment-vs-div",
    title: "DOM Bloat: Excess Divs",
    difficulty: "EASY",
    description:
      "Why should you prefer <React.Fragment> or <> over <div> when returning multiple elements?",
    suboptimalCode: `function List() {
  return (
    <div>
      <li>Item 1</li>
      <li>Item 2</li>
    </div>
  );
}`,
    correctCode: `function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}`,
    mistakes: [
      {
        id: "m-p-bloat",
        lineNumber: 3,
        message:
          "Creating unnecessary wrapper divs leads to a deeper, heavier DOM tree and can sometimes break CSS layouts like Flexbox or Grid.",
        severity: "info",
      },
    ],
    proTips: ["Use Fragments to group elements WITHOUT adding extra nodes to the DOM."],
    hints: [
      "Check your browser's 'Inspect' view. Is that extra div doing anything useful?",
      "How does it affect the total number of DOM nodes?",
    ],
    explanation:
      "Every DOM node costs memory and time for the browser to calculate layout and paint. Fragments allow you to satisfy React's 'single root' rule without polluting the HTML with empty wrapper containers.",
  },
  {
    id: "p8",
    slug: "random-key-performance",
    title: "The Random Key Disaster",
    difficulty: "EASY",
    description:
      "Why is key={Math.random()} even worse for performance than using the array index?",
    suboptimalCode: `items.map(item => <li key={Math.random()}>{item}</li>)`,
    correctCode: `items.map(item => <li key={item.id}>{item.name}</li>)`,
    mistakes: [
      {
        id: "m-p-random",
        lineNumber: 1,
        message:
          "A random key forces React to UNMOUNT and RE-MOUNT every single list item on every render, because the keys never match.",
        severity: "error",
      },
    ],
    proTips: [
      "Keys must be stable and unique. If they change on every render, React cannot 'diff' the components and loses all efficiency.",
    ],
    hints: [
      "What happens to the old <li> when the new one has a completely different key?",
      "Is it a 're-render' or a 're-mount'?",
    ],
    explanation:
      "React uses keys to identify if an element is the 'same' one from the last render. If the key is random, it's *never* the same. React will destroy the old DOM node and its state and create a new one from scratch every single time.",
  },
  {
    id: "p9",
    slug: "image-lazy-loading",
    title: "Native Image Lazy Loading",
    difficulty: "EASY",
    description:
      "How can you speed up the initial page load for a long gallery without using a library?",
    suboptimalCode: `<img src="/large-photo.jpg" />`,
    correctCode: `<img src="/large-photo.jpg" loading="lazy" />`,
    mistakes: [
      {
        id: "m-p-img",
        lineNumber: 1,
        message:
          "Browsers try to download all images as soon as possible, which steals bandwidth from important resources at the top of the page.",
        severity: "info",
      },
    ],
    proTips: [
      "The native 'loading=lazy' attribute is supported by all modern browsers and is the simplest performance win for image-heavy sites.",
    ],
    hints: [
      "Is there a standard HTML attribute for delaying image fetches?",
      "Think about 'below the fold' content.",
    ],
    explanation:
      "Native lazy loading tells the browser to wait until the image is near the viewport before starting the download. This improves the 'Time to Interactive' and saves user data for images they might never scroll to see.",
  },
  {
    id: "p10",
    slug: "conditional-render-unmount",
    title: "Unmount vs Hidden",
    difficulty: "EASY",
    description:
      "A heavy Modal is hidden using display: none. Why might this be bad for the initial app load?",
    suboptimalCode: `<div style={{ display: isOpen ? 'block' : 'none' }}>
  <ExpensiveComponent />
</div>`,
    correctCode: `{isOpen && <ExpensiveComponent />}`,
    mistakes: [
      {
        id: "m-p-unmount",
        lineNumber: 1,
        message:
          "Using CSS to hide a component means it still renders and runs its logic (and effects) even when the user can't see it.",
        severity: "warning",
      },
    ],
    proTips: [
      "Unmount heavy components when they aren't visible to save memory and CPU cycles during the initial render.",
    ],
    hints: [
      "Is `ExpensiveComponent` still executing if it has specialized effects?",
      "Check the performance tab to see if the work is being done even if 'hidden'.",
    ],
    explanation:
      "Elements hidden with CSS are still part of the DOM and React Tree. They run their lifecycle, mount effects, and consume memory. Conditional rendering `{condition && ...}` ensures the component only exists when needed.",
  },
  {
    id: "p11",
    slug: "lodash-import-bloat",
    title: "The Lodash Import Bloat",
    difficulty: "EASY",
    description:
      "Identify how importing a utility library can accidentally double your JS bundle size.",
    suboptimalCode: `import { map } from 'lodash';`,
    correctCode: `import map from 'lodash/map';`,
    mistakes: [
      {
        id: "m-p-import",
        lineNumber: 1,
        message:
          "Many bundling tools (especially older ones) will include the entire lodash library even if you only use one function.",
        severity: "warning",
      },
    ],
    proTips: [
      "Import specific functions directly from their files to ensure 'Tree Shaking' works optimally and your bundle stays small.",
    ],
    hints: [
      "What's the difference between importing from the root vs a nested path?",
      "Look up 'Tree Shaking' in modern bundlers like Vite or Webpack.",
    ],
    explanation:
      "Destructuring from a main index file often pulls in the whole library. Importing the specific file `lodash/map` ensures that the bundler only sees that tiny chunk of code, significantly reducing the final JS payload for the user.",
  },
  {
    id: "p12",
    slug: "console-log-production",
    title: "Production Log Garbage",
    difficulty: "EASY",
    description:
      "Why is leaving console.log statements in render functions bad for production performance?",
    suboptimalCode: `function Item({ data }) {
  console.log("Rendering Item:", data.id);
  return <li>{data.name}</li>;
}`,
    correctCode: `function Item({ data }) {
  return <li>{data.name}</li>;
}`,
    mistakes: [
      {
        id: "m-p-log",
        lineNumber: 2,
        message:
          "console.log is synchronous and can block the main thread, especially if rendering hundreds of items in a tight loop.",
        severity: "info",
      },
    ],
    proTips: [
      "Use production build flags or CI/CD lint rules to automatically strip console.logs from your codebase.",
    ],
    hints: [
      "Is writing to the console free?",
      "What happens if you render 1,000 items with a log in each one?",
    ],
    explanation:
      "Writing to the browser console involves I/O operations and string serialization. In dev, it's fine. In production, if you render a large list, these logs add up and can visibly degrade the responsiveness of the scroll or UI transitions.",
  },
  {
    id: "p13",
    slug: "state-batching-basics",
    title: "The Myth of Triple Render",
    difficulty: "EASY",
    description:
      "Correct the misconception: How many times does React re-render when these three state updates happen together?",
    suboptimalCode: `function handleClick() {
  setCount(c => c + 1);
  setName("Alice");
  setLoading(false);
  // User thinks: "This renders 3 times!"
}`,
    correctCode: `// No changes needed, but understand that React 18+ 
// batches these automatically into ONE render cycle.`,
    mistakes: [
      {
        id: "m-p-batch",
        lineNumber: 1,
        message:
          "Thinking that React renders for every setState call is a common misunderstanding. React optimizes this via 'Automatic Batching'.",
        severity: "info",
      },
    ],
    proTips: [
      "Automatic Batching exists since React 18. Even inside promises and timeouts, multiple state updates are grouped into one render.",
    ],
    hints: [
      "How many screen updates would a user see?",
      "Look up 'Automatic Batching' in React 18.",
    ],
    explanation:
      "React is smart. Instead of rendering three times, it waits until the end of the event handler to determine the final state and performs a single render. This saves significant CPU cycles and prevents 'half-updated' UI states from flickering.",
  },
];
