"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/lib/data/types";
import { QuestionCard } from "./question-card";

interface QuestionWithHighlight extends Question {
  previewHtml: string;
  solutionHtml: string;
}

interface QuestionListProps {
  questions: QuestionWithHighlight[];
}

export function QuestionList({ questions }: QuestionListProps) {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredQuestions = questions.filter((q) => {
    if (filter === "ALL") return true;
    return q.difficulty === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-6 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Questions ({filteredQuestions.length})
        </h2>
        <Tabs value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList>
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="EASY">Easy</TabsTrigger>
            <TabsTrigger value="MEDIUM">Medium</TabsTrigger>
            <TabsTrigger value="HARD">Hard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              highlightedCode={q.previewHtml}
              highlightedSolution={q.solutionHtml}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center dark:border-gray-800">
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
              No questions found for this difficulty level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
