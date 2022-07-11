const pool = require('../connection');
const { Category, Menu } = require('./class');

class Model {
  static getAllCategories(cb) {
    const query = `SELECT * FROM "Categories" ORDER BY "name" ASC`
    pool.query(query, (err, result) => {
      if (err) cb(err)
      else {
        const categories = result.rows.map(el => {
          const { id, name } = el
          return new Category(id, name)
        })

        cb(null, categories)
      }
    })
  }

  static getAllMenus(search, cb) {
    let query = `
      SELECT m.*, c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
    `

    if (search) {
    query = `
      SELECT m.*, c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.name ILIKE '%${search}%'
    `
    }

    pool.query(query, (err, result) => {
      if (err) cb(err)
      else {
        const menus = result.rows.map(el => {
          const { id, name, price, stock, createdAt, category, CategoryId } = el
          return new Menu(id, name, price, stock, createdAt, category, CategoryId)
        })

        cb(null, menus)
      }
    })
  }

  static getMenuById(id, cb) {
    const query = `
      SELECT m.*, c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.id = $1
    `

    pool.query(query, [id], (err, result) => {
      if (err) cb(err)
      else {
        if (result.rowCount == 0) cb(`Data with id ${id} is not found`)
        else {
          const { id, name, price, stock, createdAt, category, CategoryId } = result.rows[0]
          const menu = new Menu(id, name, price, stock, createdAt, category, CategoryId)
          cb(null, menu)
        }
      }
    })
  }

  static createMenu(name, price, stock, createdAt, CategoryId, cb) {
    const query = `
      INSERT INTO "Menus" ("name", "price", "stock", "createdAt", "CategoryId")
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `

    pool.query(query, [name, price, stock, createdAt, CategoryId], (err, result) => {
      if (err) cb(err)
      else {
        console.log(result);
        cb(null)
      }
    })
  }

  static deleteMenuById(id, cb) {
    const query = `DELETE FROM "Menus" WHERE id = $1`
    pool.query(query, [id], (err, result) => {
      if (err) cb(err)
      else {
        if (result.rowCount == 0) cb(`Data with id ${id} is not found`)
        else cb(null)
      }
    })
  }

  static updateMenuById(name, price, stock, createdAt, CategoryId, id, cb) {
    const query = `UPDATE "Menus" SET
        "name" = $1,
        "price" = $2,
        "stock" = $3,
        "createdAt" = $4,
        "CategoryId" = $5
      WHERE id = $6 RETURNING *
    `
    pool.query(query, [name, price, stock, createdAt, CategoryId, id], (err, result) => {
      // if (err) cb(err)
      // else cb(null)
      cb(err)
    })
  }
}

// Model.getAllCategories((err, categories) => {
//   console.log(err, categories);
// })

// Model.getAllMenus((err, menus) => {
//   console.log(err, menus);
// })

// Model.getMenuById(1, (err, menu) => {
//   console.log(err, menu);
// })

module.exports = Model