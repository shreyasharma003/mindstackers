const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.create({ title, message, createdBy: req.user._id });
    res.status(201).json(announcement);
  } catch (err) { next(err); }
};

exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('createdBy', 'fullName');
    res.json(announcements);
  } catch (err) { next(err); }
};
