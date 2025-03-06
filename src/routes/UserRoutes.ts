import express from 'express';
import {
  registerUser,
  loginUser,
  getUserTasks,
  getUsers,
  assignTaskToUser,
} from '../controllers/UserController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/tasks', auth, getUserTasks);
router.get('/all', auth, getUsers);
router.post('/assignTask', auth, assignTaskToUser);

export default router;
