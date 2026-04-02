const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const statusColors = {
    'To Do': '#ffc107',
    'In Progress': '#007bff',
    'Done': '#28a745'
  };

  return (
    <div className="card">
      <h4 style={{ marginBottom: '10px' }}>{task.title}</h4>
      
      {task.description && (
        <p style={{ marginBottom: '15px', color: '#555' }}>{task.description}</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <strong>Status: </strong>
          <span style={{ 
            color: statusColors[task.status], 
            fontWeight: 'bold' 
          }}>
            {task.status}
          </span>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={{ 
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: 'white'
          }}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button 
          onClick={() => onDelete(task._id)}
          className="btn btn-danger"
          style={{ padding: '8px 16px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;