const pool = require('./connection');

const categoriesDdl = `
  CREATE TABLE IF NOT EXISTS "Categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
  )
`

const menusDdl = `
  CREATE TABLE IF NOT EXISTS "Menus" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "stock" INTEGER DEFAULT 0,
    "price" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL,
    "CategoryId" INTEGER REFERENCES "Categories"(id)
  )
`

pool.query(categoriesDdl, (err, result) => {
  if (err) console.log('Error create table Catagories', err);
  else {
    console.log('Table Categories has been created successfully');
    pool.query(menusDdl, (err, result) => {
      if (err) console.log('Error create table Menus', err)
      else {
        console.log('Table Menus has been created successfully');
        pool.end()
      }
    })
  }
})