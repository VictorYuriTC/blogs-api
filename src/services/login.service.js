const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const verifyEmailMatchesPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  const doesUserExist = user !== undefined
    && user !== null
    && user !== '';

  if (!doesUserExist) {
    return { status: 400, message: 'Invalid fields' };
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

  return { status: 200, message: 'Valid fields', token };
};

module.exports = {
  verifyEmailMatchesPassword,
};