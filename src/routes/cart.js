// const express = require('express')
// const cartController = require('../controller/cart')

// const router = express.Router();

// router.get('/cart/cartHome', cartController.cartHome)
// router.get('/cart/add-to-cart/:id', cartController.addToCart)
// router.get('/cart/reduce/:id', cartController.reduceByOne)
// router.get('/cart/remove/:id', cartController.removeItem)


// module.exports = router

const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/product');

router.get('/cart/add-to-cart/:id', function (req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
});

router.get('/cart/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('product/cart');
});

router.get('/cart/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('product/cart');
});

router.get('/cart', function (req, res, next) {
    const cart = new Cart(req.session.cart);
    if(!req.session.cart) {
        return res.render('product/cart', {products: null});
    }
    
    return res.render('product/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;