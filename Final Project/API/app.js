/**
 * @author: Murtadha Marzouq
 * @description: This is the main entry point of the application
 */

// Importing the important modules
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// Importing the routes
const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// Importing & Assigning The Middlewares
app.use(express.static('./public'));
app.use(express.json());
// Binding The Routes
app.use('/api/v1', mainRouter);
// Handing Exceptions
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// SESSIONS
const uri =  'mongodb+srv://dash:Mavaratchi1.@snakemongodb.uvvqkzx.mongodb.net/snake?retryWrites=true&w=majority';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
    

const secret = process.env.MONGO_SESSION_SECRET || 'secret';

// SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');

const DBController = require('./db/connect');
let mongoConnection = DBController(uri);

// Create a session
DBController(uri).then(() => {
  
    app.use(session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: uri }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
    }));
  })
    

app.use(session({

    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
,

    database: 'snake'
}));



// Port Setting
const port = process.env.PORT || 8080;

// Starting The Server Asynchronously
const start = () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  }
  catch (err) {
    console.log(err);
  }
};






/**
 * --------------------- Invoke Function ---------------------
 */

start();

/**
 *  --------------------- IF EXCUTION REACHES HERE, We are in hot shit!! ---------------------
 */