import React, { useState, useEffect } from 'react';
import { getPolls } from '../services/pollService';
import { Link } from 'react-router-dom';
import '../styles/PollList.css';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getPolls();
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="poll-list">
      <h2>Available Polls</h2>
      <ul>
        {polls.map(poll => (
          <li key={poll._id}>
            <Link to={`/vote/${poll._id}`}>{poll.question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;
