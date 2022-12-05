#!/bin/bash
# Get the Parameters from the command line
echo "Enter the App Name: "
read app
echo "Enter the Port Number: "
read API_PORT
export API_PORT=$API_PORT
# echo "Enter the MongoDB URI: "
read MONGO_URI
export MONGO_URI=$MONGO_URI

# Create the App
function createApp() {
 
 mkdir $app
cd $app

npm init -y
mkdir models middlewares config routes controllers
touch config/database.js middlewares/auth.js models/user.js app.js index.js
npm install mongoose express jsonwebtoken dotenv bcryptjs
npm install nodemon -D
}

# Create the files
function CreateDBFile(){
    # Create the database.js file

while read line; do echo "$line"; done > config/database.js << EOF




const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
// Connecting to the database
mongoose
.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log("Successfully connected to database");
})
.catch((error) => {
console.log("database connection failed. exiting now...");
console.error(error);
process.exit(1);
});
};

EOF

}


# Create the app.js file
function CreateAppFile(){
    # Create the app.js file
while read line; do echo "$line"; done > app.js << EOF
const express = require('express')

const app = express()

app.use(
  express.json({
    limit: '50mb'
  })
)

app.use('/user', require('./routes/UserRoutes'))

// This should be the last route else any after it won't work
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server'
    }
  })
})

module.exports = app


EOF

echo "App Created Successfully"

echo "Creating the index file"


while read line; do echo "$line"; done > index.js << EOF

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const {
    API_PORT
} = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
    console.log();
});
EOF
}


# Create the .env file
function CreateEnvFile(){
    # Create the .env file
while read line; do echo "$line"; done > .env << EOF
API_PORT=$API_PORT
MONGO_URI=$MONGO_URI
EOF
}

# Create the user.js file
function CreateUserFile(){
    # Create the user.js file
    while read line; do echo "$line"; done > models/user.js << EOF

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    email: {
        type: String,
        required: [true, "email address is required"],
        unique: [true, "this email address has been used"],
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    },

    token: {
        type: String
    },
});

module.exports = mongoose.model("user", userSchema);

EOF
}

# Create the auth.js file
function CreateAuthFile(){
    # Create the auth.js file
while read line; do echo "$line"; done > middlewares/auth.js << EOF
    const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken
EOF
}

# Create the UserRoutes.js file
function CreateUserRoutesFile(){
    # Create the UserRoutes.js file
while read line; do echo "$line"; done > routes/UserRoutes.js << EOF
const Router = require('express').Router;
const router = Router();
const auth = require("../middlewares/auth");

const userController = require('../controllers/userController');

router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

router.post("/register", async (req, res) => {

    userController.register(req, res);
});

router.post("/login", async (req, res) => {

    userController.login(req, res);
});

router.get("/logout", auth, async (req, res) => {
    userController.logout(req, res);
});

router.get("/profile", auth, async (req, res) => {
    userController.me(req, res);
});

module.exports = router;
EOF
}

# Create the userController.js file

function CreateUserControllerFile(){
    # Create the userController.js file
while read line; do echo "$line"; done > controllers/userController.js << EOF
require("dotenv").config();
require("../config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const login = async (req, res) => {

    try {
        // Get user input
        const {
            email,
            password
        } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({
            email
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

};


const register = async (req, res) => {

    try {
        // Get user input
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({
            email
        });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign({
                user_id: user._id,
                email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

}

EOF
}



function Main(){
  echo "Creating the app folder"
  createApp
  echo "Creating the File Contents"
  CreateDBFile
  CreateAppFile
  CreateEnvFile
  CreateUserFile
  CreateAuthFile
  CreateUserRoutesFile
  CreateUserControllerFile


};

Main