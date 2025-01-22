import { AppDataSource } from '../index';
import { User } from '../entities/User';

export const getUserRepository = () => {
  return AppDataSource.getRepository(User);
};
