const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const pollController = require('../controllers/pollController');

// Upload profile picture
// router.post('/:userId/profile-picture', authMiddleware, userController.uploadProfilePicture);

// Get polls created by the user
router.get('/:userId/created-polls', authMiddleware, pollController.getCreatedPollsByUser);

// Get polls voted by the user
router.get('/:userId/voted-polls', authMiddleware, pollController.getVotedPollsByUser);

module.exports = router;