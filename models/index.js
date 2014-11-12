"use strict";

var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || "development";
// var config    = require(__dirname + '/../node_modules/lib/config/config.js')[env];
var config = require('config').database;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql'
})
// var sequelize = new Sequelize(config.name, config.username, config.password, config.options);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
