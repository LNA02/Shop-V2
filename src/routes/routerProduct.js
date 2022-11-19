const express = require('express')
const productController = require('../controller/product')
const user = require('../controller/authentication')
const middlewaresAuthen = require('../middlewares/authen')

const router = express.Router()

router.get('/',productController.home)
router.get('/product/infoProduct/:id',productController.infos)
router.get('/product/delete/:id',productController.delete)
router.get('/product/update/:id',productController.getUpdate)
router.post('/product/setupdate/:id',productController.setUpdate)
router.get('/authentication',user.login)
router.get('/logout', user.logout)
router.post('/authentication/save',user.save)
router.post('/authentication/access',user.access)
router.get('/authentication/create',user.createUser)
router.get('/product/save/form',middlewaresAuthen.authentication,productController.form)
router.post('/product/save',productController.save)
router.get('/product/search', productController.search)
router.get('/authentication/deleteUser/:id', user.deleteUser)
router.get('/authentication/profile', user.profile)
router.get('/authentication/getUpdateUser/:id',user.getUpdateUser)
router.post('/authentication/setUpdateUser/:id',user.setUpdateUser)


module.exports = router