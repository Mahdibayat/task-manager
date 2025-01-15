import 'reflect-metadata'; // Required for TypeORM
import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { Task } from './entities/Task'; // We'll create this next
import taskRoutes from './routes/TaskRoutes';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'mysql', // Replace with your database name
  synchronize: true, // Automatically create database tables (for development only)
  logging: false,
  entities: [Task], // Add your entities here
  subscribers: [],
  migrations: [],
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Task Manager API!');
});

app.use('/api', taskRoutes);

// Connect to the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to MySQL database');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Could not connect to the database', err));
