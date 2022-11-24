const routerProduct = require('./routerProduct')
const cartRoutes = require('./cart');

function router(app) {
    app.use('/', routerProduct);
    app.use('/', cartRoutes)
}

module.exports = router