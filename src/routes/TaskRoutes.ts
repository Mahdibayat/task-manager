import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/TaskController';

const router = express.Router();

router.post('/create', createTask);
router.get('/all', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
