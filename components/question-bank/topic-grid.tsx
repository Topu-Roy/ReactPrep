import * as Icons from "lucide-react";
import Link from "next/link";
import { TOPICS } from "@/lib/data/question-bank";
import { ProgressBar } from "./progress-bar";

type TopicGridProps = {
  progress?: Record<string, number>;
};

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
            className="bg-card border-border hover:border-primary/50 group block rounded-xl border p-5 shadow-sm transition-all sm:p-6"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex items-center justify-center rounded-lg p-3 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                {topic.name}
              </h3>
            </div>

            <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">{topic.description}</p>

            <div className="space-y-2">
              <div className="text-muted-foreground flex justify-between text-xs font-medium tracking-wider uppercase">
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
