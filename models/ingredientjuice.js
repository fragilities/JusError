'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class IngredientJuice extends Model {}

  IngredientJuice.init({
    IngredientId: DataTypes.INTEGER,
    JuiceId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {sequelize})

  IngredientJuice.associate = function(models) {
    // associations can be defined here
    
  };
  return IngredientJuice;
};