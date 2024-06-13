const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController,
    getFoodByRestaurantController, updateFoodController, deleteFoodController,
    placeOrderController,
    orderStatusController } = require('../controllers/foodControllers');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createFoodController);

router.get('/getAll', getAllFoodController);

router.get('/get/:id', getSingleFoodController);

router.get('/getByRestaurant/:id', getFoodByRestaurantController);

router.put('/update/:id', authMiddleware, updateFoodController);

router.delete('/delete/:id', authMiddleware, deleteFoodController);

router.post('/placeOrder', authMiddleware, placeOrderController);

router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;