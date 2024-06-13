const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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
            message: 'Error in get food by restaurant',
            error
        });
    }
};

const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide ID'
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food not found'
            });
        }

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

        const updateFood = await foodModel.findByIdAndUpdate(
            foodId,
            {
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
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: 'Food Updated Successfully!'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update food',
            error
        });
    }
};

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide ID'
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food not found'
            });
        }

        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: 'Food deleted successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete food',
            error
        });
    }
};

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: 'Please add card or payment method'
            });
        }
        let total = 0;

        cart.map((i) => {
            total += i.price;
        });

        const newOrder = await orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        });

        await newOrder.save();

        res.status(200).send({
            success: true,
            message: 'Order Placed Successfully',
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in place order',
            error
        });
    }
};

module.exports = {
    createFoodController, getAllFoodController, getSingleFoodController,
    getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController
};