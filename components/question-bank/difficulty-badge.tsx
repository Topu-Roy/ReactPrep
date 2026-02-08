import { twMerge } from "tailwind-merge";
import type { Difficulty } from "@/lib/data/types";

type DifficultyBadgeProps = {
  difficulty: Difficulty;
  className?: string;
};

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  EASY: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  HARD: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={twMerge(
        "rounded-full border px-2 py-0.5 text-xs font-semibold",
        DIFFICULTY_STYLES[difficulty],
        className
      )}
    >
      {difficulty}
    </span>
  );
}
