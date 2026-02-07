import { cacheLife } from "next/cache";
import { type Question } from "@/lib/data/types";
import { getHighlightedCode, getHighlighter } from "@/lib/shiki";

export async function getHighlightedQuestionAndSolutions(questions: Question[]) {
  "use cache";
  cacheLife("days");
  const highlighter = await getHighlighter(); // Initialize once

  // Pre-highlight all codes on the server
  const questionsAndSolutionsWithHighlight = await Promise.all(
    questions.map(async (q) => ({
      ...q,
      previewHtml: await getHighlightedCode(highlighter, q.suboptimalCode, "tsx"),
      solutionHtml: await getHighlightedCode(highlighter, q.correctCode, "tsx"),
    }))
  );

  return questionsAndSolutionsWithHighlight;
}
