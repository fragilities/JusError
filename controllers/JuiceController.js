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
    // console.log('-----------------')
    // console.log(req.session.userData.id)
    // console.log('-----------------')
    // return
    if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh add juice!`)

    const messages = {}
    if(req.query.error) messages.error = req.query.error
    

    Ingredient.findAll()
    .then(ingredients => res.render('juice/add', {ingredients, messages}))
    .catch(err => res.send(err.message))
  }

  static add(req, res) {

    // load data

    let ingredients = Helper.insertIngredients(req.body)

    // validation

    if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh add juice!`)

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

      conjunctionPromises.push(UserJuice.create({
        UserId: req.session.userData.id,
        JuiceId: juice.id
      }))

      return Promise.all(conjunctionPromises)
    })
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil dibuat`))
    .catch(err => res.redirect(`/juice/add?error=${err.message}`))
  }

  static editPage(req, res) {

    if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh edit juice!`)

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
    let tempJuice
    
    // validation

    if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh edit juice!`)

    if(ingredients.length == 0) res.redirect(`/juice/add?error=Pilih buah minimal satu`)

    // update

    Juice.update(req.body, {returning: true, where: {id: req.params.id}})
    .then(juice => {

      tempJuice = juice[1][0].dataValues
      
      return IngredientJuice.findAll({where: {JuiceId: tempJuice.id}})
    })
    .then(ingredientJuices => {

      let promises = []

      let ingredientIdsFromInput = ingredients.map(ingredient => ingredient[0])
      let ingredientIdsFromDb = ingredientJuices.map(ingredient => ingredient.IngredientId)

      for(let i in ingredientIdsFromInput) {

        let tempIngredientId = ingredientIdsFromInput[i]

        // include ? update : create
        if(ingredientIdsFromDb.includes(tempIngredientId)) {

          promises.push(IngredientJuice.update({
            amount: ingredients[i][1]
          }, {where: {IngredientId: tempIngredientId, JuiceId: tempJuice.id}}))
        }
        else {

          promises.push(IngredientJuice.create({
            IngredientId: tempIngredientId,
            JuiceId: tempJuice.id,
            amount: ingredients[i][1]
          }))
        }
      }

      // this loop is special for delete
      for(let i in ingredientIdsFromDb) {

        let tempIngredientId = ingredientIdsFromDb[i]
        
        if(!ingredientIdsFromInput.includes(tempIngredientId)) {
          promises.push(IngredientJuice.destroy({where: {
            IngredientId: tempIngredientId,
            JuiceId: tempJuice.id
          }}))
        }
      }
      
      return Promise.all(promises)
    })
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil diubah`))
    .catch(err => res.redirect(`/juice/edit/${req.params.id}?error=${err.message}`))
  }

  static delete(req, res) {

    if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh menghapus juice!`)

    let tempJuice

    Juice.findByPk(req.params.id)
    .then(juice => {
      
      tempJuice = juice

      return IngredientJuice.destroy({where: {JuiceId: req.params.id}})
    })
    .then(() => {

      return UserJuice.destroy({where: {JuiceId: req.params.id}})
    })
    .then(() => {

      return Juice.destroy({where: {id: req.params.id}})
    })
    .then(() => res.redirect(`/juice?success=Resep jus ${tempJuice.name} telah berhasil dihapus`))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static detail(req, res) {
    // validasi user

    // if(!req.session.userData.id) res.redirect(`/user?error=Belum login, tidak boleh add juice!`)

    Juice.findByPk(3, {include: Ingredient})
    .then(juice => {

      let nutrition = {
        calorie: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0
      }

      for(let i in juice.Ingredients) {
        let amountMultiplier = juice.Ingredients[i].IngredientJuice.amount/100

        nutrition.calorie += juice.Ingredients[i].calorie * amountMultiplier
        nutrition.carbohydrates += juice.Ingredients[i].carbohydrates * amountMultiplier
        nutrition.protein += juice.Ingredients[i].protein * amountMultiplier
        nutrition.fat += juice.Ingredients[i].fat * amountMultiplier
      }

      nutrition.calorie = +nutrition.calorie.toFixed(2)
      nutrition.carbohydrates = +nutrition.carbohydrates.toFixed(2)
      nutrition.protein = +nutrition.protein.toFixed(2)
      nutrition.fat = +nutrition.fat.toFixed(2)

      res.render('juice/detail', {juice, nutrition})
    })
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static test(req, res) {
    // IngredientJuice.findAll()
    // .then(data => res.send(data))
    // .catch(err => console.log(err))
    Juice.findByPk(3, {include: Ingredient})
    .then(juice => res.send(juice))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }


}

module.exports = JuiceController