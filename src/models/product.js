const mongoose =require('mongoose');
var slug = require('mongoose-slug-generator')
const  Schema  = mongoose.Schema;
mongoose.plugin(slug);

const product = new Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
});

module.exports = mongoose.model('products', product);

