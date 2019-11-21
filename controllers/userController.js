'use strict'

const User = require('../models').User;
const bcrypt = require('bcrypt');

class UserController {
  
  static viewAll(req, res) {
    res.render('user/all')
  }

  static viewOne(req, res) {
    let id = req.params.id;
    User.findOne({where: {id}})
    .then((data) => {
      res.render('user/profile', {data})
    })
    .catch((err) => res.send("Error : " + err.message));
  }

  static viewLogin(req, res) {
    res.render('user/login') 
  }

  static login(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({where: {
        email: req.body.email
      }})
      .then((data) => {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.userData = {
            loggedin: true,
            username: data.email,
            id: data.id
          }
          res.render('user/profile', {data})
        } else {
          res.send('Incorrect Username and/or Password!')
        }
      })
      .catch((err) => {
        res.send("Error : " + err.message)
      })
    } else {
      res.send('Please input email and password')
    }
  }

  static viewRegister(req, res) {
    res.render('user/register')
  }

  static register(req, res) {
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
    .then(data => {res.render('user/profile', {data})})
    .catch(err => {res.send("Error : " + err.message)});
  }

  static viewEdit(req, res) {
    User.findOne({where: {id: req.params.id}})
    .then(user => {res.render('user/edit', {user})})
    .catch(err => {res.send("Error : " + err.message)});
  }
  
  static edit(req,res) {
    User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      exercise_level: req.body.exercise_level,
    }, {where: {id: req.body.id}})
    .then((data) => {
      res.redirect('/user/profile/' + req.body.id)
    })
    .catch(err => {
      res.send("Error : " + err.message);
    });
  }

  static remove(req, res) {
    User.destroy({where : {id : req.params.id}})
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.send(err.message);
    });
  }

  static logout(req, res) {
    req.session.userData = null;
    res.redirect('/')
  }

}

module.exports = UserController;