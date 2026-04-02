import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="card">
      <h3>{project.name}</h3>
      
      {project.description && (
        <p style={{ margin: '10px 0', color: '#555' }}>
          {project.description}
        </p>
      )}

      <div style={{ marginTop: '15px' }}>
        <Link 
          to={`/project/${project._id}`}
          className="btn btn-primary"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Open Project →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;