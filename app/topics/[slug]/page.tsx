// Add Link import
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionBankLayout } from "@/components/question-bank/question-bank-layout";
import { QuestionCard } from "@/components/question-bank/question-card";
import { QUESTIONS, TOPICS } from "@/lib/data/question-bank";
import { getHighlightedCode } from "@/lib/shiki";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TopicSlugPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  const questions = QUESTIONS[topic?.id ?? ""] ?? [];

  if (!topic) {
    notFound();
  }

  // Pre-highlight all codes on the server
  const questionsWithHighlight = await Promise.all(
    questions.map(async (q) => ({
      ...q,
      previewHtml: await getHighlightedCode(q.suboptimalCode, "tsx"),
      solutionHtml: await getHighlightedCode(q.correctCode, "tsx"),
    }))
  );

  return (
    <QuestionBankLayout>
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

      <div className="space-y-4">
        {questionsWithHighlight.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            highlightedCode={q.previewHtml}
            highlightedSolution={q.solutionHtml}
          />
        ))}
      </div>
    </QuestionBankLayout>
  );
}
