const express = require('express');
const userValidation = require('../middlewares/validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post(
  '/',
  userValidation.validateDisplayNameLength,
  userValidation.validateEmail,
  userValidation.validatePasswordLength,
  userController.addNewUserByEmail,
);

module.exports = router;