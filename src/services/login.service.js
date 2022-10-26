const LoginModel = require('../models/User');

const findUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await LoginModel.findOne({ where: { email } });

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