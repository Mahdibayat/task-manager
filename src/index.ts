import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Task } from './entities/Task';
import taskRoutes from './routes/TaskRoutes';
import userRoutes from './routes/UserRoutes';
import { appEnv } from './utils/constant';

export const AppDataSource = new DataSource({
  type: 'mysql', // Database type
  host: appEnv.host, // Database host
  port: appEnv.db_port, // Database port
  username: appEnv.db_username, // Database username
  password: appEnv.db_pass, // Database password
  database: appEnv.db_name, // Database name
  synchronize: true, // Automatically synchronize database schema (for development only)
  logging: false, // Disable logging (or set to true for debugging)
  entities: [User, Task], // Add your entities here
  subscribers: [], // Add subscribers if needed
  migrations: [], // Add migrations if needed
});

const app = express();
const port = appEnv.app_port || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Task Manager API!');
});

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/task/', taskRoutes);

// Connect to the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to MySQL database');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Could not connect to the database', err));
