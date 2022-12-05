const jwt = require("jsonwebtoken");

const config = process.env;

// SETTING THE JWT SECRET KEY
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || "jwtPrivateKey";


const verifyToken = (req, res, next) => {
const token =
req.body.token || req.query.token || req.headers["authorization"];
 
if (!token) {
return res.status(403).send("A token is required for authentication");
}
try {
    
    // Get the token from the request
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, jwtPrivateKey);
    console.log(decoded);
    
    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
        return res.status(401).send("Token has expired");
    }

    // Attach the user to the request object
    req.user = decoded;
    next();
} catch (err) {
return res.status(401).send("Invalid Token");
}
};

module.exports = verifyToken
