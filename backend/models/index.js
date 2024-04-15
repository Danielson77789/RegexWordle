'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Auth = require('./auth')(sequelize, Sequelize.DataTypes);
const Score = require('./score')(sequelize, Sequelize.DataTypes);
const GameWord = require('./gameword')(sequelize, Sequelize.DataTypes);
const Game = require('./game')(sequelize, Sequelize.DataTypes);


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Auth.hasOne(User, {foreignKey: 'userId'});
User.belongsTo(Auth, {foreignKey: 'userId'});

Score.hasMany(User, {foreignKey: 'userId'})

GameWord.hasMany(Game, {foreignKey: 'gameId'})

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

