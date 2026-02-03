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
];
