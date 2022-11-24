const mongoose =require('mongoose');
const  Schema  = mongoose.Schema;
const user = new Schema({
    email:String,
    password:String,
    name:String,
    token:String,
})
module.exports = mongoose.model('users', user);
