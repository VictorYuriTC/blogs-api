const userService = require('../services/user.service');

const addNewUserByEmail = async (req, res) => {
  const newUser = req.body;
  const {
    status,
    message,
    token,
    user,
  } = await userService.addNewUserByEmail(newUser);

  if (!token) {
    return res.status(status).json({ message });
  }

  return res.status(status).json({ token, user });
};

const getAllUsers = async (req, res) => {
  const {
    status,
    allUsers,
  } = await userService.getAllUsers();

  return res.status(status).json(allUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    user,
    message,
  } = await userService.getUserById(id);

  if (!user) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(user);
};

module.exports = {
  addNewUserByEmail,
  getAllUsers,
  getUserById,
};