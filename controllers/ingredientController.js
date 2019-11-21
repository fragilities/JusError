'use strict'

const Ingredient = require('../models').Ingredient
const Juice = require('../models').Juice

class IngredientController {
  

  static raw(req, res) {
    Ingredient.findAll({include: Juice})
    .then(ingredients => res.send(ingredients))
    .catch(err => console.log(err))
  }

  static all(req, res) {
    let messages = {}

    if(req.query.error) messages.error = req.query.error

    Ingredient.findAll({include: Juice})
    .then(ingredients => res.render('ingredient/all', {ingredients, messages}))
    .catch(err => console.log(err))
  }
}

module.exports = IngredientController;