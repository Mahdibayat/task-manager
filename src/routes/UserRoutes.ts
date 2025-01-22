import express from 'express';
import {
  registerUser,
  loginUser,
  getUserTasks,
} from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/tasks', getUserTasks);

export default router;
