import { AppDataSource } from '../index';
import { Task } from '../entities/Task';

export const getTaskRepository = () => {
  return AppDataSource.getRepository(Task);
};
