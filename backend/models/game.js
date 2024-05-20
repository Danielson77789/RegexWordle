'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const Game = models.Game;
      this.hasMany(Game, { foreignKey: 'gameWordId', as: 'gameWord' });
    }
  }
  Game.init({
    date: DataTypes.DATEONLY,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};