import React, { useEffect, useState } from 'react';
import { getPollResults } from '../services/pollService';
import { useParams } from 'react-router-dom';
import '../styles//PollResults.css';

const PollResults = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

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

    // Connect to Socket.IO server
    // const socket = io('http://localhost:5000');

    // socket.on('pollUpdated', (updatedPoll) => {
    //   if(updatedPoll._id === pollId) {
    //     setPoll(updatedPoll);
    //   }
    // });

    // // Cleanup on component unmount
    // return () => {
    //   socket.disconnect();
    // }
  }, [pollId]);

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Poll Results</h2>
      <h3>{poll.question}</h3>
      {poll.options.map((option, index) => (
        <div key={index}>
          <span>{option.text}</span>: <span>{option.votes}</span>
        </div>
      ))}
    </div>
  );
};

export default PollResults;
