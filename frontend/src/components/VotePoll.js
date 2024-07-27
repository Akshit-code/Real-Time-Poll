import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPoll, castVote } from '../services/pollService';
import '../styles//VotePoll.css';

const VotePoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPoll(pollId);
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleVote = async () => {
    try {
      await castVote(pollId, selectedOption);
      alert('Vote cast successfully!');
      history.push(`/results/${pollId}`);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="vote-poll">
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((option) => (
          <li key={option._id}>
            <input
              type="radio"
              value={option._id}
              onChange={(e) => setSelectedOption(e.target.value)}
              name="pollOption"
            />
            {option.text}
          </li>
        ))}
      </ul>
      <button onClick={handleVote} disabled={!selectedOption}>Vote</button>
    </div>
  );
};

export default VotePoll;
