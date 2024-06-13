const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;

        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Please provide category title or image'
            });
        }

        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: 'New Category added successfully!',
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create category',
            error
        });
    }
};

module.exports = { createCatController };