import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="welcome-message">
          Welcome, {user.username}
        </div>
        <div className="nav-links">
          <button onClick={() => history.push('/profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;