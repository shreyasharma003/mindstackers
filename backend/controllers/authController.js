const User = require('../models/User');
const jwtSign = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, location, skillsOffered, skillsWanted, availability, isPrivate } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' });
    const user = await User.create({ fullName, email, password, location, skillsOffered, skillsWanted, availability, isPrivate });
    const token = jwtSign(user);
    res.status(201).json({ token, user: { ...user.toObject(), password: undefined } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.isBanned) return res.status(403).json({ message: 'Account is banned' });
    const token = jwtSign(user);
    res.json({ token, user: { ...user.toObject(), password: undefined } });
  } catch (err) { next(err); }
};

exports.verify = async (req, res, next) => {
  try {
    // The auth middleware already verified the token and set req.user
    res.json({ user: req.user });
  } catch (err) { next(err); }
};
