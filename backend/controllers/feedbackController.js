const Feedback = require('../models/Feedback');
const Swap = require('../models/Swap');

exports.createFeedback = async (req, res, next) => {
  try {
    const { swapId, toUser, rating, comment } = req.body;
    const swap = await Swap.findById(swapId);
    if (!swap || swap.status !== 'completed') return res.status(400).json({ message: 'Swap not completed' });
    const feedback = await Feedback.create({ swap: swapId, fromUser: req.user._id, toUser, rating, comment });
    swap.feedback = feedback._id;
    await swap.save();
    res.status(201).json(feedback);
  } catch (err) { next(err); }
};
