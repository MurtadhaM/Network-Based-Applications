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

const Authenticated = require('./middlewares/Authentication');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { env } = require('process');

let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
let secret = env.MONGO_SESSION_SECRET
const uri = `mongodb+srv://${username}:${password}@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority`;

//create app
const app = express();

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

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected');
}
);




app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.name = req.session.name||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride("_method"));
 
// Authentication middleware



//mount event routes


//mount main routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/api', APIRoutes);
 
const api = require('./routes/APIRoutes');
api.use('/api', api);
api.get('/api', (req, res) => {
    res.render('api');
});

app.get('/api',  APIRoutes);
app.get('/api/createUser', APIRoutes);
//error handling
//---

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

app.use((req, res, next)=>{

    if(req.session.user){
        next();
    }   
    else{
        res.redirect('/login');
    }
});


app.get('/users/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}   );

app.delete('/users/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
);
