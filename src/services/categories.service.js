const { Category } = require('../models');
const generateNewJWT = require('../middlewares/authentications/generateJWT');

const addNewCategory = async (categoryName) => {
  if (!categoryName) {
    return { status: 400, message: '"name" is required' };
  }

  const category = await Category.create({
    name: categoryName,
  });

  const token = generateNewJWT({ category });

  return { status: 201, message: 'Category has been created', category, token };
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return { status: 200, message: 'All found categories', allCategories };
};

module.exports = {
  addNewCategory,
  getAllCategories,
};