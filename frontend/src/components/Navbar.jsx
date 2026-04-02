import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#007bff', color: 'white', padding: '16px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '26px', fontWeight: 'bold' }}>
          Pro-Tasker
        </Link>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Welcome, {user.name || 'User'}</span>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;