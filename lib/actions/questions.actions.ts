"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import {
  createQuestionSchema,
  questionIdSchema,
  updateQuestionSchema,
  type CreateQuestionInput,
  type UpdateQuestionInput,
} from "@/lib/validations/questions.schema";

export type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Get all questions with optional topic filter
 */
export async function getQuestions(topicId?: string) {
  try {
    const questions = await db.question.findMany({
      where: topicId ? { topicId } : undefined,
      include: {
        topic: true,
        mistakes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: questions };
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return { success: false, error: "Failed to fetch questions" };
  }
}

/**
 * Get a single question by ID
 */
export async function getQuestionById(id: string) {
  try {
    const validation = questionIdSchema.safeParse({ id });
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message };
    }

    const question = await db.question.findUnique({
      where: { id },
      include: {
        topic: true,
        mistakes: true,
      },
    });

    if (!question) {
      return { success: false, error: "Question not found" };
    }

    return { success: true, data: question };
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return { success: false, error: "Failed to fetch question" };
  }
}

/**
 * Create a new question
 */
export async function createQuestion(
  input: CreateQuestionInput
): Promise<ActionResponse<{ id: string }>> {
  try {
    const validation = createQuestionSchema.safeParse(input);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message };
    }

    const { mistakes, proTips, hints, ...questionData } = validation.data;

    const question = await db.question.create({
      data: {
        ...questionData,
        proTips: proTips.map((t) => t.value),
        hints: hints.map((h) => h.value),
        mistakes: {
          create: mistakes,
        },
      },
    });

    revalidatePath("/admin/questions");
    return { success: true, data: { id: question.id } };
  } catch (error) {
    console.error("Failed to create question:", error);
    return { success: false, error: "Failed to create question" };
  }
}

/**
 * Update an existing question
 */
export async function updateQuestion(
  input: UpdateQuestionInput
): Promise<ActionResponse<{ id: string }>> {
  try {
    const validation = updateQuestionSchema.safeParse(input);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message };
    }

    const { id, mistakes, proTips, hints, ...questionData } = validation.data;

    // Check if question exists
    const existingQuestion = await db.question.findUnique({
      where: { id },
    });

    if (!existingQuestion) {
      return { success: false, error: "Question not found" };
    }

    // Update question and replace mistakes
    await db.$transaction(async (tx) => {
      // Delete existing mistakes
      await tx.questionMistake.deleteMany({
        where: { questionId: id },
      });

      // Update question with new data
      await tx.question.update({
        where: { id },
        data: {
          ...questionData,
          proTips: proTips?.map((t) => t.value),
          hints: hints?.map((h) => h.value),
          mistakes: mistakes
            ? {
                create: mistakes,
              }
            : undefined,
        },
      });
    });

    revalidatePath("/admin/questions");
    revalidatePath(`/admin/questions/${id}/edit`);
    return { success: true, data: { id } };
  } catch (error) {
    console.error("Failed to update question:", error);
    return { success: false, error: "Failed to update question" };
  }
}

/**
 * Delete a question
 */
export async function deleteQuestion(id: string): Promise<ActionResponse<void>> {
  try {
    const validation = questionIdSchema.safeParse({ id });
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message };
    }

    await db.question.delete({
      where: { id },
    });

    revalidatePath("/admin/questions");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete question:", error);
    return { success: false, error: "Failed to delete question" };
  }
}

/**
 * Get all topics
 */
export async function getTopics() {
  try {
    const topics = await db.topic.findMany({
      orderBy: { name: "asc" },
    });

    return { success: true, data: topics };
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    return { success: false, error: "Failed to fetch topics" };
  }
}
