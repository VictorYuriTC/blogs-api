const express = require('express');
const validateJWT = require('../middlewares/authentications/validateJWT');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.use(validateJWT);

router.get('/search?', postController.searchPostByContent);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePostById);

module.exports = router;