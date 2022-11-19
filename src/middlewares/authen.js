class authen{
    authentication(req,res,next){
        if(req.cookies.user){
            next()
        }
        else{
            res.redirect('/authentication')
        }
    }
}
module.exports = new authen