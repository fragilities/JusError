'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'age'
      ),
      queryInterface.removeColumn(
        'Users',
        'weight'
      ),
      queryInterface.removeColumn(
        'Users',
        'height'
      ),
      queryInterface.removeColumn(
        'Users',
        'exercise_level'
      ),
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
    queryInterface.addColumn(
      'Users',
      'age',
      Sequelize.INTEGER
    ),
    queryInterface.addColumn(
      'Users',
      'weight',
      Sequelize.INTEGER
    ),
    queryInterface.addColumn(
      'Users',
      'height',
      Sequelize.INTEGER
    ),
    queryInterface.addColumn(
      'Users',
      'exercise_level',
      Sequelize.INTEGER
    ),
  ]);
  }
};
