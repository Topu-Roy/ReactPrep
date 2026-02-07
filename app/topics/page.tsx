import { TopicGrid } from "@/components/question-bank/topic-grid";

export default function TopicsPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-foreground mb-4 text-4xl font-extrabold">Master React Interviews</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Browse specialized topics, discover common pitfalls, and level up your engineering skills
          with interactive code snippets.
        </p>
      </div>

      <TopicGrid />
    </>
  );
}
