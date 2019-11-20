const Juice = require('../models').Juice

class JuiceController {

  static all(req, res) {

    const messages = {}
    if(req.query.error) messages.error = req.query.error
    if(req.query.success) messages.success = req.query.success

    Juice.findAll()
    .then(juices => res.render('juiceAll', {juices, messages}))
    .catch(err => res.send(err))
  }

  static addPage(req, res) {

    const messages = {}
    if(req.query.error) messages.error = req.query.error

    res.render('juiceAdd', {messages})
  }

  static add(req, res) {

    Juice.create(req.body)
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil dibuat`))
    .catch(err => res.redirect(`/juice/add?error=${err.message}`))
  }

  static editPage(req, res) {

    const messages = {}
    if(req.query.error) messages.error = req.query.error

    Juice.findByPk({where: {id: req.params.id}})
    .then(juice => res.render('juiceEdit', {juice, messages}))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }

  static edit(req, res) {
    
    Juice.update(req.body, {where: {id: req.params.id}})
    .then(() => res.redirect(`/juice?success=Resep jus telah berhasil diubah`))
    .catch(err => res.redirect(`/juice/edit/${req.params.id}?error=${err.message}`))
  }

  static delete(req, res) {
    let tempJuice

    Juice.findByPk({where: {id: req.params.id}})
    .then(juice => {

      tempJuice = juice
      return Juice.destroy({where: {id: req.params.id}})
    })
    .then(() => res.redirect(`/juice?success=Resep jus ${tempJuice.name} telah berhasil dihapus`))
    .catch(err => res.redirect(`/juice?error=${err.message}`))
  }
}

module.exports = JuiceController