'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class UserJuice extends Model {}
  
  UserJuice.init({
    UserId: DataTypes.INTEGER,
    JuiceId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {sequelize})

  UserJuice.associate = function(models) {
    UserJuice.belongsTo(models.User)
    UserJuice.belongsTo(models.Juice)
  };
  return UserJuice;
};