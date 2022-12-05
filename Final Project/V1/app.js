//require modules
const express = require('express');
const DBController = require('./controllers/databaseController');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRouter');
const APIRoutes = require('./routes/APIRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { env } = require('process');
const { setEngine } = require('crypto');
let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
let secret = env.MONGO_SESSION_SECRET || 'secret'
const app = express();
const uri =  'mongodb+srv://dash:Mavaratchi1.@snakemongodb.uvvqkzx.mongodb.net/snake?retryWrites=true&w=majority';
console.log(uri)


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');




app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week

}));
app.use('/', mainRoutes); 
app.use('/users', userRoutes);
app.use('/api/V1', APIRoutes);



let port = process.env.PORT || 8080;
let host = 'localhost';
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}
);
