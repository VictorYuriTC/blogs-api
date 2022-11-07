const categoriesService = require('../services/categories.service');

const addNewCategory = async (req, res) => {
  const { name } = req.body;

  const {
    status,
    message,
    category,
  } = await categoriesService.addNewCategory(name);

  if (!name) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(category);
};

module.exports = {
  addNewCategory,
};