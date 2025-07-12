const jwt = require('jsonwebtoken');
module.exports = (user) => {
  const secret = process.env.JWT_SECRET || 'supersecretkey123';
  return jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    secret,
    { expiresIn: '7d' }
  );
}; 