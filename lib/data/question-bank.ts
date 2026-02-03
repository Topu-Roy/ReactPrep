import { type Question, type Topic } from "./types";

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
      hints: [
        "Check what happens to the interval when count changes.",
        "Think about closures and when the useEffect function is created.",
      ],
      explanation:
        "When an empty dependency array is used, the effect runs only once. The closure inside setInterval captures the initial value of 'count' (0). Using a functional update `setCount(c => c + 1)` allows React to use the latest state without closure stale issues.",
    },
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
  ],
  performance: [
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
        "Is `{ theme: 'dark' }` the same object on every render?",
      ],
      explanation:
        "Object literals create a new reference on every render. Since `React.memo` performs a shallow comparison, it sees a 'new' object every time, causing the child to re-render unnecessarily.",
    },
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
        "Setting state in `useEffect` based on prop changes causes a second render cycle. For simple filtering, you should either calculate it during the render or wrap the calculation in `useMemo` if it's expensive.",
    },
  ],
  patterns: [
    {
      id: "pat1",
      slug: "compound-components-flexibility",
      title: "Breaking Compound Components",
      difficulty: "HARD",
      description:
        "Notice how this Select implementation fails when extra DOM elements are wrapped around its children.",
      suboptimalCode: `function Select({ children }) {
  return (
    <div className="select-container">
      {React.Children.map(children, child => 
        React.cloneElement(child, { someInternalState: true })
      )}
    </div>
  );
}

// User usage that breaks:
<Select>
  <div className="wrapper">
    <Option value="1">One</Option>
  </div>
</Select>`,
      correctCode: `const SelectContext = createContext();

function Select({ children }) {
  return (
    <SelectContext.Provider value={{ someInternalState: true }}>
      <div className="select-container">
        {children}
      </div>
    </SelectContext.Provider>
  );
}`,
      mistakes: [
        {
          id: "mpat1",
          lineNumber: 4,
          message:
            "Using React.Children.map and cloneElement only works for direct children. It's brittle and lacks flexibility.",
          severity: "warning",
        },
      ],
      proTips: [
        "Prefer Context API for state sharing in Compound Components to allow nested children.",
      ],
      hints: [
        "Check how deeply the children map goes.",
        "What happens if we put a div around one of the options?",
      ],
      explanation:
        "React.Children.map only iterates over immediate children. Moving logic into a Context allows any descendant component to access the state, making the compound component much more flexible.",
    },
    {
      id: "pat2",
      slug: "prop-drilling",
      title: "Prop Drilling Pain",
      difficulty: "EASY",
      description: "See how deep prop drilling makes components hard to reuse and maintain.",
      suboptimalCode: `function App({ user }) {
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Navbar user={user} />;
}

function Navbar({ user }) {
  return <UserMenu user={user} />;
}`,
      correctCode: `const UserContext = createContext();

function App({ user }) {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}`,
      mistakes: [
        {
          id: "mpat2",
          lineNumber: 6,
          message:
            "Intermediate components shouldn't need to know about data they don't directly use. Use Context or Component Composition.",
          severity: "info",
        },
      ],
      proTips: [
        "Before reaching for Context, consider if you can pass the child component itself as a prop (Composition).",
      ],
      hints: [
        "Does the Navbar component really need to know about the User?",
        "How many levels deep is the data being passed?",
      ],
      explanation:
        "Prop drilling makes code hard to maintain because intermediate components become tightly coupled to data they don't use. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.",
    },
    {
      id: "pat3",
      slug: "render-props-vs-hooks",
      title: "Render Props Nightmare",
      difficulty: "HARD",
      description:
        "Experience the complexity of 'wrapper hell' before Hooks simplified logic sharing.",
      suboptimalCode: `function Tracker() {
  return (
    <Mouse>
      {mouse => (
        <Scroll>
          {scroll => (
            <WindowSize>
              {size => (
                <div>Pos: {mouse.x}, {scroll.y}, {size.width}</div>
              )}
            </WindowSize>
          )}
        </Scroll>
      )}
    </Mouse>
  );
}`,
      correctCode: `function Tracker() {
  const mouse = useMouse();
  const scroll = useScroll();
  const size = useWindowSize();

  return <div>Pos: {mouse.x}, {scroll.y}, {size.width}</div>;
}`,
      mistakes: [
        {
          id: "mpat3",
          lineNumber: 4,
          message:
            "Deeply nested render props lead to 'Wrapper Hell', making code extremely hard to read and debug.",
          severity: "warning",
        },
      ],
      proTips: ["Use Custom Hooks to share stateful logic cleaner than Render Props or HOCs."],
      hints: [
        "Notice the 'pyramid of doom' structure.",
        "Is there a flatter way to access these values?",
      ],
      explanation:
        "Render props can lead to deeply nested code (wrapper hell). Hooks allow you to extract stateful logic into flat, reusable functions, significantly improving readability and composability.",
    },
  ],
};
