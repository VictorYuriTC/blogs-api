const { BlogPost, User, Sequelize } = require('../models');

const { Op } = Sequelize;

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll();

  return { status: 200, message: 'All found posts', allPosts };
};

const getPostById = async (postId) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) {
    return { status: 404, message: 'Post does not exist' };
  }

  return { status: 200, message: 'Post found', post };
};

const deletePostById = async (postId) => {
  const { post } = await getPostById(postId);

  if (!post) {
    return { status: 404, message: 'Post does not exist' };
  }
  const deletedPost = BlogPost.destroy({ where: { id: postId } });

  return { status: 204, message: 'Post successfully deleted', deletedPost };
};

const searchPostByContent = async (postContent) => {
  const postData = await BlogPost.findAll({
    where: {
      content: { [Op.like]: postContent },
    },
  });

  if (!postData) {
    return { status: 404, message: 'Post does not exist' };
  }

  return { status: 200, postData };
};

const updatePostByTitleAndContentAndIdAndUserEmail = async (dataToBeUpdated) => {
if (!dataToBeUpdated.title || !dataToBeUpdated.content || !dataToBeUpdated.id) {
    return { status: 400, message: 'Some required fields are missing', wasPostUpdated: 0 };
  }

  const { post: { userId } } = await getPostById(dataToBeUpdated.id); 

  const userToBeChecked = await User.findOne({ where: { id: userId } });

  if (userToBeChecked.dataValues.email !== dataToBeUpdated.email) {
    return { status: 401, message: 'Unauthorized user', wasPostUpdated: 0 };
  }

  const [wasPostUpdated] = await BlogPost.update(
    { title: dataToBeUpdated.title, content: dataToBeUpdated.content },
    { where: { id: dataToBeUpdated.id } },
  );

  return { status: 200, wasPostUpdated };
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  searchPostByContent,
  updatePostByTitleAndContentAndIdAndUserEmail,
};