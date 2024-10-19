const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const registerUser = async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashPassword });
        await user.save();

        resp.status(201).json({ message: "User registered successfully" });
    }catch(err) {
        console.log(err);
        resp.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, resp) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('password');

        if(!user) {
            resp.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            resp.status(401).json({
                message: "Invalid credentials"
            });
        }

        const tokenData = {
            id: user._id,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

        resp.status(201).json({
            token,
            message: "User logged in successfully"
        });
    }catch(err) {
        resp.status(500).json({ message: err.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
}