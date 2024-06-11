const restaurantModel = require("../models/restaurantModel");

const createRestaurantControllers = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: 'Please provide title and address'
            });
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });

        await newRestaurant.save();

        res.status(200).send({
            success: true,
            message: 'New Restaurant Created Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create restaurant',
            error
        });
    }
};

const getAllRestaurantController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.find({});
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: restaurant.length,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all restaurant',
            error
        });
    }
};

const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide restaurant id'
            });
        }

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant found'
            });
        }

        res.status(200).send({
            success: true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get restaurant',
            error
        });
    }
};

const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide restaurant id'
            });
        }

        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'Restaurant not found'
            });
        }

        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete restaurant',
            error
        });
    }
};

module.exports = { createRestaurantControllers, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController };