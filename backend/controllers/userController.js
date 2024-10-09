import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from '../models/adminModel.js';
import Seller from '../models/sellerModel.js';
import validator from "validator"; 
import User from '../models/userModel.js'; 


const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d' 
    });
};

// Route for user login
const loginUser = async (req, res) => {
    const { email } = req.body;

    try {
       
        let user = await User.findOne({ email });

        if (user) {
        
            const token = createToken(user._id, 'user'); 

            return res.status(200).json({
                success: true,
                token,
                role: 'user' 
            });
        } else {
            // If user is not found in User collection, check Seller collection
            let seller = await Seller.findOne({ email });

            if (seller) {
               
                const token = createToken(seller._id, 'seller');  

                return res.status(200).json({
                    success: true,
                    token, 
                    role: 'seller' 
                });
            }
        }

        // If neither user nor seller is found
        res.status(401).json({ success: false, message: 'Invalid credentials' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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
