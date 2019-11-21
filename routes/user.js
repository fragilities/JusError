'use strict'

const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.viewAll);
router.get('/profile/:id', UserController.viewOne);

router.get('/register', UserController.viewRegister); 
router.post('/register', UserController.register); 

router.get('/login', UserController.viewLogin); 
router.post('/login', UserController.login);

router.use(function(req, res, next) {
  if (req.session.userData) {
    next();
  } else {
    res.redirect('/')
  }
})

router.get('/edit/:id', UserController.viewEdit);
router.post('/edit/:id', UserController.edit);

router.get('/delete/:id', UserController.remove);

router.get('/logout/:id', UserController.logout);

module.exports = router;