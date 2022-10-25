const validateLogin = (req, res, next) => {
  const doesEmailExist = req.body.email !== undefined
    && req.body.email !== null;

  const doesPasswordExist = req.body.password !== undefined
    && req.body.email !== null;

  if (!doesEmailExist || !doesPasswordExist) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = {
  validateLogin,
};