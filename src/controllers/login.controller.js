const loginService = require('../services/login.service');

const findUserByEmail = async (req, res) => {
  const {
    email,
  } = req.body;

  const userData = await loginService.findUserByEmail(email);
  const {
    status,
    message,
  } = userData;

  res.status(status).json({ message });
};

module.exports = {
  findUserByEmail,
};