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
    <div className="bg-card border-border mb-8 overflow-hidden rounded-2xl border shadow-sm">
      {/* Header */}
      <div className="border-border flex flex-col items-start justify-between gap-4 border-b p-4 sm:flex-row sm:items-center sm:p-6">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={question.difficulty} />
            <h2 className="text-foreground text-lg font-bold sm:text-xl">{question.title}</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{question.description}</p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            onClick={() => toggleSaved(question.id)}
            className={`flex-1 rounded-lg border p-2 transition-all sm:flex-initial ${
              saved
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
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
      <div className="border-border flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0">
        {/* Main Section (Code or Tips) */}
        <div className="bg-muted/30 flex-1 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("problem")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "problem"
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveTab("solution")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "solution"
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Solution
              </button>
              <button
                onClick={() => setActiveTab("pro-tips")}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "pro-tips"
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pro Tips
              </button>
            </div>
            {activeTab === "problem" && (
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className="text-primary hover:bg-primary/10 flex items-center gap-2 rounded px-2 py-1 text-xs font-bold transition-colors hover:underline"
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

          <div className="bg-card border-border relative overflow-hidden rounded-xl border shadow-inner">
            {activeTab === "pro-tips" ? (
              <div className="p-8">
                <div className="text-primary mb-6 flex items-center gap-3">
                  <Lightbulb className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Pro Tips for {question.title}</h3>
                </div>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {question.proTips.map((tip, index) => (
                    <li
                      key={index}
                      className="border-primary/20 bg-primary/5 text-foreground flex gap-4 rounded-xl border p-4 text-sm leading-relaxed"
                    >
                      <span className="bg-primary/20 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
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
                              : "border-primary/50 bg-primary/5 hover:bg-primary/10"
                        } relative transition-colors`}
                      >
                        {/* Tooltip on hover */}
                        <div className="bg-popover border-border text-popover-foreground pointer-events-none absolute bottom-full left-4 z-10 mb-2 w-64 rounded-lg border p-2 text-[11px] opacity-0 shadow-xl transition-opacity group-hover/mistake:opacity-100">
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
                          <div className="border-t-popover absolute top-full left-4 border-8 border-transparent"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="bg-card w-full p-4 sm:p-6 lg:w-80">
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
