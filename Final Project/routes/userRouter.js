
// User router
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; /* this should be after passport*/

const auth = require('../middlewares/Authentication');



//user login
router.get('/login', controller.login);
router.post('/login', controller.loginPost);
//user registration

router.get('/register', controller.register);
router.post('/register', [
    check('firstName').notEmpty().withMessage('first name is required'),
    check('lastName').notEmpty().withMessage('last name is required'),
    check('email').isEmail().withMessage('email address is required'),
    check('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),
    check('password2').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('passwords do not match');
        }
        return true;
    }
    )
], controller.registerPost);
//user profile
router.get('/profile', controller.profile);
//user logout
router.get('/logout', controller.logout);
module.exports = router;