const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/', Controller.menus)
router.get('/add', Controller.addMenu)
router.post('/add', Controller.saveMenu)
router.get('/:id', Controller.showMenu)
router.get('/delete/:id', Controller.deleteMenu)
router.get('/edit/:id', Controller.editMenu)
router.post('/edit/:id', Controller.updateMenu)

module.exports = router