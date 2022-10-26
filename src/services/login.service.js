const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  const doesUserExist = user !== undefined
    && user !== null
    && user !== '';

  if (!doesUserExist) {
    return { status: 400, message: 'Invalid fields' };
  }

  return { status: 200, message: 'Found', doesUserExist, user };
};

module.exports = {
  findUserByEmail,
};