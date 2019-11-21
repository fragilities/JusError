'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  
  const Model = sequelize.Sequelize.Model;

  class User extends Model {

    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }

  }

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please input valid email address'
        },
        isUnique: (value, next) => {
          User.findOne({where: {email: value}})
            .then((user) => {
              if (user) {
                return next('Email already in use!');
              } else {
                return next();
              }
            })
            .catch((err) => {
                return next(err);
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    secret: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    exercise_level: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    hooks: {
    beforeCreate: (user, options) => {
      let hash = bcrypt.hashSync(user.password, 8);
      user.password = hash
    }
  },
    sequelize });
  User.associate = function(models) {
    User.belongsToMany(models.Juice, {through: models.UserJuice})
  };
  return User;
};