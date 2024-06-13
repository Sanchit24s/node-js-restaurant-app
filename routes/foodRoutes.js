const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController,
    getFoodByRestaurantController, updateFoodController, deleteFoodController } = require('../controllers/foodControllers');

const router = express.Router();

router.post('/create', authMiddleware, createFoodController);

router.get('/getAll', getAllFoodController);

router.get('/get/:id', getSingleFoodController);

router.get('/getByRestaurant/:id', getFoodByRestaurantController);

router.put('/update/:id', authMiddleware, updateFoodController);

router.delete('/delete/:id', authMiddleware, deleteFoodController);

module.exports = router;