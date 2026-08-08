const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Anonymous',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      trim: true,
      default: 'No Subject',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Message', messageSchema);