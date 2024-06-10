const userModel = require("../models/userModel");

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

        const user = await userModel.create({
            userName,
            email,
            password,
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

        const user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found Or Password Mismatch'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Login Successful',
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