import * as Icons from "lucide-react";
import Link from "next/link";
import { TOPICS } from "@/lib/data/question-bank";
import { ProgressBar } from "./progress-bar";

interface TopicGridProps {
  // We can pass progress data here later
  progress?: Record<string, number>;
}

export function TopicGrid({ progress = {} }: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {TOPICS.map((topic) => {
        const Icon =
          (Icons as unknown as Record<string, React.ElementType>)[topic.icon] || Icons.HelpCircle;
        const topicProgress = progress[topic.id] || 0;

        return (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-950/30 dark:text-blue-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-white">
                {topic.name}
              </h3>
            </div>

            <p className="mb-6 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {topic.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium tracking-wider text-gray-400 uppercase">
                <span>Progress</span>
                <span>{topicProgress}%</span>
              </div>
              <ProgressBar progress={topicProgress} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
