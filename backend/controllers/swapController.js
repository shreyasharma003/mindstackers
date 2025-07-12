const Swap = require('../models/Swap');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

exports.createSwap = async (req, res, next) => {
  try {
    const { recipient, skillOffered, skillRequested, message } = req.body;
    if (recipient === req.user._id.toString()) return res.status(400).json({ message: 'Cannot swap with yourself' });
    const swap = await Swap.create({ requester: req.user._id, recipient, skillOffered, skillRequested, message });
    res.status(201).json(swap);
  } catch (err) { next(err); }
};

exports.getMySwaps = async (req, res, next) => {
  try {
    const swaps = await Swap.find({ $or: [{ requester: req.user._id }, { recipient: req.user._id }] })
      .populate('requester', 'fullName profilePhoto').populate('recipient', 'fullName profilePhoto');
    res.json(swaps);
  } catch (err) { next(err); }
};

exports.updateSwapStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });
    if (swap.recipient.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    swap.status = status;
    await swap.save();
    res.json(swap);
  } catch (err) { next(err); }
};
