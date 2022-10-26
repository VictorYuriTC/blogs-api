const { User } = require('../models');
const { generateNewJWT } = require('../middlewares/authentications/generateJWT');

const addNewUserByEmail = async ({ email, displayName, password }) => {
  const user = await User.findOne({ where: { email } });

  const doesUserExist = user !== undefined
    && user !== null
    && user !== '';

  if (doesUserExist) {
    return { status: 409, message: 'User already registered' };
  }

  const newUser = await User.create({
    email, displayName, password,
  });

  const token = generateNewJWT(email);

  return { status: 201, message: 'User successfully registered', token, newUser };
};

module.exports = {
  addNewUserByEmail,
};