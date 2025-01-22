import { z } from 'zod';

// Schema for creating a task
export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description is too long'),
});

// Schema for updating a task
export const UpdateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title is too long')
      .optional(),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(500, 'Description is too long')
      .optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (v) => {
      return !(
        typeof v.completed === 'undefined' &&
        !v.description &&
        !v.title
      );
    },
    {
      message: 'need at least change one prop',
      path: [''],
    }
  );

// Schema for task ID (used in params)
export const TaskIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
});

// Type inference for TypeScript
export type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof UpdateTaskSchema>;
export type TaskIdSchema = z.infer<typeof TaskIdSchema>;
