import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
  const { user } = useAuth();           // Get auth context
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setError('');
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      const res = await api.post('/projects', newProject);
      setProjects([res.data, ...projects]);   // Add new project at top
      setNewProject({ name: '', description: '' });
      setShowForm(false);
      alert("Project created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project');
    }
  };

  if (loading) {
    return <div className="container">Loading projects...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Projects</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          + New Project
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && (
        <div className="card">
          <form onSubmit={createProject}>
            <input
              type="text"
              placeholder="Project Name *"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="form-input"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="form-input"
              rows="3"
            />
            <div style={{ marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                Create Project
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No projects yet</h3>
          <p>Create your first project using the button above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;