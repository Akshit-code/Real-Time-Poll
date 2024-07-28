import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (user) {
    history.push('/polllist');
  }
  
  return (
    <div className="homepage">
      <h1>Welcome to the Polling App</h1>
      <div className="auth-buttons">
        <button onClick={() => history.push('/signup')}>Sign Up</button>
        <button onClick={() => history.push('/login')}>Log In</button>
      </div>
    </div>
  );
};

export default HomePage;
