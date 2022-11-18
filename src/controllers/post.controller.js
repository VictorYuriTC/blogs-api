const postService = require('../services/post.service');
const userService = require('../services/user.service');
const categoriesService = require('../services/categories.service');

const getAllPosts = async (req, res, _next) => {
  const {
    status,
    allPosts,
  } = await postService.getAllPosts();

  const { allCategories } = (await categoriesService.getAllCategories());

  const allPostsPromises = allPosts
    .map(async (post) => {
      const { user } = await userService.getUserById(post.userId);
        return {
          ...post.dataValues,
          user,
          categories: allCategories,
        };
      });

  const allPostsWithUsersAndCategories = await Promise.all(allPostsPromises);

  console.log(allPostsWithUsersAndCategories);

  return res.status(status).json(allPostsWithUsersAndCategories);
};

const getPostById = async (req, res, _next) => {
  const { id } = req.params;
  const { status, message, post } = await postService.getPostById(id);

  if (!post) {
    return res.status(status).json({ message });
  }
  const { user } = await userService.getUserById(post.userId);
  const { allCategories } = await categoriesService.getAllCategories();

  const categories = allCategories.map(({ dataValues }) => dataValues);

  const fullPost = {
    ...post.dataValues,
    user,
    categories,
  };

  console.log(fullPost);
  
  return res.status(status).json(fullPost);
};

const deletePostById = async (req, res, _next) => {
  const { id } = req.params;

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

const searchPostByContent = async (req, res, _next) => {
  const { q } = req.query;

  const {
    status,
    message,
    postData,
  } = await postService.searchPostByContent(q);

  if (!postData) {
    return res.status(status).json({ message });
  }
  
  const post = postData;
  const { user } = await userService.getUserById(1);

  const fullPost = { post, user };
  console.log(fullPost);

  return res.status(status).json(fullPost);
};

const updatePostByTitleContentAndId = async (req, res, _next) => {
  const { id } = req.params;
  const dataToBeUpdated = { ...req.body, id };

  const { status, message, wasPostUpdated } = await postService
    .updatePostByTitleContentAndId(dataToBeUpdated);

  if (!wasPostUpdated) return res.status(status).json({ message });
  
  const { post } = await postService.getPostById(id);
  const updatedPost = post.dataValues;

  const { user } = await userService.getUserById(updatedPost.userId);

  const { allCategories } = await categoriesService.getAllCategories();

  console.log('Post was successfully updated: ', wasPostUpdated);
  
  const fullUpdatedPost = { ...updatedPost, user, categories: [allCategories[0].dataValues] };
  console.log('Here\' our new post', fullUpdatedPost);

  return res.status(status).json(fullUpdatedPost);
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  searchPostByContent,
  updatePostByTitleContentAndId,
};