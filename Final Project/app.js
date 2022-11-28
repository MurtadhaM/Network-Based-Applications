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
let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
let secret = env.MONGO_SESSION_SECRET
const app = express();
const uri = `mongodb+srv://${username}:${password}@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority`;
app.set('view engine', 'ejs');
const path = require('path');

app.use(flash());
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret:env.MONGO_SESSION_SECRET,
      cookie: { secure: false, maxAge: 14400000 },
    })
    
);










// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');
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
// ROUTES
app.use('/', mainRoutes); 
app.use('/users', userRoutes);
app.use('/api/V1', APIRoutes);



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

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}
);

