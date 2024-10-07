import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminOrSuperAdminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Token Missing" });
        }

        // Decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", token_decode);

    
        if (token_decode.email === process.env.SUPER_ADMIN_EMAIL && token_decode.role === "superadmin") {
            // SuperAdmin is authorized
            req.user = { email: token_decode.email, role: "superadmin" };
            return next();
        }

 
        const user = await userModel.findOne({ email: token_decode.email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }
        console.log("User Found:", user);

        
        
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminOrSuperAdminAuth;

