'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Auth = require('./auth')(sequelize, Sequelize.DataTypes);
const Score = require('./score')(sequelize, Sequelize.DataTypes);
const GameWord = require('./gameword')(sequelize, Sequelize.DataTypes);
const Game = require('./game')(sequelize, Sequelize.DataTypes);
const Word = require('./word')(sequelize, Sequelize.DataTypes);

// User and Auth
// User.hasOne(Auth, {foreignKey: 'userId', as: 'auth'});
// Auth.belongsTo(User, {foreignKey: 'userId', as: 'user'});

// User and Score
User.hasMany(Score, {foreignKey: 'userId'});
Score.belongsTo(User, {foreignKey: 'userId'});

// Game and Score
Game.hasMany(Score, {foreignKey: 'gameId'});
Score.belongsTo(Game, {foreignKey: 'gameId'});

// GameWord and Game: One-to-Many
GameWord.hasMany(Game, { foreignKey: 'gameWordId' });
Game.belongsTo(GameWord, { foreignKey: 'gameWordId' });

// Many-to-Many Relationship between Game and Word via GameWord
// Assuming 'GameWord' is a junction table:
// Game.belongsToMany(Word, { through: GameWord, foreignKey: 'gameId', otherKey: 'wordId'});
// Word.belongsToMany(Game, { through: GameWord, foreignKey: 'wordId', otherKey: 'gameId'});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

