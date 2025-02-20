import express from 'express';
import {
  registerUser,
  loginUser,
  getUserTasks,
  getUsers,
} from '../controllers/UserController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/tasks', auth, getUserTasks);
router.get('/all', auth, getUsers);

export default router;
