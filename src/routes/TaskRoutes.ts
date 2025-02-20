import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/TaskController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);
// router.get('/all', auth, getAllTasks);

router.post('/create', createTask);
router.get('/all', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
