'use strict'

const User = require('../models').User;

class UserController {
  
  static viewAll(req, res) {
    res.render('user/all')
  }

  static viewLogin(req, res) {
    res.render('user/login') 
  }

  static login(req, res) {
     
  }

  static viewRegister(req, res) { //from home to register page
    res.render('user/register') //register page: register
  }

  static register(req, res) { //from register page to user page
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      exercise_level: req.body.exercise_level,
    })
    .then(data => {res.render('user/login', {data})})
    .catch(err => {res.send(err.message)});
  }

  static viewEdit(req, res) {
    User.findOne({where: {id: req.params.id}})
      .then(user => {res.render('user/userEdit', {user})}) //user edit page
      .catch(err => {res.send("Error : " + err.message)});
  }
  
  static edit(req,res) {
    User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      exercise_level: req.body.exercise_level,
    })
    .then((data) => {
      res.redirect('user/user')
    })
    .catch(err => {
      res.send("Error : " + err.message);
    });
  }

  static remove(req, res) { //from user page to home
    User.destroy({
      where : {
        id : req.params.id
      }
    })
    .then(() => {
      res.redirect('/index'); //homepage
    })
    .catch(err => {
      res.send(err.message);
    });
  }

  static logout(req, res) {
     
  }

}

module.exports = UserController;