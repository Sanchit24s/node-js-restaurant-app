const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        if (!userName || !email || !password || !phone || !address) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'Email Already Registered Please Login'
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address
        });
        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in register',
            error
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email or password'
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: 'Login Successful',
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};

module.exports = { registerController, loginController };