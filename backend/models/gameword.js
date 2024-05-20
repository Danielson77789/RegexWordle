'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const GameWord = models.GameWord;
      this.belongsTo(GameWord, { foreignKey: 'gameWordId', as: 'gameWord'});
    }
  }
  GameWord.init({
    gameId: DataTypes.INTEGER,
    wordId: DataTypes.INTEGER,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameWord',
  });
  return GameWord;
};