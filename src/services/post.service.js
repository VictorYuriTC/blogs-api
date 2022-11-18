const { BlogPost, Sequelize } = require('../models');

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
  const [postData] = await BlogPost.findAll({
    where: {
      content: { [Op.like]: postContent },
    },
  });

  if (!postData) {
    return { status: 404, message: 'Post does not exist' };
  }

  return { status: 200, postData };
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  searchPostByContent,
};