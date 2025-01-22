import { Request, Response } from 'express';
import { getUserRepository } from '../repositories/UserRepository';
import { sendSuccessResponse, sendErrorResponse } from '../utils/apiResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await getUserRepository().findOneBy({ email });
    if (existingUser) {
      sendErrorResponse(res, 'User already exists', 400);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = getUserRepository().create({
      email,
      password: hashedPassword,
      name,
    });
    await getUserRepository().save(user);

    sendSuccessResponse(res, 'User registered successfully', user, 201);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while registering the user', 500);
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await getUserRepository().findOneBy({ email });
    if (!user) {
      sendErrorResponse(res, 'Invalid email or password', 401);
      return;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendErrorResponse(res, 'Invalid email or password', 401);
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    sendSuccessResponse(res, 'Login successful', { token });
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while logging in', 500);
  }
};

// Fetch tasks for a specific user
export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId; // Assuming you have middleware to attach the user ID to the request
    const user = await getUserRepository().findOne({
      where: { id: userId },
      relations: ['tasks'], // Load the tasks associated with the user
    });

    if (!user) {
      sendErrorResponse(res, 'User not found', 404);
      return;
    }

    sendSuccessResponse(res, 'Tasks fetched successfully', user.tasks);
  } catch (error) {
    sendErrorResponse(res, 'An error occurred while fetching tasks', 500);
  }
};
