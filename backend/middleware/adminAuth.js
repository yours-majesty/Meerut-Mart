import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Token Missing" });
        }

        // Decode token to extract email
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      

        // Find user by email instead of ID
        const user = await userModel.findOne({ email: token_decode.email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }
        console.log("User Found:", user);

        // Check if user is admin
      

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;

