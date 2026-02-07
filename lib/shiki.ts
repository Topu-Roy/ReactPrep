import { createHighlighter } from "shiki";
import type { Highlighter } from "shiki";

const globalForShiki = globalThis as unknown as { highlighter: Highlighter };

export async function getHighlighter(): Promise<Highlighter> {
  if (!globalForShiki.highlighter) {
    globalForShiki.highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "typescript", "javascript", "css", "html"],
    });
  }
  return globalForShiki.highlighter;
}

export async function getHighlightedCode(highlighter: Highlighter, code: string, lang = "tsx") {
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
