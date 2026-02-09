"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuestionForm } from "@/components/admin/question-form";
import { useQuestion, useUpdateQuestion } from "@/lib/hooks/use-questions";
import type { CreateQuestionInput } from "@/lib/validations/questions.schema";

export function EditQuestionPage({ id }: { id: string }) {
  const router = useRouter();
  const { data: question, isLoading, error } = useQuestion(id);
  const updateQuestion = useUpdateQuestion();

  const handleSubmit = async (data: CreateQuestionInput) => {
    try {
      await updateQuestion.mutateAsync({ ...data, id });
      router.push("/admin/questions");
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4">
        {error ? `Failed to load question: ${error.message}` : "Question not found"}
      </div>
    );
  }

  // Transform question data for the form
  const defaultValues: Partial<CreateQuestionInput> = {
    slug: question.slug,
    title: question.title,
    difficulty: question.difficulty,
    description: question.description,
    correctCode: question.correctCode,
    suboptimalCode: question.suboptimalCode,
    proTips: question.proTips.map((v) => ({ value: v })),
    hints: question.hints.map((v) => ({ value: v })),
    explanation: question.explanation,
    topicId: question.topicId,
    mistakes: question.mistakes.map((m) => ({
      lineNumber: m.lineNumber,
      message: m.message,
      severity: m.severity,
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Question</h1>
        <p className="text-muted-foreground">Update the details of this interview question.</p>
      </div>

      <QuestionForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={updateQuestion.isPending}
        submitLabel="Update Question"
      />
    </div>
  );
}
