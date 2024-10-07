import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from '../models/adminModel.js';

import validator from "validator"; 

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists with the same email." });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please use a strong password of at least 8 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// Route for super admin login
const superAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate credentials
        if (email === process.env.SUPER_ADMIN_EMAIL && password === process.env.SUPER_ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, role: 'superadmin' }, 
                process.env.JWT_SECRET
            );
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Promote a user to admin

const promoteToAdmin = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if the user is already an admin
        const existingAdmin = await Admin.findOne({ email: user.email });
        if (existingAdmin) {
            return res.json({ success: false, message: "User is already an admin" });
        }

        
        const hashedPassword = user.password; 
        const newAdmin = new Admin({ email: user.email, password: hashedPassword });
        await newAdmin.save();

        res.json({ success: true, message: "User promoted to admin" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Demote an admin to a regular user
const demoteToUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        await Admin.findOneAndDelete({ email: user.email });

        res.json({ success: true, message: "Admin demoted to user" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { loginUser, registerUser, superAdminLogin, promoteToAdmin, demoteToUser };
