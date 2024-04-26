'use strict';
const {
  Model
} = require('sequelize');

// const User = require('./user'); // Adjust the path as needed

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const User = models.User;
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }
  }
  Auth.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auth',
  });
  return Auth;
};