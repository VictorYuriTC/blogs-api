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

module.exports = {
  addNewUserByEmail,
};