const { PostCategory } = require('../models');
const { Category } = require('../models');

const findPostCategoriesByPostId = async (postId) => {
  const postCategoriesIds = await PostCategory.findAll({ where: { postId } });
  const postCategories = await Category.findOne({ where: {} });
};

module.exports = {

};