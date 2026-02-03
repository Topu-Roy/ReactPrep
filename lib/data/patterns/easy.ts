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
];
