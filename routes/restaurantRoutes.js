const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantControllers, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantControllers');

const router = express.Router();

router.post('/create', authMiddleware, createRestaurantControllers);

router.get('/getAll', getAllRestaurantController);

router.get('/get/:id', getRestaurantByIdController);

router.delete('/delete/:id', authMiddleware, deleteRestaurantController);

module.exports = router;