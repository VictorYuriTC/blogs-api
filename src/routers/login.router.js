const express = require('express');

const router = express.Router();
const { validateLogin } = require('../middlewares/login.validation');

router.post('/', validateLogin);

module.exports = router;