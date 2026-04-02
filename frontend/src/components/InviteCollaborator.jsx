import { useState } from 'react';
import api from '../services/api';

const InviteCollaborator = ({ projectId, onInviteSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await api.post(`/projects/${projectId}/invite`, { email });
      alert(res.data.message);
      setEmail('');
      if (onInviteSuccess) onInviteSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to invite user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>Invite Collaborator</h3>
      <form onSubmit={handleInvite} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          style={{ flex: 1 }}
          required
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Inviting...' : 'Invite'}
        </button>
      </form>
    </div>
  );
};

export default InviteCollaborator;