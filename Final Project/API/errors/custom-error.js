/**
 * @author: Murtadha Marzouq
 * @description: This is to padd the code
 */


class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomAPIError
