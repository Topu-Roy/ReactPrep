import React from "react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { TOPICS } from "@/lib/data/question-bank";

interface QuestionBankLayoutProps {
  children: React.ReactNode;
}

export function QuestionBankLayout({ children }: QuestionBankLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col gap-8 overflow-y-auto border-r border-gray-200 p-6 dark:border-gray-800">
        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            React Prep
          </h2>
          <nav className="flex flex-col gap-1">
            <Link
              href="/topics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
            >
              <Icons.Layout className="h-4 w-4" />
              All Topics
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Topics
          </h2>
          <nav className="flex flex-col gap-1">
            {TOPICS.map((topic) => {
              const Icon =
                (Icons as unknown as Record<string, React.ElementType>)[topic.icon] ||
                Icons.HelpCircle;
              return (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                >
                  <Icon className="h-4 w-4" />
                  {topic.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
