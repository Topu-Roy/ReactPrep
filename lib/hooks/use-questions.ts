"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  getTopics,
  updateQuestion,
} from "@/lib/actions/questions.actions";
import type { CreateQuestionInput, UpdateQuestionInput } from "@/lib/validations/questions.schema";

// Query keys
export const questionKeys = {
  all: ["questions"] as const,
  lists: () => [...questionKeys.all, "list"] as const,
  list: (topicId?: string) => [...questionKeys.lists(), { topicId }] as const,
  details: () => [...questionKeys.all, "detail"] as const,
  detail: (id: string) => [...questionKeys.details(), id] as const,
};

export const topicKeys = {
  all: ["topics"] as const,
};

/**
 * Hook to fetch all questions with optional topic filter
 */
export function useQuestions(topicId?: string) {
  return useQuery({
    queryKey: questionKeys.list(topicId),
    queryFn: async () => {
      const result = await getQuestions(topicId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data ?? [];
    },
  });
}

/**
 * Hook to fetch a single question by ID
 */
export function useQuestion(id: string) {
  return useQuery({
    queryKey: questionKeys.detail(id),
    queryFn: async () => {
      const result = await getQuestionById(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data ?? null;
    },
    enabled: !!id,
  });
}

/**
 * Hook to fetch all topics
 */
export function useTopics() {
  return useQuery({
    queryKey: topicKeys.all,
    queryFn: async () => {
      const result = await getTopics();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data ?? [];
    },
  });
}

/**
 * Hook to create a new question
 */
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateQuestionInput) => {
      const result = await createQuestion(input);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
}

/**
 * Hook to update an existing question
 */
export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateQuestionInput) => {
      const result = await updateQuestion(input);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: questionKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: questionKeys.detail(variables.id),
        }),
      ]);
    },
  });
}

/**
 * Hook to delete a question
 */
export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteQuestion(id);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: questionKeys.lists() });
    },
  });
}
