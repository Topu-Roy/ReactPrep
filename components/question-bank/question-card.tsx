"use client";

import { useState } from "react";
import { Bookmark, CheckCircle2, Eye, EyeOff, Lightbulb } from "lucide-react";
import type { Question, QuestionMistake } from "@/lib/data/types";
import { useQuestionProgress } from "@/lib/hooks/use-progress";
import { Button } from "../ui/button";
import { DifficultyBadge } from "./difficulty-badge";
import { SidebarContent } from "./sidebar-content";

interface QuestionCardProps {
  question: Question;
  highlightedCode: string; // Problem HTML
  highlightedSolution: string; // Solution HTML
}

export function QuestionCard({
  question,
  highlightedCode,
  highlightedSolution,
}: QuestionCardProps) {
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "pro-tips">("problem");
  const [showMistakes, setShowMistakes] = useState(false);
  const { isCompleted, toggleCompleted, isSaved, toggleSaved } = useQuestionProgress();

  const completed = isCompleted(question.id);
  const saved = isSaved(question.id);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:p-6 dark:border-gray-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={question.difficulty} />
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
              {question.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {question.description}
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            onClick={() => toggleSaved(question.id)}
            className={`flex-1 rounded-lg border p-2 transition-all sm:flex-initial ${
              saved
                ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950"
                : "border-gray-200 bg-white text-gray-400 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-900"
            }`}
          >
            <Bookmark className={`mx-auto h-5 w-5 sm:mx-0 ${saved ? "fill-current" : ""}`} />
          </button>
          <Button
            onClick={() => toggleCompleted(question.id)}
            variant={completed ? "outline" : "default"}
            className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-semibold transition-all sm:flex-initial sm:justify-start"
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? "Completed" : "Mark Done"}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col divide-y border-gray-200 lg:flex-row lg:divide-x lg:divide-y-0 dark:divide-gray-800">
        {/* Main Section (Code or Tips) */}
        <div className="flex-1 bg-gray-50/50 p-4 sm:p-6 dark:bg-gray-900/30">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-lg bg-gray-200/50 p-1 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab("problem")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "problem"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveTab("solution")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "solution"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Solution
              </button>
              <button
                onClick={() => setActiveTab("pro-tips")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "pro-tips"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                Pro Tips
              </button>
            </div>
            {activeTab === "problem" && (
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className="flex items-center gap-2 rounded px-2 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50 hover:underline dark:text-blue-400 dark:hover:bg-blue-900/30"
              >
                {showMistakes ? (
                  <EyeOff className="h-3.2 w-3.2" />
                ) : (
                  <Eye className="h-3.2 w-3.2" />
                )}
                {showMistakes ? "Hide Mistakes" : "Reveal Mistakes"}
              </button>
            )}
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-950">
            {activeTab === "pro-tips" ? (
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                  <Lightbulb className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Pro Tips for {question.title}</h3>
                </div>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {question.proTips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex gap-4 rounded-xl border border-blue-50 bg-blue-50/30 p-4 text-sm leading-relaxed text-gray-700 dark:border-blue-900/20 dark:bg-blue-900/10 dark:text-gray-300"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="custom-scrollbar relative overflow-x-auto p-3 font-mono text-xs leading-6 sm:p-4 sm:text-[13px]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: activeTab === "solution" ? highlightedSolution : highlightedCode,
                  }}
                  className="[&>pre]:bg-transparent! [&>pre]:p-0!"
                />

                {activeTab === "problem" &&
                  showMistakes &&
                  question.mistakes.map((mistake: QuestionMistake) => (
                    <div
                      key={mistake.id}
                      className="group/mistake pointer-events-none absolute right-0 left-0"
                      style={{
                        top: `calc(${mistake.lineNumber - 1} * 1.5rem + 1rem)`,
                        height: "1.5rem",
                      }}
                    >
                      <div
                        className={`pointer-events-auto h-full w-full border-b-2 border-dotted ${
                          mistake.severity === "error"
                            ? "border-rose-500/50 bg-rose-500/5 hover:bg-rose-500/10"
                            : mistake.severity === "warning"
                              ? "border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10"
                              : "border-blue-500/50 bg-blue-50/5 hover:bg-blue-50/10"
                        } relative transition-colors`}
                      >
                        {/* Tooltip on hover */}
                        <div className="pointer-events-none absolute bottom-full left-4 z-10 mb-2 w-64 rounded-lg border border-gray-800 bg-gray-900 p-2 text-[11px] text-white opacity-0 shadow-xl transition-opacity group-hover/mistake:opacity-100">
                          <div className="mb-1 flex items-center gap-2 font-bold">
                            <span
                              className={
                                mistake.severity === "error" ? "text-rose-400" : "text-amber-400"
                              }
                            >
                              {mistake.severity.toUpperCase()}
                            </span>
                            <span>Line {mistake.lineNumber}</span>
                          </div>
                          {mistake.message}
                          <div className="absolute top-full left-4 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full bg-white p-4 sm:p-6 lg:w-80 dark:bg-gray-950">
          {activeTab === "problem" && <SidebarContent type="hints" content={question.hints} />}
          {activeTab === "solution" && (
            <SidebarContent type="explanation" content={question.explanation} />
          )}
          {activeTab === "pro-tips" && (
            <SidebarContent type="explanation" content={question.explanation} />
          )}
        </div>
      </div>
    </div>
  );
}
