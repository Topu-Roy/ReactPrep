import { twMerge } from "tailwind-merge";

type ProgressBarProps = {
  progress: number; // 0 to 100
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={twMerge("bg-muted h-2 w-full overflow-hidden rounded-full", className)}>
      <div
        className="bg-primary h-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
