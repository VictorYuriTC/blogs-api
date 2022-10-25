const validateLogin = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  const isLoginValid = email !== undefined && password !== undefined;

  if (!isLoginValid) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = {
  validateLogin,
};