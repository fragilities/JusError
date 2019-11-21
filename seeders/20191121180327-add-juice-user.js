'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserJuices', [{
      UserId: 46,
      JuiceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      UserId: 46,
      JuiceId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 25,
      JuiceId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserJuices', null, {})
  }
};
