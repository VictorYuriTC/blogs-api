const express = require('express');
const userValidation = require('../middlewares/validations/user.validation');

const router = express.Router();

router.post(
  '/',
  userValidation.validateDisplayNameLength,
  userValidation.validateEmail,
  userValidation.validatePasswordLength,
);

module.exports = router;