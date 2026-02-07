import { TopicGrid } from "@/components/question-bank/topic-grid";

export default function TopicsPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          Master React Interviews
        </h1>
        <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          Browse specialized topics, discover common pitfalls, and level up your engineering skills
          with interactive code snippets.
        </p>
      </div>

      <TopicGrid />
    </>
  );
}
