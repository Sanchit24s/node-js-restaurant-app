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

const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        if (!categories) {
            return res.status(404).send({
                success: false,
                message: 'No categories available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all category',
            error
        });
    }
};

const updateCatController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: 'No category found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update category',
            error
        });
    }
};

const deleteCatController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(500).send({
                success: false,
                message: 'No category found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete category',
            error
        });
    }
};

module.exports = { createCatController, getAllCatController, updateCatController, deleteCatController };