const cart = require('../models/cart')
const product = require('../models/product');

class Cart {

    cart (req, res, next) {
        // if(!req.session.cart) {
        //     return res.render('product/cart', {products: null});
        // }
        // const cart = new Cart(req.session.cart);
        // return res.render('product/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
        res.render('product/cart',{product})
    }


    addToCart (req, res) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
    
        product.findById(productId, function (err, product) {
            if(err) {
                return res.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        })
    }

    reduceByOne (req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productId);
        req.session.cart = cart;
        res.redirect('product/cart');
    }

    removeItem (req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('product/cart');
    }

}
module.exports = new Cart()