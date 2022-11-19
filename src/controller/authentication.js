const user = require('../models/user')
class authentication {
    login(req,res){
        res.render('user/login', {layout: false})
    }
    createUser(req,res){
        res.render('user/createUser', {layout: false})
    }
    save(req,res){
        var newUser = new user(req.body)
        newUser.save()
        res.redirect('/authentication')
    }
    access(req,res){
        user.findOne({email:req.body.email}).lean()
        .then(function(info){
            if(!info){
                res.render('user/login',{err:'Email không đúng',layout: false})  
                return
            }
            if(info.password != req.body.password ){
                res.render('user/login',{err:'Sai mật khẩu',layout: false})  
                return
            }
            res.cookie('user',info.name)
            res.cookie('userId',info._id)
            res.redirect('/')
        }
        )     
    }
    logout(req,res, next) {
        res.clearCookie("user")
        res.redirect('/');
    }
    deleteUser(req, res, next) {
        user.deleteOne({_id:req.params.id}).lean()
        .then( ()=> {
            // res.send('delete thành cong ',req.params.id)
            console.log('Xóa thành công')
            res.redirect('user/profile')
        })
    }
    getUpdateUser(req,res,next){
        user.findOne({_id:req.params.id}).lean()
        .then((user)=>{
            res.render('user/updateUser',{user})
        })
    }

    setUpdateUser(req,res,next){
        user.updateOne({_id:req.params.id},req.body).lean()
        .then(()=>{
            res.redirect('/')
        })
    }
    profile(req, res, next) {
        user.find({}).lean()
            .then(user => {
                res.render('user/profile',{user})
            }
        )
    }
}
module.exports = new authentication