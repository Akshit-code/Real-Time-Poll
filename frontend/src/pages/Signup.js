import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(username, email, password);
    history.push('/login');
    // Optionally redirect or show a success message
  };

  return (
    <div className="signup-container">
      <AuthForm
        type="Signup"
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Signup;
