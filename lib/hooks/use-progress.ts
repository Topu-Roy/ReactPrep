"use client";

import { useEffect, useState } from "react";

interface ProgressState {
  completed: string[]; // Question IDs
  saved: string[]; // Question IDs
}

export function useQuestionProgress() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    completed: [],
    saved: [],
  });

  // Load from LocalStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary for hydration
    setMounted(true);
    const savedProgress = localStorage.getItem("react-prep-progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress) as ProgressState;
        setProgress(parsed);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to LocalStorage
  const updateProgress = (newState: ProgressState) => {
    setProgress(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("react-prep-progress", JSON.stringify(newState));
    }
  };

  const toggleCompleted = (id: string) => {
    const completed = progress.completed.includes(id)
      ? progress.completed.filter((i: string) => i !== id)
      : [...progress.completed, id];
    updateProgress({ ...progress, completed });
  };

  const toggleSaved = (id: string) => {
    const saved = progress.saved.includes(id)
      ? progress.saved.filter((i: string) => i !== id)
      : [...progress.saved, id];
    updateProgress({ ...progress, saved });
  };

  // Prevent hydration mismatch by returning empty state until mounted
  if (!mounted) {
    return {
      completedIds: [],
      savedIds: [],
      toggleCompleted: () => {
        /* no-op */
      },
      toggleSaved: () => {
        /* no-op */
      },
      isCompleted: () => false,
      isSaved: () => false,
    };
  }

  return {
    completedIds: progress.completed,
    savedIds: progress.saved,
    toggleCompleted,
    toggleSaved,
    isCompleted: (id: string) => progress.completed.includes(id),
    isSaved: (id: string) => progress.saved.includes(id),
  };
}
