'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientJuice = sequelize.define('IngredientJuice', {
    IngredientId: DataTypes.INTEGER,
    JuiceId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  IngredientJuice.associate = function(models) {
    // associations can be defined here
  };
  return IngredientJuice;
};