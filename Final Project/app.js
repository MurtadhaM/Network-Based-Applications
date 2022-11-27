//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRouter');
const APIRoutes = require('./routes/APIRoutes');
const ejs = require('ejs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { env } = require('process');
let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
let secret = env.MONGO_SESSION_SECRET
const app = express();
const uri = `mongodb+srv://${username}:${password}@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority`;
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use( (req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.router = express.Router();
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: 'snake',
        collectionName: 'sessions',
        ttl: 60 * 60 * 24 * 7,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/api', APIRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});

//create app

//configure app
let port = 8080;
let host = 'localhost';
app.set('view engine', 'ejs');


mongoose.connect(uri, 
                {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    //start app
    app.listen(port, host, ()=>{
        console.log(`Server is running on port http://localhost:${port}`);
    });
})
.catch(err=>console.log(err.message));






//mounting session and flash
app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: uri}),
        
        cookie: {maxAge: 60*60*1000}
        })
);
app.use('ejs', express.static('views'));
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected');
}
);



//mounting routes
// Setup the Routes
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/api/V1/', APIRoutes);



