const jwt = require('jsonwebtoken');
const userService = require('../../services/user.service');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const validateJWT = async (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (_e) {
    const error = new Error('Invalid token');
    throw error;
  }
};

module.exports = validateJWT;