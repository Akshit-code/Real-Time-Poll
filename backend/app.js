const express = require('express');
const http = require("http");
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const pollRoutes = require('./routes/pollRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods:["GET", "POST"]
  }
});

app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/polls', pollRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Polling App');
});

// app.post('/api/polls/vote/:pollId', async (req, res) => {
//   try {
//     const { pollId } = req.params;
//     const { optionIndex } = req.body;

//     const poll = await Poll.findById(pollId);
//     if (!poll) {
//       return res.status(404).send('Poll not found');
//     }

//     poll.options[optionIndex].votes += 1;
//     await poll.save();

//     // Emit the updated poll data to all connected clients
//     io.emit('pollUpdated', poll);

//     res.status(200).json(poll);
//   } catch (error) {
//     console.error('Error voting on poll:', error);
//     res.status(500).send('Server error');
//   }
// });

// Listen for client connections
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// Database connection
mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Server startup
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});