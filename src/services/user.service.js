const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const verifyNewEmailIsNotOnDatabase = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { status: 409, message: 'User already registered' };
  }

  const jwtConfig = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(
    { email },
    secret,
    jwtConfig,
  );

  return { status: 201, message: 'User successfully registered', token };
};

module.exports = {
  verifyNewEmailIsNotOnDatabase,
};