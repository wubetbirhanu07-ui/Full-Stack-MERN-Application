import { useState } from 'react';

const TaskForm = ({ projectId, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await onTaskAdded(formData);
      setFormData({ title: '', description: '', status: 'To Do' });
    } catch (err) {
      alert("Failed to add task");
    }
  };

  return (
    <div className="card">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
          required
        />
        
        <textarea
          placeholder="Task Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input"
          rows="2"
        />

        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '10px' }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;