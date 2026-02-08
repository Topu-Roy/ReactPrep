"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/lib/data/types";
import { QuestionCard } from "./question-card";

type QuestionWithHighlight = Question & {
  previewHtml: string;
  solutionHtml: string;
};

type QuestionListProps = {
  questions: QuestionWithHighlight[];
};

export function QuestionList({ questions }: QuestionListProps) {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredQuestions = questions.filter((q) => {
    if (filter === "ALL") return true;
    return q.difficulty === filter;
  });

  return (
    <div className="space-y-6">
      <div className="border-border flex items-center justify-between border-b pb-6">
        <h2 className="text-foreground text-xl font-bold">
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
          <div className="border-border flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-20 text-center">
            <p className="text-muted-foreground text-lg font-medium">
              No questions found for this difficulty level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
