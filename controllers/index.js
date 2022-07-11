const Model = require("../models/model")

class Controller {
  static home(req, res) {
    res.render('home')
  }

  static categories(req, res) {
    Model.getAllCategories((err, categories) => {
      if (err) res.send(send)
      else res.render('categories', { categories })
    })
  }

  static menus(req, res) {
    const { search } = req.query

    Model.getAllMenus(search, (err, menus) => {
      if (err) res.send(err)
      else res.render('menus', { menus })
    })
  }

  static showMenu(req, res) {
    Model.getMenuById(+req.params.id, (err, menu) => {
      if (err) res.send(err)
      else res.render('show-menu', { menu })
    })
  }

  static addMenu(req, res) {
    Model.getAllCategories((err, categories) => {
      if (err) res.send(err)
      else res.render('add-menu', { categories })
    })
  }

  static saveMenu(req, res) {
    const { name, price, stock, createdAt, CategoryId } = req.body 
    Model.createMenu(name, +price, +stock, createdAt, +CategoryId, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus')
    })
  }

  static deleteMenu(req, res) {
    Model.deleteMenuById(+req.params.id, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus') 
    })
  }

  static editMenu(req, res) {
    Model.getMenuById(+req.params.id, (err, menu) => {
      if (err) res.send(err)
      Model.getAllCategories((err, categories) => {
        if (err) res.send(err)
        else res.render('edit-menu', { categories, menu })
      })
    })
  }

  static updateMenu(req, res) {
    const { name, price, stock, createdAt, CategoryId } = req.body
    const id = +req.params.id
    Model.updateMenuById(name, +price, +stock, createdAt, +CategoryId, id, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus')
    })
  }
}

module.exports = Controller