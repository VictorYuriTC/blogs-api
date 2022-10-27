const { User } = require('../models');
const generateNewJWT = require('../middlewares/authentications/generateJWT');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

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

  const token = generateNewJWT({ email, displayName, password });

  return { status: 201, message: 'User successfully registered', token, newUser };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return { status: 200, message: 'All users found', allUsers };
};

module.exports = {
  addNewUserByEmail,
  getAllUsers,
  findUserByEmail,
};