const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  const userExist = () => user !== null;

  if (!userExist) {
    return { status: 400, message: 'Invalid fields' };
  }

  return { status: 200, message: 'Found' };
};

module.exports = {
  findUserByEmail,
};