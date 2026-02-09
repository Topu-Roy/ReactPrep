"use server";

import { getServerAuthSession } from "@/auth/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { QUESTIONS, TOPICS } from "@/lib/data/question-bank";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function withRetry<T>(fn: () => Promise<T>, operationName: string): Promise<T> {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(
        `[Attempt ${attempt}/${MAX_RETRIES}] ${operationName} failed. Retrying in ${RETRY_DELAY}ms...`
      );
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  throw lastError;
}

export async function seedDatabase() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized: Only admins can seed the database.",
    };
  }

  try {
    const start = performance.now();

    for (const topicData of TOPICS) {
      // Upsert Topic
      const topic = await withRetry(
        () =>
          db.topic.upsert({
            where: { slug: topicData.slug },
            update: {
              name: topicData.name,
              description: topicData.description,
            },
            create: {
              slug: topicData.slug,
              name: topicData.name,
              description: topicData.description,
            },
          }),
        `Upsert Topic: ${topicData.name}`
      );

      const questions = QUESTIONS[topicData.id];
      if (!questions || questions.length === 0) continue;

      for (const questionData of questions) {
        // Upsert Question
        const question = await withRetry(
          () =>
            db.question.upsert({
              where: { slug: questionData.slug },
              update: {
                title: questionData.title,
                difficulty: questionData.difficulty,
                description: questionData.description,
                correctCode: questionData.correctCode,
                suboptimalCode: questionData.suboptimalCode,
                proTips: questionData.proTips,
                hints: questionData.hints,
                explanation: questionData.explanation,
                topicId: topic.id,
              },
              create: {
                slug: questionData.slug,
                title: questionData.title,
                difficulty: questionData.difficulty,
                description: questionData.description,
                correctCode: questionData.correctCode,
                suboptimalCode: questionData.suboptimalCode,
                proTips: questionData.proTips,
                hints: questionData.hints,
                explanation: questionData.explanation,
                topicId: topic.id,
              },
            }),
          `Upsert Question: ${questionData.title}`
        );

        // Transaction for mistakes
        await withRetry(async () => {
          await db.$transaction(async (tx) => {
            // Delete existing
            await tx.questionMistake.deleteMany({
              where: { questionId: question.id },
            });

            // Create new
            if (questionData.mistakes.length > 0) {
              await tx.questionMistake.createMany({
                data: questionData.mistakes.map((mistake) => ({
                  questionId: question.id,
                  lineNumber: mistake.lineNumber,
                  message: mistake.message,
                  severity: mistake.severity,
                })),
              });
            }
          });
        }, `Update Mistakes for: ${questionData.title}`);
      }
    }

    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);

    revalidatePath("/admin/questions");
    revalidatePath("/questions");

    return {
      success: true,
      message: `Database seeded successfully in ${duration}s`,
    };
  } catch (error) {
    console.error("Seeding failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred during seeding",
    };
  }
}
