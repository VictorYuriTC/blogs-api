const loginService = require('../services/login.service');

const findUserByEmail = async (req, res) => {
  try {
    const {
      user,
      status,
    } = await loginService.findUserByEmail();
 
    return res.status(status).json({ user });
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

module.exports = {
  findUserByEmail,
};