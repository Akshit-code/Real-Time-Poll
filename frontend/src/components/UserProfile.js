import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserCreatedPolls, getUserVotedPolls } from '../services/userService';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(user.profilePicture || '');
  const [createdPolls, setCreatedPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    if (activeTab === 'created') {
      fetchCreatedPolls();
    } else if (activeTab === 'voted') {
      fetchVotedPolls();
    }
    // Cleanup function
    return () => {
      setCreatedPolls([]);
      setVotedPolls([]);
    };
  });

  const fetchCreatedPolls = async () => {
    try {
      const response = await getUserCreatedPolls(user._id);
      setCreatedPolls(response);
    } catch (error) {
      console.error('Error fetching created polls:', error);
    }
  };

  const fetchVotedPolls = async () => {
    try {
      const response = await getUserVotedPolls(user._id);
      setVotedPolls(response);
    } catch (error) {
      console.error('Error fetching voted polls:', error);
    }
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile">
      <div className="sidebar">
        <div className="profile-pic" style={{ backgroundImage: `url(${profilePic})` }}>
          {!profilePic && <div className="placeholder-pic" />}
        </div>
        <h3>{user.username}</h3>
        <input type="file" onChange={handleProfilePicUpload} style={{ display: 'none' }} id="profilePicInput" />
        <button onClick={() => document.getElementById('profilePicInput').click()}>
          Upload Profile Picture
        </button>
        <div className="profile-options">
          <button onClick={() => setActiveTab('created')}>Created Polls</button>
          <button onClick={() => setActiveTab('voted')}>Voted Polls</button>
        </div>
      </div>
      <div className="content">
        {activeTab === 'created' && (
          <div>
            <h2>Created Polls</h2>
            {createdPolls.length === 0 ? (
              <p>No polls created yet.</p>
            ) : (
              createdPolls.map((poll) => (
                <div key={poll._id} className="poll-item">
                  <h3>{poll.question}</h3>
                  {poll.options.map((option) => (
                    <div key={option._id}>
                      {option.text} - {option.votes} votes
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'voted' && (
          <div>
            <h2>Voted Polls</h2>
            {votedPolls.length === 0 ? (
              <p>No polls voted on yet.</p>
            ) : (
              votedPolls.map((poll) => (
                <div key={poll._id} className="poll-item">
                  <h3>{poll.question}</h3>
                  {poll.options.map((option) => (
                    <div key={option._id}>
                      {option.text} - {option.votes} votes
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
