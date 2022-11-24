const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const session  = require('express-session');

const app = express();
const PORT =  process.env.PORT || 3000;
const routes = require('./routes/index'); 

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

const exphbs = require('express-handlebars')
const hbs = exphbs.create({extname:'.hbs'})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://leeanh:25062002bin@cluster0.q0bjy.mongodb.net/shopGiay?retryWrites=true&w=majority'
    }),
    cookie: {maxAge: 180 * 60 * 1000}
}));

try{
    mongoose.connect('mongodb+srv://leeanh:25062002bin@cluster0.q0bjy.mongodb.net/shopGiay?retryWrites=true&w=majority')
    console.log('Kết nối Database success')
}
catch(error){
    console.log('Kết nối Database fail')
}

routes(app)

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})

