'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('Ingredients', 'carbohydrates', Sequelize.REAL),
      queryInterface.addColumn('Ingredients', 'protein', Sequelize.REAL),
      queryInterface.addColumn('Ingredients', 'fat', Sequelize.REAL)
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('Ingredients', 'carbohydrates'),
      queryInterface.removeColumn('Ingredients', 'protein'),
      queryInterface.removeColumn('Ingredients', 'fat')
    ])
  }
};
