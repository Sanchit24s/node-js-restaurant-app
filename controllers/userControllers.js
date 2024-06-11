const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User get successfully',
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();

        res.status(200).send({
            success: true,
            message: 'User Updated Successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in update user',
            error
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: 'Please provide old or new password'
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Old Password'
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password Updated!'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in update password',
            error
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password reset successfully!'
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in reset password',
            error
        });
    }
};

const deleteProfileController = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'User Profile Deleted'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in delete profile',
            error
        });
    }
};

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };