const loginModel = require('../models/User');

const findUserByEmail = async (userEmail) => {
  const user = await loginModel.findOne({ where: { userEmail } });

  const userExist = () => user !== undefined
    && user !== null
    && user !== '';

  if (!userExist) {
    const error = { message: 'Invalid fields' };
    throw new Error(error);
  }
};

module.exports = {
  findUserByEmail,
};