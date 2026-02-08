import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionList } from "@/components/question-bank/question-list";
import { QUESTIONS, TOPICS } from "@/lib/data/question-bank";
import { getHighlightedQuestionAndSolutions } from "./getHighlightedQuestionWithSolutions";

export default async function TopicSlugPage({ params }: PageProps<"/topics/[slug]">) {
  return (
    <Suspense fallback={<ResponsiveQuestionSkeleton />}>
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

function ResponsiveQuestionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      {/* --- Header Section --- */}
      <div className="mb-10 flex flex-col gap-3">
        <Skeleton className="h-4 w-32" /> {/* Back Link */}
        <Skeleton className="h-10 w-3/4 sm:w-1/3" /> {/* Topic Title */}
        <Skeleton className="h-6 w-full sm:w-1/2" /> {/* Topic Description */}
      </div>

      <div className="space-y-6">
        {/* --- Filters (Responsive Flex) --- */}
        <div className="border-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-7 w-32" /> {/* Questions Count */}
          <Skeleton className="h-10 w-full max-w-[400px] rounded-lg" /> {/* Tabs */}
        </div>

        {/* --- Question Cards List --- */}
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm"
            >
              {/* Responsive Card Header */}
              <div className="border-border flex flex-col items-start justify-between gap-4 border-b p-4 sm:flex-row sm:items-center sm:p-6">
                <div className="w-full space-y-2 sm:flex-1">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-16 rounded-full" /> {/* Badge */}
                    <Skeleton className="h-7 w-1/2 min-w-[150px]" /> {/* Title */}
                  </div>
                  <Skeleton className="h-4 w-full max-w-md" /> {/* Description */}
                </div>

                {/* Buttons stack on mobile, horizontal on sm: */}
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Skeleton className="h-10 flex-1 rounded-lg sm:w-12 sm:flex-none" />
                  <Skeleton className="h-10 flex-1 rounded-lg sm:w-32 sm:flex-none" />
                </div>
              </div>

              {/* Main Body (Stacks on mobile, Sidebar on LG) */}
              <div className="border-border flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0">
                {/* Content Area */}
                <div className="bg-muted/30 flex-1 p-4 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-8 w-44 rounded-md" /> {/* Tab Switcher */}
                    <Skeleton className="h-4 w-20" /> {/* Hide/Show mistakes */}
                  </div>

                  {/* Mimicking Code/Pro-Tips Content */}
                  <div className="bg-card border-border space-y-4 rounded-xl border p-4 sm:p-8">
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <div className="space-y-2 pt-4">
                      <Skeleton className="h-4 w-[40%]" />
                      <Skeleton className="h-4 w-[60%]" />
                    </div>
                  </div>
                </div>

                {/* Sidebar (Full width on mobile, 320px on LG) */}
                <div className="bg-card w-full p-4 sm:p-6 lg:w-80">
                  <div className="h-full space-y-6 rounded-xl border p-6">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-md" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-3">
                          <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                          <div className="w-full space-y-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
