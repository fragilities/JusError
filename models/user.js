'use strict';

const hash = require("../helpers/hashPassword");

module.exports = (sequelize, DataTypes) => {
  
  const Model = sequelize.Sequelize.Model;

  class User extends Model {

    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }

  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
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
    password: DataTypes.STRING,
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
      const generateSecret = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      user.secret = generateSecret(10);
      user.password = hash(user.password, user.secret);
    }
    // ,
    // beforeValidate: (user, options) => {
    //   user.password = hash(user.password, user.secret);
    // }
  },
    sequelize });
  User.associate = function(models) {
    User.belongsToMany(models.Juice, {through: models.UserJuice})
  };
  return User;
};