const user = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authentication {
    login(req,res){
        res.render('user/login', {layout: false})
    }

    createUser(req,res){
        res.render('user/createUser', {layout: false})
    }

    async save(req,res){
        var newUser = new user(req.body)
        newUser.save()
        res.redirect('/authentication')
        // try {
        //     const { name, email, password} = req.body ;

        //     if( ! (email && password && name)) {
        //         res.status(400).send("All input is required!!!");
        //     }

        //     const oldUser = await User.findOne({email});

        //     if(oldUser) {
        //         return res.status(409).send("User already exist!!!");
        //     }

        //     const encryptedPassword = await bcrypt.hash(password,10);

        //     const user = await User.create({
        //         name,
        //         email: email.toLowerCase(),
        //         password: encryptedPassword,
        //     });

        //     const token = jwt.sign(
        //         { user_id : user._id, email},
        //         process.env.TOKEN_KEY,
        //         {
        //             expriresIn: "2h",
        //         }
        //     );

        //     user.token = token ;

        //     res.status(201).json(user);
        // } catch (err) {
        //     console.log(err);
        // }
    }

    async access(req,res){
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
        // try {
        //     const {email,password} = req.body;

        //     if( ! (email && password)) {
        //         res.status(400).send("All input is required!!!") ;
        //     }

        //     const user = await User.findOne({email});

        //     if (user && (await bcrypt.compare(password, user.password))) {
        //         const token = jwt.sign(
        //             {user_id: user._id, email},
        //             process.env.TOKEN_KEY,
        //             {
        //                 expriresIn: "2h",
        //             }
        //         );

        //         user.token = token;

        //         res.status(200).json(user);
        //     }
        //     res.status(400).send("Invalid Credentials");
        // } catch (err) {
        //     console.log(err) ;
        // }
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
            res.redirect('/')
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