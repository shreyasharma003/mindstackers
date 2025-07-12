const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id || req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isPrivate && (!req.user || req.user._id.toString() !== user._id.toString() && !req.user.isAdmin))
      return res.status(403).json({ message: 'Profile is private' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profilePhoto = `/uploads/${req.file.filename}`;
    delete updates.email; delete updates.password; delete updates.isAdmin; delete updates.isBanned;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) { next(err); }
};
