const express = require('express');
const userValidation = require('../middlewares/validations/user.validation');
const userController = require('../controllers/user.controller');
const validateJWT = require('../middlewares/authentications/validateJWT');

const router = express.Router();

router.post(
  '/',
  userValidation.validateDisplayNameLength,
  userValidation.validateEmail,
  userValidation.validatePasswordLength,
  userController.addNewUserByEmail,
);

router.use(validateJWT);

router.get(
  '/',
  userController.getAllUsers,
);

module.exports = router;