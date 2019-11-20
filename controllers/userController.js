'use strict'

const User = require('../models').User;

class UserController {
  
  static viewRegister(req, res) { //from home to register page
    res.render('register') //register page: register
  }

  static register(req, res) { //from register page to user page
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      exercise_level: req.body.exercise_level,
    })
    .then(data => {res.render('user', {data})}) //user page: edit, delete
    .catch(err => {res.send(err.message)});
  }

  static viewEdit(req, res) {
    return User.findOne({where: {id: req.params.id}})
      .then(user => {res.render('userEdit', {user})}) //user edit page
      .catch(err => {res.send("Error : " + err.message)});
  }
  
  static edit(req,res) {
    return User.update({
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
      res.redirect('/user')
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

  static viewLogin(req, res) {
    
  }

  static login(req, res) {
     
  }

  static logout(req, res) {
     
  }

}

module.exports = UserController;