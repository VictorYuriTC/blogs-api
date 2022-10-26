const validateDisplayNameLength = (req, res, next) => {
  const { displayName } = req.body;
  const MIN_DISPLAY_LENGTH = 8;

  if (displayName.length < MIN_DISPLAY_LENGTH) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const isValidEmail = () => /\S+@\S+\.\S+/.test(email);
  
  if (!isValidEmail()) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  next();
};

const validatePasswordLength = (req, res, next) => {
  const { password } = req.body;

  const MIN_PASSWORD_LENGTH = 6;

  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

module.exports = {
  validateDisplayNameLength,
  validateEmail,
  validatePasswordLength,
};