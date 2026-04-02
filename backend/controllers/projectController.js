import Project from '../models/Project.js';
import User from '../models/User.js';
import Task from '../models/Task.js';


export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      owner: req.user.id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    }).populate('owner', 'name email')
      .populate('collaborators', 'name email');

    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const inviteCollaborator = async (req, res) => {
  try {
    const { email } = req.body;
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Only owner can invite
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only project owner can invite collaborators' });
    }

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return res.status(404).json({ message: 'User with this email not found' });
    }

    // Can't invite self
    if (userToInvite._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot invite yourself' });
    }

    // Already invited?
    if (project.collaborators.includes(userToInvite._id)) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    project.collaborators.push(userToInvite._id);
    await project.save();

    res.json({ 
      message: `User ${userToInvite.name} invited successfully`,
      project 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('collaborators', 'name email');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const isOwner = project.owner._id.toString() === req.user.id;
    const isCollaborator = project.collaborators.some(c => c._id.toString() === req.user.id);

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only owner can delete project' });
    }

    await Task.deleteMany({ project: req.params.id });
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};