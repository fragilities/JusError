'use strict';

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Ingredient extends Model {}
  
  Ingredient.init({
    name: DataTypes.STRING,
    calorie: DataTypes.REAL,
    carbohydrates: DataTypes.REAL,
    protein: DataTypes.REAL,
    fat: DataTypes.REAL,
    createdAt: new Date(),
    updatedAt: new Date()
  }, { sequelize });
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Juice, {through: models.IngredientJuice});
  };
  return Ingredient;
};