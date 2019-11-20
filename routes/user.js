'use strict'

const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/register', UserController.viewRegister);
router.post('/register', UserController.register);

router.get('/user_edit/:id', UserController.viewEdit);
router.post('/user_edit/:id', UserController.edit);

router.get('/user_delete/:id', UserController.remove);

router.get('/login', UserController.viewLogin);
router.post('/login', UserController.login);

router.get('/logout', UserController.logout);

module.exports = router;