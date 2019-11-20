'use strict';

const fs = require('fs')
const ingredients = JSON.parse(fs.readFileSync('./ingredients.json', 'utf8'))

ingredients.forEach(ingredient => {
  ingredient.createdAt = new Date();
  ingredient.updatedAt = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ingredients', ingredients, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
