const Controller = require('../controllers');
const router = require('express').Router();

router.get('/', Controller.home)
router.get('/categories', Controller.categories)
router.get('/menus', Controller.menus)
router.get('/menus/add', Controller.addMenu)
router.post('/menus/add', Controller.saveMenu)
router.get('/menus/:id', Controller.showMenu)
router.get('/menus/delete/:id', Controller.deleteMenu)
router.get('/menus/edit/:id', Controller.editMenu)
router.post('/menus/edit/:id', Controller.updateMenu)

module.exports = router