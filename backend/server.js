import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes  from  './routes/taskRoutes.js'

const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/projects/:projectId/tasks', taskRoutes)


app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});