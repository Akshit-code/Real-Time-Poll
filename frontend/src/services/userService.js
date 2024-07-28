import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; // Base URL for user-related APIs

// Function to upload profile picture
export const uploadProfilePicture = async (userId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/${userId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch polls created by the user
export const getUserCreatedPolls = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}/created-polls`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching created polls:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch polls voted by the user
export const getUserVotedPolls = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}/voted-polls`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching voted polls:', error.response ? error.response.data : error.message);
    throw error;
  }
};
