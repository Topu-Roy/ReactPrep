import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionList } from "@/components/question-bank/question-list";
import { QUESTIONS, TOPICS } from "@/lib/data/question-bank";
import { getHighlightedQuestionAndSolutions } from "./getHighlightedQuestionWithSolutions";

export default async function TopicSlugPage({ params }: PageProps<"/topics/[slug]">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopicSlugPageContent params={params} />
    </Suspense>
  );
}

async function TopicSlugPageContent({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  const questions = QUESTIONS[topic?.id ?? ""] ?? [];

  if (!topic) {
    notFound();
  }

  const HighlightedQuestionAndSolutions = await getHighlightedQuestionAndSolutions(questions);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <Link
            href="/topics"
            className="text-primary mb-2 block text-sm font-bold hover:underline"
          >
            ← Back to All Topics
          </Link>
          <h1 className="text-foreground text-4xl font-extrabold">{topic.name}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{topic.description}</p>
        </div>
      </div>

      <QuestionList questions={HighlightedQuestionAndSolutions} />
    </>
  );
}
