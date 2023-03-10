const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');
const userService = require('../services/user.service');
const categoriesService = require('../services/categories.service');
require('dotenv');

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
  const { authorization } = req.headers;
  const { email } = jwt.decode(authorization).data;

  const {
    status,
    message,
    deletedPost,
  } = await postService.deletePostById({ id, email });

  if (!deletedPost) {
    return res.status(status).json({ message });
  }

  return res.status(status).json();
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

const updatePostByTitleAndContentAndIdAndUserEmail = async (req, res, _next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { email } = jwt.decode(authorization).data;
  const dataToBeUpdated = { ...req.body, id, email };
  
  const { status, message, wasPostUpdated } = await postService
    .updatePostByTitleAndContentAndIdAndUserEmail(dataToBeUpdated);

  if (!wasPostUpdated) return res.status(status).json({ message });
  
  const { post } = await postService.getPostById(id);
  const updatedPost = post.dataValues;

  const { user } = await userService.getUserById(updatedPost.userId);

  const { allCategories } = await categoriesService.getAllCategories();
  
  const fullUpdatedPost = { ...updatedPost, user, categories: [allCategories[0].dataValues] };

  return res.status(status).json(fullUpdatedPost);
};

const addNewPostByTitleAndContentAndCategoryIds = async (req, res, _next) => {
  const { email } = jwt.decode(req.headers.authorization).data;
  console.log('Logged user: ', email);
  const {
    status,
    message,
    addedPost,
  } = await postService.addNewPostByTitleAndContentAndCategoryIds({ ...req.body, email });

  if (!addedPost) return res.status(status).json({ message });

  return res.status(status).json(addedPost);
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  searchPostByContent,
  updatePostByTitleAndContentAndIdAndUserEmail,
  addNewPostByTitleAndContentAndCategoryIds,
};