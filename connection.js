const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'cafe',
  user: 'postgres',
  password: 'bismillah',
  idleTimeoutMillis: 1000
})

module.exports = pool