const Juice = require('../models').Juice
const Ingredient = require('../models').Ingredient
const UserJuice = require('../models').UserJuice
const IngredientJuice = require('../models').IngredientJuice
const Helper = require('../helpers')

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
    .then(ingredients => res.render('juice/form', {ingredients, messages}))
    .catch(err => res.send(err.message))
  }

  static add(req, res) {

    // load data

    let ingredients = Helper.insertIngredients(req.body)

    // validation

    if(ingredients.length == 0) res.redirect(`/juice/add?error=Pilih buah minimal satu`)
    
    for(let i in ingredients) {
      if(ingredients[i][1] == "" || ingredients[i][1] == 0) res.redirect(`/juice/add?error=Ada amount dari buah yang dipilih yang masih kosong`)
    }

    // create

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

    let juice
    let ingredients

    Juice.findByPk(req.params.id)
    .then(tempJuice => {

      juice = tempJuice
      return Ingredient.findAll()
    })
    .then(tempIngredients => {

      ingredients = tempIngredients
      return IngredientJuice.findAll({where: {JuiceId: juice.id}})
    })
    .then(ingredientJuices => res.render('juice/form', {juice, ingredients, ingredientJuices, messages}))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static edit(req, res) {
    
    let ingredients = Helper.insertIngredients(req.body)

    if(ingredients.length == 0) res.redirect(`/juice/add?error=Pilih buah minimal satu`)

    Juice.update(req.body, {where: {id: req.params.id}})
    .then(juice => {

      const promises = []

      // for(let i in ingredients) conjunctionPromises.push(IngredientJuice.create({
      //   IngredientId: ingredients[i][0],
      //   JuiceId: juice.id,
      //   amount: ingredients[i][1]
      // }))

      for(let i in ingredients) {

        promises.push(IngredientJuice.findOne({where: {IngredientId: ingredients[i][0]}}))
        // .then(data => {
        //   if(data.id) {
        //     conjunctionPromises.push(IngredientJuice.update({
        //       amount: ingredients[i][1]
        //     }, {where: {id: data.id}}))
        //   }
        //   else {
        //     conjunctionPromises.push(IngredientJuice.create())
        //   }
        // })
      }
      
      return Promise.all(promises)
    })
    .then(ingredientJuices => {

      let promises = []

      let ids = ingredients.map(ingredient => ingredient[0])
      let idjs = ingredientJuices.map(ingredient => ingredient.IngredientId)
      

      // delete, update, insert

      for(let i in ids) {
        // if(idsj.include(i))
      }

      // if(ids[i].indexOf(ids2))

      // for(let i in ingredients) {
      //   if(ingredientJuices[i].id) {
      //     IngredientJuice.update({amount: ing})
      //   }

      //   if(ingredient)
      // }

      
    })
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