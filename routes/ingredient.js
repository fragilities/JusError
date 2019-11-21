'use strict'

const router = require('express').Router();
const IngredientController = require('../controllers/ingredientController');

router.get('/getRaw', IngredientController.raw)

router.get('/', IngredientController.all)

module.exports = router;