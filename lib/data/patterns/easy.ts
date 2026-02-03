import { type Question } from "../types";

export const patternsEasyQuestions: Question[] = [
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
    id: "pat4",
    slug: "composition-vs-inheritance",
    title: "The Composition Rule",
    difficulty: "EASY",
    description: "Identify why React favors composition over inheritance for sharing UI logic.",
    suboptimalCode: `class BaseButton extends React.Component {
  render() {
    return <button className="base">Base</button>;
  }
}
class RedButton extends BaseButton { ... }`,
    correctCode: `function Button({ children, className }) {
  return <button className={"base " + className}>{children}</button>;
}

function RedButton() {
  return <Button className="red">Red</Button>;
}`,
    mistakes: [
      {
        id: "m-pat-comp",
        lineNumber: 1,
        message:
          "Inheritance in React is almost never recommended. It's rigid and makes components hard to reuse and test.",
        severity: "warning",
      },
    ],
    proTips: [
      "Think of components as 'atoms' and 'molecules' that you assemble, not as hierarchies you inherit from.",
    ],
    hints: [
      "How does React suggest we reuse code?",
      "Look up 'Composition vs Inheritance' in the official React docs.",
    ],
    explanation:
      "React is designed around a powerful composition model. You can share non-UI logic with custom hooks and share UI structure by passing components as props or using `children`. Inheritance creates tight coupling and makes the codebase fragile.",
  },
  {
    id: "pat5",
    slug: "container-presentational",
    title: "The Smart/Dumb Pattern",
    difficulty: "EASY",
    description:
      "Separate the data fetching logic from the display logic to make the component more testable.",
    suboptimalCode: `function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetchUsers().then(setUsers); }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    correctCode: `// Presentational (Dumb)
function UserListView({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Container (Smart)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetchUsers().then(setUsers); }, []);
  return <UserListView users={users} />;
}`,
    mistakes: [
      {
        id: "m-pat-container",
        lineNumber: 1,
        message:
          "Mixing side-effects (fetches) and UI logic (mapping) in one component makes it harder to reuse in storybooks or test without mocking the network.",
        severity: "info",
      },
    ],
    proTips: [
      "Keeping 'presentational' components pure (props in, JSX out) makes your visual testing significantly easier.",
    ],
    hints: [
      "How could you render this list with 'fake' data for a preview?",
      "Identify the 'logic' vs the 'view'.",
    ],
    explanation:
      "Wait, this is the 'Container/Presentational' pattern. While custom hooks often replace this today, the principle of separating 'how it works' from 'how it looks' remains a core React design pattern.",
  },
  {
    id: "pat6",
    slug: "controlled-vs-uncontrolled-basics",
    title: "Taking Control",
    difficulty: "EASY",
    description:
      "What is the primary difference between a controlled and an uncontrolled input in React?",
    suboptimalCode: `<input type="text" id="name" />
<button onClick={() => {
  const val = document.getElementById('name').value;
  alert(val);
}}>Submit</button>`,
    correctCode: `const [name, setName] = useState("");

<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>`,
    mistakes: [
      {
        id: "m-pat-uncontrolled",
        lineNumber: 1,
        message:
          "Directly reading from the DOM is an 'uncontrolled' pattern. In React, we usually want the component's state to be the 'single source of truth'.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use controlled components (state-driven) for forms that need validation or immediate feedback. Use uncontrolled (ref-driven) for simple, high-performance forms.",
    ],
    hints: ["Who is in charge of the input's value?", "Think about the 'Single Source of Truth'."],
    explanation:
      "Controlled components have their value managed by React state. Every change updates the state, which then updates the input's value. This makes it easy to validate input, restrict characters, or update other parts of the UI simultaneously.",
  },
  {
    id: "pat7",
    slug: "children-as-prop-layout",
    title: "Layout Wrapping",
    difficulty: "EASY",
    description: "Use the 'children' prop to create a reusable PageLayout component.",
    suboptimalCode: `function HomePage() {
  return (
    <div className="main">
       <Navbar />
       <h1>Welcome</h1>
       <Footer />
    </div>
  );
}`,
    correctCode: `function PageLayout({ children }) {
  return (
    <div className="main">
       <Navbar />
       {children}
       <Footer />
    </div>
  );
}

function HomePage() {
  return <PageLayout><h1>Welcome</h1></PageLayout>;
}`,
    mistakes: [
      {
        id: "m-pat-layout",
        lineNumber: 3,
        message:
          "Repeating the Navbar and Footer manually on every page makes maintenance difficult.",
        severity: "info",
      },
    ],
    proTips: [
      "The 'children' prop is your most powerful tool for creating consistent UI shells and layouts.",
    ],
    hints: [
      "How can we avoid duplicating the header and footer code?",
      "What is the special prop React gives us for nested content?",
    ],
    explanation:
      "The `children` prop allows you to pass any JSX as content to another component. This is the foundation of 'Wrapper' components. It keeps your code DRY (Don't Repeat Yourself) by centralizing the structural code like layouts.",
  },
  {
    id: "pat8",
    slug: "spread-props-pollution",
    title: "The Spread Pollution",
    difficulty: "EASY",
    description: "Identify the danger of spreading all props onto a DOM element.",
    suboptimalCode: `function FancyInput(props) {
  return <input {...props} className="fancy" />;
}`,
    correctCode: `function FancyInput({ className, ...rest }) {
  return <input {...rest} className={"fancy " + className} />;
}`,
    mistakes: [
      {
        id: "m-pat-spread",
        lineNumber: 2,
        message:
          "Spreading unknown props can lead to invalid HTML attributes being added to the DOM (e.g., custom React props), causing console warnings and strange behavior.",
        severity: "warning",
      },
    ],
    proTips: [
      "Always 'destructure' the props you need and use the 'rest' operator for the ones you want to pass through.",
    ],
    hints: [
      "What happens to the 'className' if it's passed in both from props and manually?",
      "Check your browser's console for 'non-boolean attribute' warnings.",
    ],
    explanation:
      "When you use `{...props}`, every prop passed to the component is added as an attribute to the `input`. If you pass a prop like `isValid={true}`, the browser will receive `isvalid='true'`, which isn't a valid HTML attribute for an input. Destructuring specific props prevents this leakage.",
  },
  {
    id: "pat9",
    slug: "render-null-pattern",
    title: "The Nothing Pattern",
    difficulty: "EASY",
    description: "How do you correctly tell React to render nothing based on a condition?",
    suboptimalCode: `if (!isVisible) {
  return <div />;
}`,
    correctCode: `if (!isVisible) {
  return null;
}`,
    mistakes: [
      {
        id: "m-pat-null",
        lineNumber: 2,
        message:
          "Returning an empty div still adds a node to the DOM. If you want nothing to appear, return null.",
        severity: "info",
      },
    ],
    proTips: [
      "Returning null from a component is the standard way to hide it entirely from the DOM and performance calculations.",
    ],
    hints: [
      "What's the difference between an empty container and no container at all?",
      "How do you make a component 'disappear'?",
    ],
    explanation:
      "Returning `null` tells React to skip rendering this component tree entirely. Returning an empty `<div>` creates a node that occupies space in the memory and potentially affects CSS layouts like `:empty` or Flexbox spacing.",
  },
  {
    id: "pat10",
    slug: "destructuring-props-clean",
    title: "Clean Props Destructuring",
    difficulty: "EASY",
    description:
      "Identify why using 'props.variable' everywhere is considered less clean than destructuring.",
    suboptimalCode: `function User(props) {
  return <div>{props.firstName} {props.lastName}</div>;
}`,
    correctCode: `function User({ firstName, lastName }) {
  return <div>{firstName} {lastName}</div>;
}`,
    mistakes: [
      {
        id: "m-pat-destructure",
        lineNumber: 1,
        message:
          "Failing to destructure makes the component's signature unclear. You have to read the whole body to know what props are used.",
        severity: "info",
      },
    ],
    proTips: [
      "Destructuring in the function signature acts as documentation for anyone using the component.",
    ],
    hints: [
      "How can you tell, at a glance, what data this component needs?",
      "Think about readability.",
    ],
    explanation:
      "Destructuring props in the component arguments makes it immediately obvious what the component expects. It also reduces repetitive `props.` prefixing, making the code more concise and easier to follow.",
  },
  {
    id: "pat11",
    slug: "conditional-logical-and",
    title: "The Logical-AND Trap",
    difficulty: "EASY",
    description: "Why does {count && <List />} show a '0' on the screen when count is 0?",
    suboptimalCode: `const [items, setItems] = useState([]);
return (
  <div>
    {items.length && <List items={items} />}
  </div>
);`,
    correctCode: `return (
  <div>
    {items.length > 0 && <List items={items} />}
  </div>
);`,
    mistakes: [
      {
        id: "m-pat-zero",
        lineNumber: 4,
        message:
          "React will render the number 0 if it is the result of a logical expression. In JS, `0 && true` returns `0`.",
        severity: "warning",
      },
    ],
    proTips: [
      "Always turn your conditions into booleans (!!.length or > 0) to avoid rendering zero accidentally.",
    ],
    hints: [
      "What is the truthy/falsy value of 0 in JavaScript?",
      "How does React handle numbers in JSX?",
    ],
    explanation:
      "In JavaScript, `0 && anything` evaluates to `0`. Since `0` is a valid number, React renders it. By using `items.length > 0`, the expression evaluates to `false`, and React renders nothing.",
  },
  {
    id: "pat12",
    slug: "state-hook-extraction",
    title: "Extracting Logic",
    difficulty: "EASY",
    description: "Move the toggle logic into a reusable hook.",
    suboptimalCode: `function Component() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return <button onClick={toggle}>{on ? "Off" : "On"}</button>;
}`,
    correctCode: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(!on);
  return [on, toggle];
}

function Component() {
  const [on, toggle] = useToggle();
  return <button onClick={toggle}>{on ? "Off" : "On"}</button>;
}`,
    mistakes: [
      {
        id: "m-pat-hook",
        lineNumber: 1,
        message:
          "Keeping simple logic like 'toggle' inside every component leads to duplication across the project.",
        severity: "info",
      },
    ],
    proTips: [
      "Custom hooks are the best way to share logic between components WITHOUT sharing UI.",
    ],
    hints: [
      "How can we pack the 'on' state and its 'toggle' function into one unit?",
      "Think about logical reuse.",
    ],
    explanation:
      "Custom hooks allow you to extract component logic into reusable functions. This makes your main components cleaner and allows you to test the logic (like toggling) independently of the UI structure.",
  },
  {
    id: "pat13",
    slug: "prop-drilling-intro",
    title: "The Tunneling Effect",
    difficulty: "EASY",
    description: "Identify how 'prop drilling' makes the 'Midway' component harder to reuse.",
    suboptimalCode: `function App({ user }) {
  return <Midway user={user} />;
}
function Midway({ user }) {
  return <Profile user={user} />;
}`,
    correctCode: `// Use Composition to avoid drilling
function App({ user }) {
  return (
    <Midway>
      <Profile user={user} />
    </Midway>
  );
}
function Midway({ children }) {
  return <div>{children}</div>;
}`,
    mistakes: [
      {
        id: "m-pat-drill",
        lineNumber: 4,
        message:
          "The 'Midway' component has to accept and pass the 'user' prop even though it doesn't use it. This couples Midway to the User data structure.",
        severity: "warning",
      },
    ],
    proTips: [
      "Before reaching for Context to solve drilling, check if you can use 'Component Composition' (passing children or props as components).",
    ],
    hints: [
      "Does Midway actually need the user info?",
      "How can we 'hand' the Profile directly to the App?",
    ],
    explanation:
      "Prop drilling forces intermediate components to know about data they don't need. Composition allows the 'App' to decide what's inside 'Midway', keeping 'Midway' generic and decoupled from specific data types.",
  },
];
