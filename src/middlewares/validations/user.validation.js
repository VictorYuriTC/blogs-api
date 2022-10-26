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

module.exports = {
  validateDisplayNameLength,
  validateEmail,
};