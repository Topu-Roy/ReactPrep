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
            className="mb-2 block text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to All Topics
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{topic.name}</h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{topic.description}</p>
        </div>
      </div>

      <QuestionList questions={HighlightedQuestionAndSolutions} />
    </>
  );
}
