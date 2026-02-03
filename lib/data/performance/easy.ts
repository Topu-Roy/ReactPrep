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
];
