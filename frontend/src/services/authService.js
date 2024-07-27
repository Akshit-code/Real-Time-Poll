import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const signup = async (username, email, password) => {
  await axios.post(`${API_URL}/signup`, { username, email, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};
