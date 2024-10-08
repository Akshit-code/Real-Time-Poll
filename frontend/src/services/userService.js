import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const API_URL = `${apiUrl}/api/users`; 

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
export const getUserCreatedPolls = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/created-polls`, {
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
export const getUserVotedPolls = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/voted-polls`, {
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
