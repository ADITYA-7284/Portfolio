// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const Message = require('./models/Message');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to MongoDB Atlas!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// // 1. Submit a message
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();

//     res.status(201).json({
//       success: true,
//       message: 'Message sent successfully!',
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error('Error saving message:', error);
//     res.status(500).json({ error: 'Failed to send message.' });
//   }
// });

// // 2. Fetch all messages (optional endpoint)
// app.get('/api/contact', async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch messages.' });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const Message = require('./models/Message');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to MongoDB Atlas!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes

// // 1. Submit a message
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Email and Message are mandatory
//     if (!email || !message) {
//       return res.status(400).json({ error: 'Email and message are required.' });
//     }

//     // Fallbacks if name or subject are not sent from frontend
//     const senderName = name && name.trim() !== '' ? name : email.split('@')[0];
//     const messageSubject = subject && subject.trim() !== '' ? subject : 'General Inquiry';

//     const newMessage = new Message({
//       name: senderName,
//       email,
//       subject: messageSubject,
//       message,
//     });

//     await newMessage.save();

//     console.log('New message saved to database:', newMessage);

//     return res.status(201).json({
//       success: true,
//       message: 'Message sent successfully!',
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error('Error saving message:', error);
//     return res.status(500).json({ error: 'Failed to send message.' });
//   }
// });

// // 2. Fetch all messages (for admin view/testing)
// app.get('/api/contact', async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     return res.status(200).json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return res.status(500).json({ error: 'Failed to fetch messages.' });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Message = require('./models/Message');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// 1. Visitor Tracking Endpoint
app.post('/api/visit', (req, res) => {
  res.status(200).json({ success: true, message: 'Visit logged' });
});

// 2. Submit Contact Message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Email and Message are required
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    // Fallback values for optional fields
    const senderName = name && name.trim() !== '' ? name : email.split('@')[0];
    const messageSubject = subject && subject.trim() !== '' ? subject : 'General Inquiry';

    const newMessage = new Message({
      name: senderName,
      email,
      subject: messageSubject,
      message,
    });

    await newMessage.save();

    console.log('New message saved to database:', newMessage);

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

// 3. Fetch All Messages
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});