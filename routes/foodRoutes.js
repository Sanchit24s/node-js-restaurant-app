const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController } = require('../controllers/foodControllers');

const router = express.Router();

router.post('/create', authMiddleware, createFoodController);

router.get('/getAll', getAllFoodController);

router.get('/get/:id', getSingleFoodController);

router.get('/getByRestaurant/:id', getFoodByRestaurantController);

module.exports = router;