import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:taskId')
  .put(updateTask)
  .delete(deleteTask);

export default router;