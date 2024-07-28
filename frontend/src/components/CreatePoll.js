import React, { useState } from 'react';
import { createPoll } from '../services/pollService';
import { useHistory } from 'react-router-dom';
import '../styles/CreatePoll.css';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const history = useHistory();

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedOptions = options.map(option => ({ text: option, votes: 0 }));
      const response = await createPoll({ question, options: formattedOptions });
      console.log('Poll created successfully:', response.data);
      // Handle successful poll creation (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error creating poll:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    history.push('/polllist');
  };

  return (
    <div className="create-poll">
      <h2>Create a New Poll</h2>
      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <div className="button-group">
        <button className="add-option-button" onClick={addOption}>Add Option</button>
        <button className="submit-button" onClick={handleSubmit}>Create Poll</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreatePoll;
