import { type Question } from "../types";

export const patternsMediumQuestions: Question[] = [
  {
    id: "pat14",
    slug: "compound-components-basics",
    title: "The Accordion Compound",
    difficulty: "MEDIUM",
    description:
      "Build an Accordion where the Header and Content communicate implicitly without passing 'isOpen' props to every child.",
    suboptimalCode: `function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return items.map((item, i) => (
    <div key={i}>
      <Header isOpen={openIndex === i} onToggle={() => setOpenIndex(i)} />
      {openIndex === i && <Content>{item.text}</Content>}
    </div>
  ));
}`,
    correctCode: `const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      {children}
    </AccordionContext.Provider>
  );
}

Accordion.Header = ({ index, children }) => {
  const { setOpenIndex } = useContext(AccordionContext);
  return <button onClick={() => setOpenIndex(index)}>{children}</button>;
};`,
    mistakes: [
      {
        id: "m-pat-compound-1",
        lineNumber: 1,
        message:
          "Manually mapping items and passing props creates a rigid structure. The user can't easily add extra divs or re-order elements without changing the Accordion code.",
        severity: "warning",
      },
    ],
    proTips: [
      "Compound components provide a declarative API that lets user have full control over the rendering order of child elements.",
    ],
    hints: [
      "How can the children 'know' about the active index without props?",
      "Think about Context for implicit state sharing.",
    ],
    explanation:
      "Compound components (like `<Accordion><Accordion.Header />...</Accordion>`) share state through a hidden Context. This makes the UI more flexible because the consumer can place the Header and Content anywhere in the tree without manually wiring up props.",
  },
  {
    id: "pat15",
    slug: "slot-pattern-card",
    title: "Slot-based Layout",
    difficulty: "MEDIUM",
    description:
      "Identify how 'slots' are cleaner than multiple boolean flags for a complex Card component.",
    suboptimalCode: `function Card({ showIcon, showFooter, title, body }) {
  return (
    <div className="card">
      {showIcon && <Icon />}
      <h1>{title}</h1>
      <p>{body}</p>
      {showFooter && <div className="footer">...</div>}
    </div>
  );
}`,
    correctCode: `function Card({ header, children, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}`,
    mistakes: [
      {
        id: "m-pat-slots",
        lineNumber: 1,
        message:
          "Using boolean flags (showIcon, showFooter) is limited. If the user wants a DIFFERENT icon or a button in the footer, you have to add more props.",
        severity: "info",
      },
    ],
    proTips: [
      "The Slot pattern (passing JSX as props) is the most flexible way to build reusable layout components like Cards and Modals.",
    ],
    hints: [
      "Instead of 'if show icon', why not let the user just PASS the icon?",
      "Think about inversion of control.",
    ],
    explanation:
      "Slots allow the consumer to decide exactly what goes into the 'header' or 'footer' areas. This is much more powerful than boolean flags because it supports any JSX, not just fixed elements managed by the Card.",
  },
  {
    id: "pat16",
    slug: "polymorphic-components-as",
    title: "The 'as' prop",
    difficulty: "MEDIUM",
    description:
      "How can you make a Button component that can also render as an <a> tag while keeping its styles?",
    suboptimalCode: `function Button({ isLink, href, children }) {
  if (isLink) return <a href={href} className="btn">{children}</a>;
  return <button className="btn">{children}</button>;
}`,
    correctCode: `function Button({ as: Component = 'button', ...props }) {
  return <Component className="btn" {...props} />;
}

// usage: <Button as="a" href="/home">Link</Button>`,
    mistakes: [
      {
        id: "m-pat-polymorphic",
        lineNumber: 1,
        message:
          "Using 'isLink' or similar flags leads to repetitive conditional logic as you add more tag types (e.g., span, div, Link).",
        severity: "info",
      },
    ],
    proTips: [
      "Polymorphic components use the 'as' prop to allow users to switch the underlying HTML element while retaining the component's design.",
    ],
    hints: [
      "Can you treat a primitive HTML tag name as a variable component in React?",
      "Look up 'Polymorphic Components' in TypeScript UI libraries.",
    ],
    explanation:
      "In React, a variable that holds a string (like `const Tag = 'div'`) can be used as a JSX component `<Tag />`. This 'as' prop pattern is the industry standard for UI libraries (like Radix or Shaden) to provide semantic flexibility.",
  },
  {
    id: "pat17",
    slug: "render-props-mouse",
    title: "Sharing Logic via Render Props",
    difficulty: "MEDIUM",
    description: "Identify the drawback of Render Props that Hooks eventually solved.",
    suboptimalCode: `<MouseTracker>
  {({ x, y }) => (
    <WindowTracker>
      {({ width }) => (
         <div>Pos: {x}, {y} | Size: {width}</div>
      )}
    </WindowTracker>
  )}
</MouseTracker>`,
    correctCode: `const { x, y } = useMouse();
const { width } = useWindowSize();
return <div>Pos: {x}, {y} | Size: {width}</div>;`,
    mistakes: [
      {
        id: "m-pat-wrapper-hell",
        lineNumber: 1,
        message:
          "Deeply nested render props create 'Wrapper Hell', making the component tree deep and the code hard to read.",
        severity: "warning",
      },
    ],
    proTips: [
      "Render props are still useful for sharing UI-coupled logic, but hooks are the primary choice for pure behavioral logic.",
    ],
    hints: [
      "Look at the indentation of the suboptimal code.",
      "Why would you want to avoid 'nesting' your logic?",
    ],
    explanation:
      "Render props were the primary way to share stateful logic before React 16.8. While powerful, they lead to a 'pyramid of doom' in your JSX. Hooks flattened this structure into a linear, readable sequence of function calls.",
  },
  {
    id: "pat18",
    slug: "error-boundary-pattern-basics",
    title: "Fault Tolerance",
    difficulty: "MEDIUM",
    description:
      "Where should you place an Error Boundary to prevent a single buggy widget from crashing your whole app?",
    suboptimalCode: `function App() {
  return (
    <ErrorBoundary>
       <SideBar />
       <BuggyChart />
    </ErrorBoundary>
  );
}`,
    correctCode: `function App() {
  return (
    <>
       <SideBar />
       <ErrorBoundary fallback={<ErrorMsg />}>
         <BuggyChart />
       </ErrorBoundary>
    </>
  );
}`,
    mistakes: [
      {
        id: "m-pat-error",
        lineNumber: 3,
        message:
          "Wrapping the entire app in one Error Boundary means if any tiny component fails, the whole screen goes blank or shows an error.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use granular Error Boundaries around high-risk sections (like Third-party charts or User-generated content) to keep the rest of the app functional.",
    ],
    hints: [
      "Do you want the Sidebar to disappear if the Chart crashes?",
      "Think about 'Graceful Degradation'.",
    ],
    explanation:
      "Error Boundaries catch errors in their child tree. By placing them around specific modules, you can 'isolate' crashes. The rest of the page stays interactive while the crashed component shows a nice fallback message.",
  },
  {
    id: "pat19",
    slug: "hoc-auth-redirect",
    title: "HOC for Protection",
    difficulty: "MEDIUM",
    description: "Create an HOC that redirects a user to /login if they are not authenticated.",
    suboptimalCode: `function ProfilePage() {
  if (!user) return <Redirect to="/login" />;
  return <div>Profile</div>;
}`,
    correctCode: `const withAuth = (Component) => (props) => {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  return <Component {...props} />;
};

export default withAuth(ProfilePage);`,
    mistakes: [
      {
        id: "m-pat-hoc-repeat",
        lineNumber: 1,
        message:
          "Manually checking 'if (!user)' in every private page component is repetitive and easy to forget.",
        severity: "info",
      },
    ],
    proTips: [
      "HOCs are great for cross-cutting concerns like Authentication, Logging, or Permission checks that apply to many components.",
    ],
    hints: [
      "How can we wrap a component in a 'security' layer?",
      "Think about a function that returns a component.",
    ],
    explanation:
      "A Higher-Order Component (HOC) is a function that takes a component and returns a new component with added logic. This allows you to centralize authentication checks in one place and simply 'decorate' your pages with `withAuth`.",
  },
  {
    id: "pat20",
    slug: "portal-pattern-tooltip",
    title: "Escaping the Overflow",
    difficulty: "MEDIUM",
    description:
      "A tooltip is being cut off by a 'overflow: hidden' container. How do you render it at the root of the document?",
    suboptimalCode: `function Tooltip({ text }) {
  return <div className="tooltip-popup">{text}</div>;
}`,
    correctCode: `function Tooltip({ text }) {
  return createPortal(
    <div className="tooltip-popup">{text}</div>,
    document.body
  );
}`,
    mistakes: [
      {
        id: "m-pat-portal",
        lineNumber: 1,
        message:
          "Rendering UI directly inside its parent DOM node is restricted by the parent's CSS (overflow, z-index, transform).",
        severity: "warning",
      },
    ],
    proTips: [
      "Use Portals for any UI that needs to visually 'stay on top' irrespective of the parent's layout constraints, like Modals, Tooltips, and Dropdowns.",
    ],
    hints: [
      "Is there a way to render a component's HTML outside of its React parent's HTML?",
      "Look up 'React Portals'.",
    ],
    explanation:
      "React Portals allow you to render the HTML of a component into a different part of the DOM (like `document.body`) while keeping its React-level logic (props, context, events) connected to its original parent.",
  },
  {
    id: "pat21",
    slug: "state-initializer-pattern",
    title: "The Reset Pattern",
    difficulty: "MEDIUM",
    description:
      "Allow a consumer to provide an 'initialCount' and also trigger a reset from the outside using a 'key'.",
    suboptimalCode: `function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  // User says: "When initialCount prop changes, state doesn't update!"
}`,
    correctCode: `// Use the 'key' prop in the parent:
<Counter key={id} initialCount={10} />

// Or implement an explicit reset state:
useEffect(() => {
  setCount(initialCount);
}, [initialCount]);`,
    mistakes: [
      {
        id: "m-pat-initial",
        lineNumber: 2,
        message:
          "useState only uses the 'initial' value once during the first mount. Changing the prop later will NOT update the state.",
        severity: "warning",
      },
    ],
    proTips: [
      "Giving a component a new 'key' prop is the fastest way to completely reset its state from the parent.",
    ],
    hints: [
      "Does useState re-run when props change?",
      "Think about how React uses 'key' to manage identity.",
    ],
    explanation:
      "If you want to 'reset' a component when data changes, the simplest way is to give it a `key` prop that corresponds to the data ID. When the key changes, React destroys the old component and creates a new one with the fresh initial state.",
  },
  {
    id: "pat22",
    slug: "control-props-pattern",
    title: "Hybrid Control",
    difficulty: "MEDIUM",
    description:
      "Build a Toggle that works internally by default but can be 'controlled' by the parent if needed.",
    suboptimalCode: `function Toggle({ on }) {
  // Always uses the 'on' prop, user can't toggle it internally.
}`,
    correctCode: `function Toggle({ on: controlledOn, onChange }) {
  const [internalOn, setInternalOn] = useState(false);
  const isControlled = controlledOn !== undefined;
  const on = isControlled ? controlledOn : internalOn;

  const toggle = () => {
    if (!isControlled) setInternalOn(!internalOn);
    onChange?.(!on);
  };
}`,
    mistakes: [
      {
        id: "m-pat-control",
        lineNumber: 1,
        message:
          "Many components are either completely uncontrolled or completely controlled. This makes them less flexible for different use cases.",
        severity: "info",
      },
    ],
    proTips: [
      "Control Props pattern is used by major UI libraries (like Material UI) to give users the choice between 'easy mode' (uncontrolled) and 'power mode' (controlled).",
    ],
    hints: [
      "How can you check if the parent passed an 'on' prop?",
      "Handle both internal and external state update logic.",
    ],
    explanation:
      "The Control Props pattern checks if a specific prop (like `on`) exists. If it does, the component yields all logic to the parent. If it doesn't, it uses its own `useState` to manage itself. This provides maximum flexibility.",
  },
  {
    id: "pat23",
    slug: "context-as-store",
    title: "Context as a Store",
    difficulty: "MEDIUM",
    description:
      "Identify how to pass both state and dispatch through Context for cleaner child component usage.",
    suboptimalCode: `<AuthContext.Provider value={{ user, login }}>`,
    correctCode: `const [state, dispatch] = useReducer(authReducer, { user: null });

return (
  <AuthContext.Provider value={{ state, dispatch }}>
    {children}
  </AuthContext.Provider>
);`,
    mistakes: [
      {
        id: "m-pat-context-store",
        lineNumber: 1,
        message:
          "Passing many individual functions (login, logout, update) makes the context value object bloated and hard to maintain.",
        severity: "info",
      },
    ],
    proTips: [
      "Combining useReducer with Context creates a powerful 'mini-Redux' pattern for managing global state without extra libraries.",
    ],
    hints: [
      "Which hook is better for complex state transitions than useState?",
      "How can you pass just ONE 'dispatch' function instead of 10 utility functions?",
    ],
    explanation:
      "Using `useReducer` with Context allows children to simply 'dispatch' actions. This keeps the child components clean of logic and centralizes all state change rules in a single 'reducer' function.",
  },
];
