
const express = require('express');
const UserController = require('../controllers/UserController');
const {validateUserData, validateUserLoginData} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', validateUserData, UserController.register);
router.post('/login', validateUserLoginData, UserController.login);



module.exports = router;
