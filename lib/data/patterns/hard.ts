import { type Question } from "../types";

export const patternsHardQuestions: Question[] = [
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
  {
    id: "pat24",
    slug: "state-reducer-pattern",
    title: "The State Reducer",
    difficulty: "HARD",
    description:
      "Build a Toggle component that allows the consumer to provide a custom reducer to intercept and modify state changes.",
    suboptimalCode: `function Toggle({ onToggle }) {
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn(!on);
    onToggle(!on);
  };
}`,
    correctCode: `function Toggle({ reducer = defaultReducer }) {
  const [state, dispatch] = useReducer(reducer, { on: false });
  const toggle = () => dispatch({ type: "toggle" });
  
  return <button onClick={toggle}>{state.on ? "On" : "Off"}</button>;
}

// User can now provide their own reducer:
const userReducer = (state, action) => {
  if (action.type === 'toggle' && tooManyClicks) return state;
  return defaultReducer(state, action);
};`,
    mistakes: [
      {
        id: "m-pat-reducer-1",
        lineNumber: 1,
        message:
          "Standard toggles are 'take it or leave it'. If the user wants to say 'only toggle if X is true', they have to rebuild the whole component.",
        severity: "warning",
      },
    ],
    proTips: [
      "The State Reducer pattern is the ultimate 'Inversion of Control'. It allows the user to control the internal logic of your component without you having to add a thousand props.",
    ],
    hints: [
      "How can you let the user 'step in' between an action and a state update?",
      "Think about useReducer.",
    ],
    explanation:
      "The State Reducer pattern (popularized by Kent C. Dodds) allows consumers to pass in a `reducer` function. The component calls this reducer for every action, giving the user the power to 'veto' or 'modify' how the internal state changes based on their own external rules.",
  },
  {
    id: "pat25",
    slug: "prop-getters-pattern",
    title: "The Prop Getter",
    difficulty: "HARD",
    description:
      "Provide a 'getButtonProps' function that correctly merges the user's custom 'onClick' with the component's internal toggle logic.",
    suboptimalCode: `function Toggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  return { on, toggle };
}
// Usage: <button onClick={(e) => { toggle(); myFunc(e); }}>`,
    correctCode: `function Toggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  const getButtonProps = ({ onClick, ...rest } = {}) => ({
    onClick: (e) => {
      onClick?.(e);
      toggle();
    },
    'aria-pressed': on,
    ...rest
  });

  return { on, getButtonProps };
}`,
    mistakes: [
      {
        id: "m-pat-prop-merge",
        lineNumber: 1,
        message:
          "Manually merging helper functions and accessibility attributes like 'aria-pressed' is error-prone for the consumer. They might forget to call your internal logic.",
        severity: "warning",
      },
    ],
    proTips: [
      "Prop Getters ensure that users don't break your component's internal requirements while still having the freedom to add their own event handlers.",
    ],
    hints: [
      "How can you 'give' the user a set of props that already includes your logic?",
      "Think about a function that returns an object of props.",
    ],
    explanation:
      "Prop Getters are functions that return an object of props. Crucially, they take the user's props as an argument and 'compose' them with the internal ones. If the user passes an `onClick`, the getter runs BOTH the user's function and the component's internal logic.",
  },
  {
    id: "pat26",
    slug: "recursive-menu-pattern",
    title: "Infinite Nesting",
    difficulty: "HARD",
    description:
      "Build a Menu component that can render itself recursively to support infinite levels of nesting from a data object.",
    suboptimalCode: `function Menu({ items }) {
  return items.map(item => (
    <div>
      {item.name}
      {item.children && <SubMenu items={item.children} />}
    </div>
  ));
}`,
    correctCode: `function MenuItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <span onClick={() => setOpen(!open)}>{item.name}</span>
      {item.children && open && (
        <ul>
          {item.children.map(child => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}`,
    mistakes: [
      {
        id: "m-pat-recursive",
        lineNumber: 1,
        message:
          "Trying to manually create 'SubMenu1', 'SubMenu2' components is a dead end. React components can call themselves just like normal functions.",
        severity: "info",
      },
    ],
    proTips: [
      "Recursive components are perfect for tree-like data (File explorers, Comment threads, Nested categories).",
    ],
    hints: [
      "Can a component use itself in its own return statement?",
      "What is the 'base case' for your recursion (where does it stop)?",
    ],
    explanation:
      "A component can render itself. In this pattern, `MenuItem` maps through its children and renders more `MenuItem` components. The recursion stops automatically when an item has no `children` array.",
  },
  {
    id: "pat27",
    slug: "forwardref-hoc-boilerplate",
    title: "Ref-Safe HOC",
    difficulty: "HARD",
    description:
      "Fix this HOC so that 'ref' correctly points to the underlying InnerComponent, not the HOC wrapper.",
    suboptimalCode: `function withStyle(Inner) {
  return (props) => <div className="styled"><Inner {...props} /></div>;
}`,
    correctCode: `function withStyle(Inner) {
  const Wrapped = forwardRef((props, ref) => (
    <div className="styled">
      <Inner {...props} ref={ref} />
    </div>
  ));
  Wrapped.displayName = \`withStyle(\${Inner.displayName || Inner.name})\`;
  return Wrapped;
}`,
    mistakes: [
      {
        id: "m-pat-ref-lost",
        lineNumber: 1,
        message:
          "Standard HOCs 'swallow' the ref prop. If a consumer tries to use a ref on the styled component, they get the div (or null) instead of the component instance.",
        severity: "error",
      },
    ],
    proTips: [
      "Whenever you build an HOC, always use React.forwardRef and set a displayName for better debugging in React DevTools.",
    ],
    hints: [
      "Does 'props' include the 'ref' key in React?",
      "How do you 'forward' a prop that isn't in the props object?",
    ],
    explanation:
      "`ref` is a special prop in React, like `key`. It is not included in the `props` object passed to a component. To pass it through, you must use `forwardRef`, which provides the `ref` as a second argument to the component function.",
  },
  {
    id: "pat28",
    slug: "dependency-injection-context",
    title: "Dependency Injection",
    difficulty: "HARD",
    description:
      "Instead of hardcoding a 'fetch' call, use the Dependency Injection pattern to make this component testable with mock services.",
    suboptimalCode: `function UserAvatar({ id }) {
  const [url, setImg] = useState();
  useEffect(() => { 
    api.getUser(id).then(u => setImg(u.img)); 
  }, [id]);
}`,
    correctCode: `const ServiceContext = createContext({ api: defaultApi });

function UserAvatar({ id }) {
  const { api } = useContext(ServiceContext);
  // ... rest is same but uses the INJECTED api
}

// In tests:
<ServiceContext.Provider value={{ api: mockApi }}>
  <UserAvatar id={1} />
</ServiceContext.Provider>`,
    mistakes: [
      {
        id: "m-pat-di",
        lineNumber: 3,
        message:
          "Hardcoding global singleton services (like a direct 'api' import) makes it impossible to unit test the component in isolation without complex mocking libraries.",
        severity: "warning",
      },
    ],
    proTips: [
      "Use Context for 'Dependency Injection' of services like Analytics, API clients, or Theme engines to decouple components from their infrastructure.",
    ],
    hints: [
      "How can the component 'ask' for its API client rather than 'finding' it?",
      "Think about providing services from the top down.",
    ],
    explanation:
      "Dependency Injection (DI) is a pattern where a component receives its dependencies from the outside. In React, Context is the perfect 'Inversion of Control' container. It allows you to swap real services for mocks during testing or change providers based on the environment.",
  },
  {
    id: "pat29",
    slug: "action-bubbling-pattern",
    title: "Inversion of Action",
    difficulty: "HARD",
    description:
      "A nested 'Submit' button should notify the parent, but the parent wants to handle ALL actions (Delete, Save, Cancel) in one central function.",
    suboptimalCode: `<Child onSave={save} onDelete={del} onCancel={can} />`,
    correctCode: `function Parent() {
  const handleAction = (type, payload) => {
    switch(type) {
      case 'SAVE': ...
      case 'DELETE': ...
    }
  };
  return <Child onAction={handleAction} />;
}

// Inside Child: 
<button onClick={() => onAction('SAVE', data)}>Save</button>`,
    mistakes: [
      {
        id: "m-pat-action-bloat",
        lineNumber: 1,
        message:
          "Passing 10 different callback props to a child component makes the interface messy and hard to extend.",
        severity: "info",
      },
    ],
    proTips: [
      "The 'Action Bubbling' or 'Dispatch' pattern is inspired by Redux and allows for a single, extensible channel of communication between child and parent.",
    ],
    hints: [
      "How does an event system work?",
      "Can you pass a 'type' string instead of a new prop for every feature?",
    ],
    explanation:
      "By consolidating multiple events into a single `onAction` callback, you simplify the component's API. This is especially useful for complex UI pieces like Data Tables where there might be dozens of possible interactions (sort, filter, edit, delete).",
  },
  {
    id: "pat30",
    slug: "isomorphic-hook-pattern",
    title: "The Isomorphic Hook",
    difficulty: "HARD",
    description:
      "Identify why using 'window.innerWidth' directly in a custom hook causes hydration errors in Next.js/SSR.",
    suboptimalCode: `function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return isMobile;
}`,
    correctCode: `function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false); // Default for Server
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // ... add listener
  }, []);

  return isMobile;
}`,
    mistakes: [
      {
        id: "m-pat-ssr-window",
        lineNumber: 2,
        message:
          "The 'window' object doesn't exist on the server. Accessing it during the 'render' phase will crash the build or cause a hydration mismatch.",
        severity: "error",
      },
    ],
    proTips: [
      "Always initialize SSR-compatible hooks with a safe default value and move browser-only checks into a useEffect.",
    ],
    hints: [
      "Is there a window in Node.js?",
      "How do you make sure the server and client render the EXACT same HTML initially?",
    ],
    explanation:
      "For SEO and performance, SSR renders the HTML once on the server. If the server thinks it's 'Desktop' (false) but the client thinks it's 'Mobile' (true), the HTML will mismatch, and React will throw an error or re-render everything. Moving the check to `useEffect` ensures the client 'corrects' itself after the initial consistent render.",
  },
  {
    id: "pat31",
    slug: "proxy-component-wrapper",
    title: "The Proxy Pattern",
    difficulty: "HARD",
    description:
      "You need to add a specialized 'masking' logic to a third-party Input component WITHOUT modifying its source or breaking its existing props interface.",
    suboptimalCode: `// Just wrapping usually loses types or breaks refs
function MaskedInput(props) {
  return <ThirdPartyInput {...props} onChange={myMask(props.onChange)} />;
}`,
    correctCode: `const MaskedInput = forwardRef(({ onChange, ...props }, ref) => {
  const handleChange = (e) => {
    const maskedValue = applyMask(e.target.value);
    onChange({ ...e, target: { ...e.target, value: maskedValue } });
  };

  return <ThirdPartyInput {...props} ref={ref} onChange={handleChange} />;
});`,
    mistakes: [
      {
        id: "m-pat-proxy",
        lineNumber: 1,
        message:
          "Simply passing props through often fails to correctly wrap the internal event object, leading to bugs in the parent's form handlers.",
        severity: "warning",
      },
    ],
    proTips: [
      "The Proxy pattern allows you to 'intercept' a component's inputs or outputs while maintaining the exact same public API, making it a drop-in replacement.",
    ],
    hints: [
      "How do you intercept the 'onChange' event before it reaches the consumer?",
      "Make sure to keep the 'event' object structure intact.",
    ],
    explanation:
      "This pattern uses `forwardRef` and prop destructuring to intercept the `onChange` event. It applies logic (the mask) and then calls the original `onChange` with a modified event object, effectively 'tricking' the parent component into thinking the third-party input naturally behaves that way.",
  },
];
