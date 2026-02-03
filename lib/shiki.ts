import { createHighlighter } from "shiki";
import type { Highlighter } from "shiki";

const globalForShiki = globalThis as unknown as { highlighter: Highlighter };

let highlighter: Highlighter | undefined = globalForShiki.highlighter;

export async function getHighlightedCode(code: string, lang = "tsx") {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "typescript", "javascript", "css", "html"],
    });

    if (process.env.NODE_ENV !== "production") {
      globalForShiki.highlighter = highlighter;
    }
  }

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
