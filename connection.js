const { Pool } = require('pg');

const pool = new Pool({
  host: '172.27.80.1',
  port: 5432,
  database: 'caffe',
  user: 'postgres',
  password: 'bismillah',
  idleTimeoutMillis: 100,
  connectionTimeoutMillis: 1000
})

module.exports = pool