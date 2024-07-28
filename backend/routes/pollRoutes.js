const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

// Get All polls
router.get("/polllist", pollController.getAllPolls);

// Create a new poll (requires authentication)
router.post('/create', authMiddleware, pollController.createPoll);

// Vote in a poll (requires authentication)
router.post('/:pollId/vote', authMiddleware, pollController.votePoll);

// Get Current Selected Poll
router.get("/:pollId", pollController.getPollById);

// Get poll results
router.get('/results/:pollId', pollController.getPollResults);

module.exports = router;
