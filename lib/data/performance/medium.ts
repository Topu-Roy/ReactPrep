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
];
