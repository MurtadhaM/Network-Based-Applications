const express = require('express');
const controller = require('../controllers/mainController');


const router = express.Router();

//site navigation

router.route('/' ).get( (req, res) => {
    controller.index(req, res);
});

router.route('/about').get( (req, res) => {
   res.render('about', {user: req.session.user});
});

router.route('/contact').get( (req, res) => {
    controller.contact(req, res);
});

router.route('/users').get( (req, res) => {
 res.render('index', {user: req.session.user});
});

router.route('/logout').get( (req, res) => {

    controller.logout(req, res);
});

module.exports = router;


