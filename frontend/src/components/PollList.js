import React, { useState, useEffect } from 'react';
import { getPolls } from '../services/pollService';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/PollList.css';

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const history = useHistory();

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

  const handleCreatePoll = () => {
    history.push('/create');
  };

  return (
    <>
    <Navbar/>
    <div className="poll-list">
      <h2>Available Polls</h2>
      <button className="create-poll-button" onClick={handleCreatePoll}>Create Poll</button>
      <ul>
        {polls.map(poll => (
          <li key={poll._id}>
            <Link to={`/vote/${poll._id}`}>{poll.question}</Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default PollList;
