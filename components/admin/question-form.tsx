"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTopics } from "@/lib/hooks/use-questions";
import { createQuestionSchema, type CreateQuestionInput } from "@/lib/validations/questions.schema";

interface QuestionFormProps {
  defaultValues?: Partial<CreateQuestionInput>;
  onSubmit: (data: CreateQuestionInput) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function QuestionForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Create Question",
}: QuestionFormProps) {
  const router = useRouter();
  const { data: topics, isLoading: topicsLoading } = useTopics();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuestionInput>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      slug: "",
      title: "",
      difficulty: "EASY",
      description: "",
      correctCode: "",
      suboptimalCode: "",
      proTips: [],
      hints: [],
      explanation: "",
      topicId: "",
      mistakes: [],
      ...defaultValues,
    },
  });

  const {
    fields: mistakeFields,
    append: appendMistake,
    remove: removeMistake,
  } = useFieldArray({
    control,
    name: "mistakes",
  });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({
    control,
    name: "hints",
  });

  const {
    fields: tipFields,
    append: appendTip,
    remove: removeTip,
  } = useFieldArray({
    control,
    name: "proTips",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Question title" {...register("title")} />
              {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="question-slug" {...register("slug")} />
              {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="topicId">Topic</Label>
              <Controller
                name="topicId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={topicsLoading ? "Loading..." : "Select a topic"} />
                    </SelectTrigger>
                    <SelectContent>
                      {topics?.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.topicId && (
                <p className="text-destructive text-sm">{errors.topicId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty && (
                <p className="text-destructive text-sm">{errors.difficulty.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the question"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Code Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="suboptimalCode">Suboptimal Code</Label>
            <Textarea
              id="suboptimalCode"
              placeholder="The code with issues that needs improvement"
              rows={10}
              className="font-mono text-sm"
              {...register("suboptimalCode")}
            />
            {errors.suboptimalCode && (
              <p className="text-destructive text-sm">{errors.suboptimalCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="correctCode">Correct Code</Label>
            <Textarea
              id="correctCode"
              placeholder="The optimized/correct version of the code"
              rows={10}
              className="font-mono text-sm"
              {...register("correctCode")}
            />
            {errors.correctCode && (
              <p className="text-destructive text-sm">{errors.correctCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea
              id="explanation"
              placeholder="Detailed explanation of the solution"
              rows={5}
              {...register("explanation")}
            />
            {errors.explanation && (
              <p className="text-destructive text-sm">{errors.explanation.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mistakes Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Code Mistakes</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendMistake({ lineNumber: 1, message: "", severity: "error" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Mistake
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mistakeFields.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No mistakes added yet. Click &quot;Add Mistake&quot; to add one.
            </p>
          ) : (
            mistakeFields.map((field, index) => (
              <div key={field.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Line Number</Label>
                  <Input
                    type="number"
                    min="1"
                    {...register(`mistakes.${index}.lineNumber`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Controller
                    name={`mistakes.${index}.severity`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Message</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Error message" {...register(`mistakes.${index}.message`)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMistake(index)}
                    >
                      <Trash2 className="text-destructive h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Hints Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Hints</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHint({ value: "" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Hint
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {hintFields.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No hints added yet. Click &quot;Add Hint&quot; to add one.
            </p>
          ) : (
            hintFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input placeholder="Enter a hint" {...register(`hints.${index}.value`)} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeHint(index)}>
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Pro Tips Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pro Tips</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTip({ value: "" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tip
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {tipFields.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No tips added yet. Click &quot;Add Tip&quot; to add one.
            </p>
          ) : (
            tipFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input placeholder="Enter a pro tip" {...register(`proTips.${index}.value`)} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeTip(index)}>
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
