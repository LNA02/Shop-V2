const routerProduct = require('./routerProduct')

function router(app) {
    app.use('/', routerProduct);
}

module.exports = router