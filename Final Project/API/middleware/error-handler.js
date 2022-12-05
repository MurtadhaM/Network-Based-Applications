/**
 * @author: Murtadha Marzouq
 * @description: This is the "I have no idea why it failed" exception handler
 */
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const e = require('express')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.status(StatusCodes.BAD_REQUEST).send('Invalid JSON')

  }
  else if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  else {
  console.log(err)
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong try again later')
}
}

module.exports = errorHandlerMiddleware
