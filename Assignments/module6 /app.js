/*
    Murtadha Marzouq
*/

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const storyRoutes = require('./routes/storyRoutes');

//create app
const app = express();
app.engine('ejs', require('ejs').renderFile);


//configure app
let port = 3000;
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/stories', storyRoutes);

app.use((req,res,next) =>{
    let err = new Error('Server cannot locate ' +req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = 'Internal Server Error';
    }

    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
app.listen(port, '127.0.0.1', () => {
    console.log('Server started on port ', port);
});