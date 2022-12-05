/**
 *  This is the JWT Authentication API Controller
 */

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const secret = process.env.SECRET || 'secret';
const User = require('../models/User');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret
};

/**
 * This is the Model for the User
 */
 const MongoClient = require('mongodb').MongoClient;
 const mongoose = require('mongoose');
 const uri = process.env.uri 
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
 
 const connectDB = (url) => {
     console.log(url)
     return mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
     }).then(() => {
         console.log("Database connected with uri: " + url);
     }).catch((err) => {
 
         console.log(err);
     });
 }
 
 connectDB(uri)

/**
 * Generate a JWT token through POST
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {string} token - The JWT token
 * @returns {string} message - The message
 * @returns {string} status - The status
 * @returns {string} error - The error
 * @returns {string} success - The success
 * */


const generateToken =  (req, res) => {
    const { email, password } = req.body || req.query || req.params;
    // Check if the user exists
    console.log(email + " " + password);
    User.findOne
    (
        {
            email
        }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json
            (
                {
                    message: 'User not found',
                    status: 'error',
                    error: 'User not found',
                    success: false
                }
            );

        }
        // Check if the password is correct
        user.comparePassword(password)

        .then(isMatch => {
            if (isMatch) {
                // Create the JWT token
                const payload = {

                    id: user.id,
                    email: user.email
                };
                jwt.sign
                (
                    payload,
                    secret,
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json
                        (
                            {
                                success: true,
                                token: 'Bearer ' + token
                            }
                        );
                    }
                );
            } else {
                return res.status(400).json
                (
                    {
                        message: 'Password incorrect',
                        status: 'error',
                        error: 'Password incorrect',
                        success: false
                    }
                );
            }
        });
    });
};




module.exports = {
    generateToken
};

