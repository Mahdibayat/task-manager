import { Request, Response } from 'express';
import { getTaskRepository } from '../repositories/TaskRepository';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskIdSchema,
} from '../schemas/TaskSchema';
import {
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationErrorResponse,
} from '../utils/apiResponse';

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await getTaskRepository().find();
    sendSuccessResponse(res, 'Tasks fetched successfully', tasks);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while fetching tasks', 500);
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate the request body
    const validationResult = CreateTaskSchema.safeParse(req.body);
    if (!validationResult.success) {
      sendValidationErrorResponse(res, validationResult.error);
      return;
    }

    // If validation passes, create the task
    const { title, description } = validationResult.data;
    const task = getTaskRepository().create({ title, description });
    await getTaskRepository().save(task);
    sendSuccessResponse(res, 'Task created successfully', task, 201);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while creating the task', 500);
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate the request params
    const paramsValidation = TaskIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      sendValidationErrorResponse(res, paramsValidation.error);
      return;
    }

    // Validate the request body
    const bodyValidation = UpdateTaskSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      sendValidationErrorResponse(res, bodyValidation.error);
      return;
    }

    // If validation passes, update the task
    const { id } = paramsValidation.data;
    const { title, description, completed } = bodyValidation.data;
    const task = await getTaskRepository().findOneBy({ id });
    if (!task) {
      sendErrorResponse(res, 'Task not found', 404);
      return;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await getTaskRepository().save(task);
    sendSuccessResponse(res, 'Task updated successfully', task);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while updating the task', 500);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate the request params
    const validationResult = TaskIdSchema.safeParse(req.params);
    if (!validationResult.success) {
      sendValidationErrorResponse(res, validationResult.error);
      return;
    }

    // If validation passes, delete the task
    const { id } = validationResult.data;
    const task = await getTaskRepository().findOneBy({ id });
    if (!task) {
      sendErrorResponse(res, 'Task not found', 404);
      return;
    }

    await getTaskRepository().remove(task);
    sendSuccessResponse(res, 'Task deleted successfully', null, 204);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while deleting the task', 500);
  }
};
