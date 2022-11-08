const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  })

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'cascade'
    })
  }

  return BlogPost;
}

module.exports = BlogPostModel;