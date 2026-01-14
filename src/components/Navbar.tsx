import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/create" style={{ marginLeft: '1rem' }}>Create Blog</Link>
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
          <Link to="/register" style={{ marginLeft: '1rem' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;