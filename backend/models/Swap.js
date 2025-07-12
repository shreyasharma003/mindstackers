const mongoose = require('mongoose');

const SwapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: { type: String, required: true },
  skillRequested: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' },
}, { timestamps: true });

module.exports = mongoose.model('Swap', SwapSchema); 