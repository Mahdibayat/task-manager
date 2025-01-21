import { Request, Response } from 'express';
import { getTaskRepository } from '../repositories/TaskRepository';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskIdSchema,
} from '../schemas/TaskSchema';

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await getTaskRepository().find();
    res.status(200).json(tasks); // Use res.json() to send the response
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Validate the request body
  const validationResult = CreateTaskSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.errors });
    return;
  }

  // If validation passes, create the task
  const { title, description } = validationResult.data;
  const task = getTaskRepository().create({ title, description });
  await getTaskRepository().save(task);
  res.status(201).json(task);
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Validate the request params
  const paramsValidation = TaskIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    res.status(400).json({ errors: paramsValidation.error.errors });
    return;
  }

  // Validate the request body
  const bodyValidation = UpdateTaskSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    res.status(400).json({ errors: bodyValidation.error.errors });
    return;
  }

  // If validation passes, update the task
  const { id } = paramsValidation.data;
  const { title, description, completed } = bodyValidation.data;
  const task = await getTaskRepository().findOneBy({ id });
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (completed !== undefined) task.completed = completed;

  await getTaskRepository().save(task);
  res.status(200).json(task);
  return;
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate the ID
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      res.status(400).json({ message: 'Invalid task ID' });
      return;
    }

    // Find the task
    const task = await getTaskRepository().findOneBy({ id: taskId });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Delete the task
    await getTaskRepository().remove(task);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};
