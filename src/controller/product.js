const product = require('../models/product')
const user = require('../models/user')

class Product {
    
    home(req, res, next) {
        if(req.cookies) {
            var user = req.cookies.user
            res.locals.user = user
        }
        product.find({}).lean()
            .then(product => {
                res.render('product/home',{product})
            }
        )
    }
    
    form(req, res) {
        res.render('product/createProduct')
    }
    
    save(req, res, next) {
        const productSave = new product(req.body)
        console.log(req.body) 
        productSave.save()
        res.redirect('/')
    } 

    delete(req, res, next) {
        product.deleteOne({_id:req.params.id}).lean()
        .then( ()=> {
            // res.send('delete thành cong ',req.params.id)
            console.log('Xóa thành công')
            res.redirect('/')
        })
    }

    getUpdate(req,res,next){
        product.findOne({_id:req.params.id}).lean()
        .then((product)=>{
            res.render('product/updateProduct',{product})
        })
    }

    setUpdate(req,res,next){
        product.updateOne({_id:req.params.id},req.body).lean()
        .then(()=>{
            res.redirect('/')
        })
    }

    infos(req, res) {
        product.findOne({ _id: req.param('id') }).lean()
        .then(product => {
            res.render('product/infoProduct', { product })
        }
        )    
    }

    search(req, res, next) {
        let page = req.query.page;
        if (!req.query.page) {
          page = 1;
        }
        const size = 5
        const limit = size;
        const skip = (page - 1) * size;
    
        Promise.all([
            product.find({ name: req.query.name.toUpperCase() })
            .lean()
            .skip(skip)
            .limit(limit),
        ]).then(([ product]) => {
            res.render('product/searchProduct', { product});
        });
      }
}

module.exports = new Product()