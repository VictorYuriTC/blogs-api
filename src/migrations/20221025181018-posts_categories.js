'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        onDelete: 'CASCADE',
        references: {
          model: 'blog_posts',
          key: 'id'
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories')
  }
};
