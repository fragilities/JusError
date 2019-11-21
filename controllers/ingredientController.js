'use strict'

const Ingredient = require('../models').Ingredient
const Juice = require('../models').Juice

class IngredientController {
  

  static all(req, res) {
    Ingredient.findAll({include: Juice})
    .then(ingredients => res.send(ingredients))
    .catch(err => console.log(err))
  }
}

module.exports = IngredientController;