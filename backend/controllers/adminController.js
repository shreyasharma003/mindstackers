const User = require('../models/User');
const Swap = require('../models/Swap');
const Announcement = require('../models/Announcement');
const fs = require('fs');
const path = require('path');

exports.banUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
    res.json(user);
  } catch (err) { next(err); }
};

exports.unbanUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true });
    res.json(user);
  } catch (err) { next(err); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { next(err); }
};

exports.getAllSwaps = async (req, res, next) => {
  try {
    const swaps = await Swap.find().populate('requester recipient');
    res.json(swaps);
  } catch (err) { next(err); }
};

exports.downloadLogs = async (req, res, next) => {
  try {
    const logPath = path.join(__dirname, '../logs/app.log');
    if (!fs.existsSync(logPath)) return res.status(404).json({ message: 'No logs found' });
    res.download(logPath);
  } catch (err) { next(err); }
};
