import { type Question } from "../types";

export const hooksMediumQuestions: Question[] = [
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
];
