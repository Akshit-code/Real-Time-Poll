const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
  votedPolls: [{
    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
