const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
  })

  User.associate = (models) => {
    User.belongsToMany(models.BlogPost, {
      foreignKey: 'user_id', as: 'blog_posts'
    })
  }

  return User;
}

module.exports = UserModel;