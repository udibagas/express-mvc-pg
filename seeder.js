const pool = require('./connection');
const fs = require('fs');

const categories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
  .map(el => `('${el.name}')`)
  .join(',\n')

const menus = JSON.parse(fs.readFileSync('./data/menus.json', 'utf-8'))
  .map(el => {
    const { name, category, stock, price, createdAt } = el
    return `('${name}', ${category}, ${stock}, ${price}, '${createdAt}')`
  })
  .join(',\n')


const queryCategories = `
  INSERT INTO "Categories" ("name")
  VALUES ${categories}`

const queryMenus = `
  INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
  VALUES ${menus}
`

pool.query(queryCategories, (err, result) => {
  if (err) console.log(err);
  pool.query(queryMenus, (err, result) => {
    if (err) console.log(err);
    console.log('SUCCESS SEED DB');
  })
})

