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

module.exports = { createRestaurantControllers };