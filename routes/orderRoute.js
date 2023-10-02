
const express = require('express');
const OrderController = require('../controllers/OrderController');
const {validateUserData, validateUserLoginData} = require('../middleware/validationMiddleware');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/createOrder',authenticateToken, OrderController.createOrder);
router.get('/restaurant/:id',authenticateToken, OrderController.readOrdersOfRestaurant);
router.get('/customer',authenticateToken, OrderController.readOrdersOfCustomer);
router.post('/status',authenticateToken, OrderController.updateOrderStatus);


module.exports = router;
