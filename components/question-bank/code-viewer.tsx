import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { createHighlighter } from "shiki";
import type { QuestionMistake } from "@/lib/data/types";

interface CodeViewerProps {
  code: string;
  language?: string;
  showMistakes?: boolean;
  mistakes?: QuestionMistake[];
}

export async function CodeViewer({
  code,
  language = "tsx",
  showMistakes = false,
  mistakes = [],
}: CodeViewerProps) {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "typescript", "javascript", "css", "html"],
  });

  const html = highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-inner dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100/50 px-4 py-2 dark:border-gray-800 dark:bg-gray-800/50">
        <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
          {language}
        </span>
      </div>

      <div className="custom-scrollbar relative overflow-x-auto p-4 font-mono text-sm leading-6">
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="[&>pre]:bg-transparent! [&>pre]:p-0!"
        />

        {showMistakes &&
          mistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="pointer-events-none absolute right-0 left-0"
              style={{
                top: `calc(${mistake.lineNumber - 1} * 1.5rem + 1rem)`, // 1.5rem for 6 leading, 1rem for padding
                height: "1.5rem",
              }}
            >
              <div
                className={`pointer-events-auto h-full w-full cursor-help border-b-2 border-dotted ${
                  mistake.severity === "error"
                    ? "border-rose-500/50 bg-rose-500/5"
                    : mistake.severity === "warning"
                      ? "border-amber-500/50 bg-amber-500/5"
                      : "border-blue-500/50 bg-blue-50/5"
                } `}
                title={mistake.message}
              >
                <div className="absolute left-1 flex h-full items-center">
                  {mistake.severity === "error" ? (
                    <AlertCircle className="h-3 w-3 text-rose-500" />
                  ) : mistake.severity === "warning" ? (
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                  ) : (
                    <Info className="h-3 w-3 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
