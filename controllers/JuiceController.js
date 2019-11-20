const Juice = require('../models').Juice
const Ingredient = require('../models').Ingredient
const UserJuice = require('../models').UserJuice
const IngredientJuice = require('../models').IngredientJuice

class JuiceController {

  static all(req, res) {

    const messages = {}
    if(req.query.error) messages.error = req.query.error
    if(req.query.success) messages.success = req.query.success

    Juice.findAll({include: Ingredient})
    .then(juices => res.render('juice/all', {juices, messages}))
    .catch(err => res.send(err))
  }

  static addPage(req, res) {
    const messages = {}
    if(req.query.error) messages.error = req.query.error

    Ingredient.findAll()
    .then(ingredients => res.render('juice/add', {ingredients, messages}))
    .catch(err => res.send(err.message))
  }

  static add(req, res) {

    let ingredients = []
    
    for(let key in req.body) {
      let ingredientTemp = key.split('-')
      if(ingredientTemp.length > 1) {
        if(ingredientTemp[1] == 'radio') {
          if(req.body[key] == 1) {
            let amountKey = ingredientTemp[0] + '-amount'
            ingredients.push([req.body[ingredientTemp[0]], req.body[amountKey]])
          }
        }
      }
    }

    Juice.create(req.body)
    .then(juice => {

      let conjunctionPromises = []

      for(let i in ingredients) conjunctionPromises.push(IngredientJuice.create({
        IngredientId: ingredients[i][0],
        JuiceId: juice.id,
        amount: ingredients[i][1]
      }))
      
      return Promise.all(conjunctionPromises)
    })
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil dibuat`))
    .catch(err => res.redirect(`/juice/add?error=${err.message}`))
  }

  static editPage(req, res) {

    const messages = {}
    if(req.query.error) messages.error = req.query.error

    let tempJuice

    Juice.findByPk({where: {id: req.params.id}})
    .then(juice => {

      tempJuice = juice
      return Ingredient.findAll()
    })
    .then(ingredients => res.render('juiceEdit', {tempJuice, ingredients, messages}))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static edit(req, res) {
    
    Juice.update(req.body, {where: {id: req.params.id}})
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil diubah`))
    .catch(err => res.redirect(`/juice/edit/${req.params.id}?error=${err.message}`))
  }

  static delete(req, res) {
    let tempJuice

    Juice.findByPk({where: {id: req.params.id}})
    .then(juice => {

      tempJuice = juice
      return Juice.destroy({where: {id: req.params.id}})
    })
    .then(() => res.redirect(`/juice?success=Resep jus ${tempJuice.name} telah berhasil dihapus`))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static test(req, res) {
    res.render('juice/all')
  }
}

module.exports = JuiceController