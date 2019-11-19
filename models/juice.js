'use strict';
module.exports = (sequelize, DataTypes) => {
  const Juice = sequelize.define('Juice', {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Juice.associate = function(models) {
    // associations can be defined here
  };
  return Juice;
};