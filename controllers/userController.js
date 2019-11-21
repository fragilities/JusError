'use strict'

const User = require('../models').User;
const Juice = require('../models').Juice;
const bcrypt = require('bcrypt');

class UserController {
  
  static home(req, res) {
    if (req.session.userData) {
      res.redirect(`/user/${req.session.userData.id}`)
    } else {
      res.render('user/home')
    }
  }

  static viewRegister(req, res) {
    res.render('user/register')
  }

  static register(req, res) {
    let msg = "Registration successfull!"
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
    .then(data => {res.render('user/home', {data})})
    .catch(err => {res.send("Error : " + err.message)});
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
          res.redirect(`/user/${data.id}`)
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

  static viewProfile(req, res) {
    User.findByPk(req.params.id, {include: Juice})
    .then((data) => {
      res.render('user/profile', {data})
    })
    .catch((err) => res.send("Error : " + err.message));
  }

  static viewEdit(req, res) {
    User.findOne({where: {id: req.params.id}})
    .then(user => {res.render('user/edit', {user})})
    .catch(err => {res.send("Error : " + err.message)});
  }
  
  static edit(req,res) {
    let data = parseInt(req.body.id);
    User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }, {where: {id: req.body.id}})
    .then(() => {
      res.redirect(`/user/${data.id}`)
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