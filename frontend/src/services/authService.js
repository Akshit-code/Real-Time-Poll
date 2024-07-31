import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const API_URL = `${apiUrl}/api/users`; 

export const signup = async (username, email, password) => {
  await axios.post(`${API_URL}/signup`, { username, email, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};
