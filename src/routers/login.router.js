const express = require('express');
const loginValidation = require('../middlewares/validations/login.validation');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post(
  '/',
  loginValidation.validateLogin,
  loginController.findUserByEmail,
);

module.exports = router;