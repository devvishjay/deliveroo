
const express = require('express');
const customerController = require('../controllers/CustomerController');
const {validateCustomerData, validateCustomerLoginData} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', validateCustomerData, customerController.register);
router.post('/login', validateCustomerLoginData, customerController.login);



module.exports = router;
