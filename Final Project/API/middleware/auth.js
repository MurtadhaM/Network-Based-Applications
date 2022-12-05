/**
 * @author: Murtadha Marzouq
 * @description: This is invoked every request to sensitive routes
 * @see #Club_Bouncer https://i.pinimg.com/736x/dc/5c/39/dc5c396f462a77034f76d70986acf76a.jpg
 */


// Importing a pre-build library cause who has time to write their own
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  // Chop off the Bearer part
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware
