
const express = require('express');
const MenuController = require('../controllers/MenuController');
const {validateCreateDishData, validateCreateDishItemData} = require('../middleware/validationMiddleware');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/createCategory',authenticateToken, MenuController.createDishCategory);
router.get('/readDishCategory',authenticateToken, MenuController.readDishCategory);
router.delete('/deleteDishCategory/:id',authenticateToken, MenuController.deleteDishCategory);
router.post('/createDish',authenticateToken,validateCreateDishData, MenuController.createDish);
router.get('/readDishes/:id',authenticateToken, MenuController.readDishByRestaurant);
router.put('/updateDish/:id',authenticateToken, MenuController.updateDish);
router.delete('/deleteDish/:id',authenticateToken, MenuController.deleteDish);
router.post('/createDishItem',authenticateToken,validateCreateDishItemData, MenuController.createDishItem);
router.put('/updateDishItem/:id',authenticateToken, MenuController.updateDishItem);
router.delete('/deleteDishItem/:id',authenticateToken, MenuController.deleteDishItem);


module.exports = router;
