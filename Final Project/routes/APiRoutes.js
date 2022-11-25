
const express = require('express');
const controller = require('../controllers/apiController');
const router = express.Router();
router.get('/api', controller.api);  
router.get('/api/validate', controller.validate);
router.get('/api/refresh', controller.refresh);
router.get('/api/logout', controller.logout);
router.get('/api/createUser', controller.createUser);
router.get('/api/getUser', controller.getUser);

module.exports = router;