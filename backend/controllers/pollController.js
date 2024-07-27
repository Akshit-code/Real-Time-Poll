const Poll = require('../models/Poll');

// Create a new poll
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: 'Invalid poll data' });
    }
    const poll = new Poll({ question, options });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Vote in a poll
const votePoll = async (req, res) => {
  console.log("Req body", req.body);
  try {
    const { pollId } = req.params;
    const { option } = req.body;

    // Find the poll by ID
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Find the selected option by its ID
    const selectedOption = poll.options.id(option);
    if (!selectedOption) {
      return res.status(400).json({ message: 'Invalid option' });
    }

    // Increment the votes for the selected option
    selectedOption.votes += 1;
    await poll.save();

    // Emit the updated poll data to all connected clients
    req.app.get('io').emit('pollUpdated', poll);

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

module.exports = { createPoll, votePoll, getPollResults, getAllPolls, getPollById };