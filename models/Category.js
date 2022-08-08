const pool = require('../connection');

class Category {
  constructor(id, name, totalItems, totalStock) {
    this.id = id
    this.name = name
    this.totalItems = totalItems
    this.totalStock = totalStock
  }

  static getAll(cb) {
    const query = `
      SELECT 
        c.*,
        COUNT(m.id) AS "totalItems",
        SUM(m.stock) AS "totalStock"
      FROM "Categories" c
      JOIN "Menus" m ON m."CategoryId" = c.id
      GROUP BY c.id, c.name
      ORDER BY c.name ASC
    `

    pool.query(query, (err, result) => {
      if (err) cb(err)
      else {
        const categories = result.rows.map(el => {
          const { id, name, totalItems, totalStock } = el
          return new Category(id, name, totalItems, totalStock)
        })

        cb(null, categories)
      }
    })
  }
}

// Category.getAll((err, categories) => {
//   console.log({err, categories});
// })

module.exports = Category