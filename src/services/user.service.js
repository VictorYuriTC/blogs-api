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
  const allUsersWithPasswords = await User.findAll();
  const allUsers = allUsersWithPasswords
    .map((user) => ({ ...user.dataValues, password: undefined }));
  return { status: 200, message: 'All users found', allUsers };
};

const getUserById = async (id) => {
  const userWithPassword = await User.findByPk(id);

  if (!userWithPassword) {
    return { status: 404, message: 'User does not exist' };
  }

  const user = { ...userWithPassword.dataValues, password: undefined };
  return { status: 200, message: 'User found', user };
};

const deleteLoggedUserByEmailOnToken = async (email) => {
  const loggedUserData = await User.findOne({ where: { email } });
  await User.destroy({ where: { id: loggedUserData.dataValues.id } });
  console.log('Deleted userId: ', loggedUserData.dataValues.id);
  return { status: 204 };
};

module.exports = {
  addNewUserByEmail,
  getAllUsers,
  findUserByEmail,
  getUserById,
  deleteLoggedUserByEmailOnToken,
};