const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantControllers, getAllRestaurantController, getRestaurantByIdController } = require('../controllers/restaurantControllers');

const router = express.Router();

router.post('/create', authMiddleware, createRestaurantControllers);

router.get('/getAll', getAllRestaurantController);

router.get('/get/:id', getRestaurantByIdController);

module.exports = router;