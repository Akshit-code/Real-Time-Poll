import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const API_URL = `${apiUrl}/api/auth`;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      // Fetch user info if needed
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authToken]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      setAuthToken(token);
      setUser(user);
      // Optionally fetch user info and set it to user state
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (username, email, password) => {
    try {
      await axios.post(`${API_URL}/signup`, { username, email, password });
      // Optionally log in the user after signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
