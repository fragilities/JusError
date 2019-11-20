'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Juice extends Model {}

  Juice.init({
    name: DataTypes.STRING
  }, {sequelize})

  Juice.associate = function(models) {
    Juice.belongsToMany(models.User, {through: models.UserJuice})
    Juice.belongsToMany(models.Ingredient, {through: models.IngredientJuice})
  };
  return Juice;
};