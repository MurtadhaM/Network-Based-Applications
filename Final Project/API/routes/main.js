/**
 * @author: Murtadha Marzouq
 * @description: The routes of the API
 */
const express = require('express')
const router = express.Router()

const apiController = require('../controllers/main')
const authMiddleware = require('../middleware/auth')

/**
 * ------- ROUTES THAT NEED AUTHENTICATION ------
 * {ROUTES THAT ARE: SENSITIVE AND FORCED TO CHECKED AUTH}
 */
/**  DYNAMIC  */

router.get('/createUser', authMiddleware, apiController.createUser)
router.route('/validate').post(apiController.validate)
router.route('/refresh').post(apiController.validate)

/** STATIC   */
router.route('/profile').get(authMiddleware, apiController.createUser)
router.delete('/logout', authMiddleware, apiController.logout)



/**
 *  ------- ROUTES THAT DO NOT NEED AUTHENTICATION ------
 */
/** DYNAMIC  */
router.route('/login').post(apiController.login)
router.route('/register').post(apiController.createUser)
router.route('/register').put(apiController.createUser)


/** STATIC */
router.route('/contact').get(apiController.login)
router.route('/about').get(apiController.login)
router.route('/').get(apiController.login)




// Allowing The Router To Be Used In Other Files
module.exports = router
