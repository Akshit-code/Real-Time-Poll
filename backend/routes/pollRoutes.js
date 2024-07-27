const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

// Create a new poll
router.post('/create', pollController.createPoll);

// Vote in a poll
router.post('/:pollId/vote', pollController.votePoll);

// Get Current Selected Poll
router.get("/:pollId", pollController.getPollById);

// Get poll results
router.get('/results/:pollId', pollController.getPollResults);

// Get All polls
router.get("/polllist", pollController.getAllPolls);

module.exports = router;
