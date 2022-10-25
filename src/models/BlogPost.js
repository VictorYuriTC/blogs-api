const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
  {
    tableName: 'users',
    underscored: true,
  })

  BlogPost.associate = (models) => {
    BlogPost.hasOne(models.User, {
      foreignKey: 'user_id', as: 'users'
    })
  }

  return BlogPost;
}

module.exports = BlogPostModel;