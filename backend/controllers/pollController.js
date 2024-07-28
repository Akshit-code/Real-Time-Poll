const mongoose = require('mongoose');
const Poll = require('../models/Poll');
const User = require('../models/User');

// Create a new poll
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const userId = req.userId;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: 'Invalid poll data' });
    }
    const poll = new Poll({ question, options });

    await User.findByIdAndUpdate(userId, { $push: { createdPolls: poll._id } });

    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Vote in a poll
const votePoll = async (req, res) => {
  console.log("Req body", req.body);
  console.log("Req UserID", req.userId);

  try {
    const { pollId } = req.params;
    let { option } = req.body;
    const userId = req.userId;

    // Convert pollId and option to ObjectId if they're valid
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      return res.status(400).json({ message: 'Invalid poll ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(option)) {
      return res.status(400).json({ message: 'Invalid option ID' });
    }

    const pollObjectId = new mongoose.Types.ObjectId(pollId);
    const optionObjectId = new mongoose.Types.ObjectId(option);

    // Find the poll by ID
    const poll = await Poll.findById(pollObjectId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Find the selected option by its ID
    const selectedOption = poll.options.id(optionObjectId);
    if (!selectedOption) {
      return res.status(400).json({ message: 'Invalid option' });
    }

    // Check if the user has already voted on this poll
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.votedPolls.includes(pollObjectId)) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }

    // Increment the votes for the selected option
    selectedOption.votes += 1;
    
    // Add the user's vote to the votes array
    poll.votes.push({ user: userId, option: option });
    await poll.save();

    // Update the user's votedPolls
    user.votedPolls.push(pollObjectId);
    await user.save();

    res.status(200).json(poll);
  } catch (err) {
    console.error('Error voting on poll:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get poll results
const getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find(); // Fetch all polls
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific poll
const getPollById = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all polls created by a user
const getCreatedPollsByUser = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the request (assumes authentication middleware)
    const user = await User.findById(userId).populate('createdPolls');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.createdPolls);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all polls voted on by a user
const getVotedPollsByUser = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the request (assumes authentication middleware)
    const user = await User.findById(userId).populate('votedPolls');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.votedPolls);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { createPoll, votePoll, getPollResults, getAllPolls, getPollById, getCreatedPollsByUser, getVotedPollsByUser };