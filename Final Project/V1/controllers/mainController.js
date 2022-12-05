//site navigation

const User = require("../models/user");

exports.index = (req, res)=>{
    res.render('./', {user: req.session.user});
};

exports.about = (req, res)=>{

    res.render('./about', {user: req.session.user});
};

exports.contact = (req, res)=>{
    res.render('./contact', {user: req.session.user});
};

exports.logout = (req, res)=>{
    req.session.user = null;
    res.redirect('/');
}




