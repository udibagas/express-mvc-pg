const pool = require("../connection")

class Menu {
  constructor(id, name, CategoryId, stock, price, createdAt, category) {
    this.id = id
    this.name = name
    this.CategoryId = CategoryId
    this.stock = stock
    this.price = price
    this.createdAt = createdAt
    this.category = category
  }

  get formattedPrice() {
    return this.price.toLocaleString('id-ID', {style: 'currency', currency : 'IDR'})
  }

  formattedDate() {
    return this.createdAt.toLocaleString('id-ID')
  }

  static getAll(search, cb) {
    let query = `
      SELECT m.*, c.name AS category
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
    `

    if (search) {
      query += ` WHERE m.name ILIKE '%${search}%' `
    }

    pool.query(query, (err, result) => {
      if (err) cb(err)
      else {
        const menus = result.rows.map(el => {
          const { id, name, CategoryId, stock, price, createdAt, category } = el
          return new Menu(id, name, CategoryId, stock, price, createdAt, category)
        })
        cb(null, menus)
      }
    })
  }

  static getOneById(id, cb) {
    let query = `
      SELECT m.*, c.name AS category
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.id = $1
    `
    pool.query(query, [id], (err, result) => {
      if (err) cb(err)
      else {
        if (result.rowCount == 0) cb(`Menu with id ${id} is not found`)
        else {
          const { id, name, CategoryId, stock, price, createdAt, category } = result.rows[0]
          const menu = new Menu(id, name, CategoryId, stock, price, createdAt, category) 
  
          cb(null, menu)
        }
        
      }
    })
  }

  static create(data, cb) {
    const query = `
      INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
      VALUES ($1, $2, $3, $4, $5)
    `
    const { name, CategoryId, stock, price, createdAt } = data
    pool.query(query, [name, CategoryId, stock, price, createdAt], (err) => {
      cb(err)
    })
  }

  static deleteById(id, cb) {
    const query = ` DELETE FROM "Menus" WHERE id = $1 `

    pool.query(query, [id], (err, result) => {
      if (result.rowCount == 0) cb(`Menu with id ${id} is not found`)
      else {
        cb(err)
      }
    })
  }

  static update(id, data, cb) {
    const query = `
      UPDATE "Menus"
      SET
        "name" = $1,
        "CategoryId" = $2,
        "price" = $3,
        "stock" = $4,
        "createdAt" = $5
      WHERE id = $6
    `
    const { name, CategoryId, price, stock, createdAt } = data
    pool.query(query, [name, CategoryId, price, stock, createdAt, id], (err, result) => {
      if (result.rowCount == 0) cb(`Menu with id ${id} is not found`)
      else {
        cb(err)
      }
    })
  }
}

module.exports = Menu