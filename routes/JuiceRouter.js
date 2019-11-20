const express = require('express')
const router = express.Router()

const JuiceController = require('../controllers/JuiceController')

router.get('/', JuiceController.all)

router.get('/add', JuiceController.addPage)
router.post('/add', JuiceController.add)

router.get('/edit/:id', JuiceController.editPage)
router.post('/edit/:id', JuiceController.edit)

router.get('/delete/:id', JuiceController.delete)