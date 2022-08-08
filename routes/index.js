const express = require('express');
const Controller = require('../controllers');
const router = express.Router()
const menus = require('./menus');

router.get('/', Controller.home)
router.get('/categories', Controller.categories)
router.use('/menus', menus)

module.exports = router