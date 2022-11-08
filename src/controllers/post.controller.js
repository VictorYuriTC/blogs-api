const postService = require('../services/post.service');
const userService = require('../services/user.service');

const getAllPosts = async (req, res) => {
  const {
    status,
    allPosts,
  } = await postService.getAllPosts();

  const allPostsPromises = allPosts
    .map(async (post) => ({
        ...post.dataValues,
        user: (await userService.getUserById(post.userId)).user,
      }));

  const allPostsWithUsers = await Promise.all(allPostsPromises);

  return res.status(status).json(allPostsWithUsers);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    message,
    post,
  } = await postService.getPostById(id);

  if (!post) {
    return res.status(status).json({ message });
  }

  const { user } = await userService.getUserById(post.userId);

  const fullPost = {
    ...post.dataValues,
    user,
  };

  return res.status(status).json(fullPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  console.log(`It's all here: ${req.headers.authorization}`);

  const {
    status,
    message,
    deletedPost,
  } = await postService.deletePostById(id);

  if (!deletedPost) {
    return res.status(status).json({ message });
  }

  return res.status(status);
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
};