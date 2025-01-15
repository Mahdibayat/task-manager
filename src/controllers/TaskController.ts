import { Request, Response } from 'express';
import { getTaskRepository } from '../repositories/TaskRepository';

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = getTaskRepository().create({ title, description });
  await getTaskRepository().save(task);
  res.status(201).json(task);
};

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await getTaskRepository().find();
  res.status(200).json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await getTaskRepository().findOneBy({ id: parseInt(id) });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = completed;
  await getTaskRepository().save(task);
  res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await getTaskRepository().findOneBy({ id: parseInt(id) });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await getTaskRepository().remove(task);
  res.status(204).send();
};
