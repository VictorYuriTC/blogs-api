const express = require('express');
const loginValidation = require('../middlewares/validations/login.validation');

const router = express.Router();

router.post(
  '/',
  loginValidation.validateLogin,
);

module.exports = router;