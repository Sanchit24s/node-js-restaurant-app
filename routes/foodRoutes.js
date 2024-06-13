const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController } = require('../controllers/foodControllers');

const router = express.Router();

router.post('/create', authMiddleware, createFoodController);

module.exports = router;