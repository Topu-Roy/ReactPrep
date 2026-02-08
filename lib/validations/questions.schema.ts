import { z } from "zod";

// Severity enum validation
export const severitySchema = z.enum(["warning", "error", "info"]);

// Difficulty enum validation
export const difficultySchema = z.enum(["EASY", "MEDIUM", "HARD"]);

// Question mistake schema
export const questionMistakeSchema = z.object({
  lineNumber: z.number().int().positive("Line number must be positive"),
  message: z.string().min(1, "Message is required"),
  severity: severitySchema,
});

// Create question schema
export const createQuestionSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  title: z.string().min(1, "Title is required"),
  difficulty: difficultySchema,
  description: z.string().min(1, "Description is required"),
  correctCode: z.string().min(1, "Correct code is required"),
  suboptimalCode: z.string().min(1, "Suboptimal code is required"),
  proTips: z.array(z.object({ value: z.string() })),
  hints: z.array(z.object({ value: z.string() })),
  explanation: z.string().min(1, "Explanation is required"),
  topicId: z.string().uuid("Invalid topic ID"),
  mistakes: z.array(questionMistakeSchema),
});

// Update question schema (all fields optional except id)
export const updateQuestionSchema = createQuestionSchema.partial().extend({
  id: z.string().uuid("Invalid question ID"),
});

// Question ID schema
export const questionIdSchema = z.object({
  id: z.string().uuid("Invalid question ID"),
});

// Topic schemas
export const createTopicSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateTopicSchema = createTopicSchema.partial().extend({
  id: z.string().uuid("Invalid topic ID"),
});

// Type exports
export type CreateQuestionInput = z.output<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
export type QuestionMistakeInput = z.infer<typeof questionMistakeSchema>;
export type CreateTopicInput = z.infer<typeof createTopicSchema>;
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;
