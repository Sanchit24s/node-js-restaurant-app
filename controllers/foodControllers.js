const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        });

        await newFood.save();

        res.status(201).send({
            success: true,
            message: 'New Food Item Created',
            newFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create food',
            error
        });
    }
};

const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        if (!foods) {
            return res.status(500).send({
                success: false,
                message: 'No Food Available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all food',
            error
        });
    }
};

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: 'Please Provide ID'
            });
        }

        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food Not Found'
            });
        }

        res.status(200).send({
            success: true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get single food',
            error
        });
    }
};

const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please Provide ID'
            });
        }

        const food = await foodModel.find({ restaurant: restaurantId });

        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food Not Found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Food Based on Restaurant',
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get single food',
            error
        });
    }
};

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController };