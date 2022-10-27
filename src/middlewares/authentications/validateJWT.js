const jwt = require('jsonwebtoken');
const userService = require('../../services/user.service');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userService.findUserByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  } 

  next();
};

module.exports = validateJWT;