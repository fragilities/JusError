'use strict'

const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.viewAll); //done

router.get('/login', UserController.viewLogin); //done
router.post('/login', UserController.login);

router.get('/register', UserController.viewRegister); //done
router.post('/register', UserController.register); //done

router.get('/edit/:id', UserController.viewEdit);
router.post('/edit/:id', UserController.edit);

router.get('/delete/:id', UserController.remove);

router.get('/logout', UserController.logout);

module.exports = router;