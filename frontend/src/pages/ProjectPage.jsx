import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import InviteCollaborator from "../components/InviteCollaborator";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/tasks`),
      ]);

      const proj = projectRes.data;
      setProject(proj);
      setTasks(tasksRes.data);

      
      const currentUserId = proj.owner._id || proj.owner;
      setIsOwner(
        currentUserId.toString() === proj.owner.toString() ||
          currentUserId.toString() === proj.owner._id?.toString(),
      );
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await api.post(`/projects/${id}/tasks`, taskData);
      setTasks([...tasks, res.data]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
  try {
    
    await api.put(`/projects/${id}/tasks/${taskId}`, { status });
    
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === taskId ? { ...task, status } : task
      )
    );
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Failed to update task status');
  }
};

  const deleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/projects/${id}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const deleteProject = async () => {
    if (
      !window.confirm(
        "Delete this project and all tasks? This cannot be undone.",
      )
    )
      return;

    try {
      await api.delete(`/projects/${id}`);
      alert("Project deleted successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Only the project owner can delete this project.",
      );
    }
  };

  const handleInviteSuccess = () => {
    fetchProjectAndTasks();
  };

  if (loading) return <div className="container">Loading project...</div>;
  if (error)
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  if (!project) return <div className="container">Project not found</div>;

  return (
    <div className="container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>{project.name}</h1>
          {project.description && (
            <p style={{ color: "#555", marginTop: "8px" }}>
              {project.description}
            </p>
          )}
        </div>

        {/* Delete Button - Only show to Owner */}
        {isOwner && (
          <button
            onClick={deleteProject}
            className="btn btn-danger"
            style={{ padding: "12px 20px", fontSize: "16px" }}
          >
            Delete Project
          </button>
        )}
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <h3>Collaborators</h3>
        <p>
          <strong>Owner:</strong> {project.owner.name} ({project.owner.email})
        </p>

        {project.collaborators?.length > 0 ? (
          <div style={{ marginTop: "10px" }}>
            <strong>Collaborators:</strong>
            <ul style={{ marginTop: "8px" }}>
              {project.collaborators.map((collab) => (
                <li key={collab._id}>
                  {collab.name} ({collab.email})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No collaborators yet.</p>
        )}

        <InviteCollaborator
          projectId={id}
          onInviteSuccess={handleInviteSuccess}
        />
      </div>

      {/* Tasks Section */}
      <h2 style={{ margin: "30px 0 15px" }}>Tasks ({tasks.length})</h2>

      <TaskForm projectId={id} onTaskAdded={addTask} />

      {tasks.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px" }}>
          <p>No tasks yet. Add one above.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
