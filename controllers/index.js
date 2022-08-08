const Category = require("../models/Category")
const Menu = require("../models/Menu")

class Controller {
  static home(req, res) {
    res.render('home')
  }

  static categories(req, res) {
    Category.getAll((err, categories) => {
      if (err) res.send(err)
      else res.render('categories', { categories })
    })
  }

  static menus(req, res) {
    const { search } = req.query

    Menu.getAll(search, (err, menus) => {
      if (err) res.send(err)
      else res.render('menus', { menus })
    })
  }

  static showMenu(req, res) {
    Menu.getOneById(+req.params.id, (err, menu) => {
      if (err) res.send(err)
      else res.render('menu', { menu })
    })
  }

  static addMenu(req, res) {
    Category.getAll((err, categories) => {
      if (err) res.send(err)
      else res.render('add-menu', { categories })
    })
  }

  static saveMenu(req, res) {
    const data = {
      name: req.body.name,
      CategoryId: +req.body.CategoryId,
      stock: +req.body.stock,
      price: +req.body.price,
      createdAt: req.body.createdAt,
    }

    Menu.create(data, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus')
    })
  }

  static deleteMenu(req, res) {
    Menu.deleteById(+req.params.id, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus')
    })
  }

  static editMenu(req, res) {
    Menu.getOneById(+req.params.id, (err, menu) => {
      if (err) res.send(err)
      else {
        Category.getAll((err, categories) => {
          if (err) res.send(err)
          else res.render('edit-menu', { menu, categories })
        })
      }
    })
  }

  static updateMenu(req, res) {
    const data = {
      name: req.body.name,
      CategoryId: +req.body.CategoryId,
      stock: +req.body.stock,
      price: +req.body.price,
      createdAt: req.body.createdAt,
    }

    Menu.update(+req.params.id, data, (err) => {
      if (err) res.send(err)
      else res.redirect('/menus')
    })
  }
}

module.exports = Controller