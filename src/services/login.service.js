const { User } = require('../models');
const { generateNewJWT } = require('../middlewares/authentications/generateJWT'); 

const verifyEmailMatchesPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  const doesUserExist = user !== undefined
    && user !== null
    && user !== '';

  if (!doesUserExist) {
    return { status: 400, message: 'Invalid fields' };
  }

  const token = generateNewJWT(email);

  return { status: 200, message: 'Valid fields', token };
};

module.exports = {
  verifyEmailMatchesPassword,
};