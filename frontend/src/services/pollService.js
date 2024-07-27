import axios from 'axios';

const API_URL = 'http://localhost:3000/api/polls';

export const createPoll = async (pollData) => {
  return await axios.post(`${API_URL}/create`, pollData);
};

export const getPolls = async () => {
  return await axios.get(`${API_URL}/polllist`);
};

export const getPoll = async (pollId) => {
  return await axios.get(`${API_URL}/${pollId}`);
};

export const getPollResults = async (pollId) => {
  return await axios.get(`${API_URL}/results/${pollId}`);
};

export const castVote = async (pollId, optionId) => {
  return await axios.post(`${API_URL}/${pollId}/vote`, { option: optionId });
};
