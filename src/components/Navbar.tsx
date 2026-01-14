import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const user = useSelector((state: RootState) => (state.auth as any).user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📝 BlogHub
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/create" className="nav-link nav-link-primary">+ Create Blog</Link>
              <div className="nav-user">
                <span className="nav-user-email">{user.email}</span>
                <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-link-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;