const express = require('express')
const cartController = require('../controller/cart')

const router = express.Router();

router.get('/cart', cartController.cart);
router.get('/cart/add-to-cart/:id', cartController.addToCart);
router.get('/cart/reduce/:id', cartController.reduceByOne);
router.get('/cart/remove/:id', cartController.removeItem);


module.exports = router