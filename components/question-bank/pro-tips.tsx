import { Lightbulb } from "lucide-react";

interface ProTipsProps {
  tips: string[];
}

export function ProTips({ tips }: ProTipsProps) {
  if (!tips.length) return null;

  return (
    <div className="h-full rounded-xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20">
      <div className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <Lightbulb className="h-5 w-5" />
        <h3 className="text-sm font-bold tracking-wider uppercase">Pro Tips</h3>
      </div>
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              {index + 1}
            </span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
