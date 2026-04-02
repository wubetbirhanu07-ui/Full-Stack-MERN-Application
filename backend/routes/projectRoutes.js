import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  createProject, 
  getMyProjects, 
  getProject, 
  deleteProject,
  inviteCollaborator 
} from '../controllers/projectController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createProject)
  .get(getMyProjects);

router.route('/:id')
  .get(getProject)
  .delete(deleteProject);

router.post('/:id/invite', inviteCollaborator);   

export default router;