"use client";

import { useRouter } from "next/navigation";
import { QuestionForm } from "@/components/admin/question-form";
import { useCreateQuestion } from "@/lib/hooks/use-questions";
import type { CreateQuestionInput } from "@/lib/validations/questions.schema";

export default function NewQuestionPage() {
  const router = useRouter();
  const createQuestion = useCreateQuestion();

  const handleSubmit = async (data: CreateQuestionInput) => {
    try {
      await createQuestion.mutateAsync(data);
      router.push("/admin/questions");
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Question</h1>
        <p className="text-muted-foreground">Add a new interview question to your platform.</p>
      </div>

      <QuestionForm
        onSubmit={handleSubmit}
        isSubmitting={createQuestion.isPending}
        submitLabel="Create Question"
      />
    </div>
  );
}
