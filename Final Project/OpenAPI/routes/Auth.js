/**
 * This is the JWT Authentication API
 */
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const AuthController = require('../controllers/Auth');




/**
 * Generate a JWT token through POST
 */

router.post('/generateToken', (req, res) => {
    AuthController.generateToken(req, res); 
});

router.get('/generateToken', (req, res) => {
 
    AuthController.generateToken(req, res);
});

module.exports = router;