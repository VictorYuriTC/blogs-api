const loginService = require('../services/login.service');

const findUserByEmail = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const {
    status,
    message,
    token,
  } = await loginService.verifyEmailMatchesPassword(email, password);

  if (!token) {
    return res.status(status).json({ message });
  }

  return res.status(status).json({ token });
};

module.exports = {
  findUserByEmail,
};