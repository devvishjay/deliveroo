
const express = require('express');
const RestaurantController = require('../controllers/RestaurantController');
const {validateCreateRestaurantData} = require('../middleware/validationMiddleware');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create',authenticateToken ,validateCreateRestaurantData, RestaurantController.createRestaurant);

router.get('/myRestaurants',authenticateToken, RestaurantController.readRestaurantsOfUser);

router.get('/:id', RestaurantController.readRestaurant);

router.put('/update/:id',authenticateToken, RestaurantController.updateRestaurant);

router.delete('/:id',authenticateToken, RestaurantController.deleteRestaurant);


module.exports = router;
