import React, { useEffect, useState } from 'react';
import { getPollResults } from '../services/pollService';
import { useParams, useHistory } from 'react-router-dom';
import '../styles//PollResults.css';

const PollResults = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const response = await getPollResults(pollId);
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll results:', error);
      }
    };

    fetchPollResults();
    
  }, [pollId]);

  if (!poll) return <div>Loading...</div>;

  const handleBackToPolls = () => {
    history.push('/polllist');
  };

  return (
    <div className="poll-results">
      <h2>Poll Results</h2>
      <h3>{poll.question}</h3>
      <div className="results">
        {poll.options.map((option, index) => (
          <div key={index} className="result">
            <span className="option-text">{option.text}</span>
            <span className="votes">{option.votes} votes</span>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToPolls}>
        Back to Available Polls
      </button>
    </div>
  );
};

export default PollResults;
