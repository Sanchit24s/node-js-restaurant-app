const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantControllers } = require('../controllers/restaurantControllers');

const router = express.Router();

router.post('/create', authMiddleware, createRestaurantControllers);

module.exports = router;