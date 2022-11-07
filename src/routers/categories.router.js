const express = require('express');
const validateJWT = require('../middlewares/authentications/validateJWT');
const categoryController = require('../controllers/categories.controller');

const router = express.Router();

router.use(validateJWT);

router.post('/', categoryController.addNewCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;