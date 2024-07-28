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
    if (!selectedOption) return;

    try {
      await castVote(pollId, selectedOption);
      alert('Vote cast successfully!');
      history.push(`/results/${pollId}`);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  const handleBackToPolls = () => {
    history.push('/polllist');
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="vote-poll">
      <h2>{poll.question}</h2>
      <div className="options">
        {poll.options.map((option, index) => (
          <div key={index} className="option">
            <label>
              <input
                type="radio"
                name="option"
                value={option._id}
                onChange={() => setSelectedOption(option._id)}
              />
              {option.text}
            </label>
          </div>
        ))}
      </div>
      <button className="vote-button" onClick={handleVote} disabled={!selectedOption}>
        Vote
      </button>
      <button className="back-button" onClick={handleBackToPolls}>
        Back to Available Polls
      </button>
    </div>
  );
};

export default VotePoll;
