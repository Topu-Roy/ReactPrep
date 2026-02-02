import { createHighlighter } from "shiki";
import type { Highlighter } from "shiki";

let highlighter: Highlighter;

export async function getHighlightedCode(code: string, lang = "tsx") {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "typescript", "javascript", "css", "html"],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
