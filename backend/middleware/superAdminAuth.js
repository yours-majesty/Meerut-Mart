import jwt from "jsonwebtoken";

const superAdminAuth = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers['authorization']?.split(' ')[1]; 
   

  

   
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, Login Again" });
    }

   
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    

    if (
      token_decode.email !== process.env.SUPER_ADMIN_EMAIL || 
      token_decode.role !== "superadmin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized,Only for SuperAdmins" });
    }

    // If the email and role match, proceed
    req.user = { email: token_decode.email, role: token_decode.role };
    next(); 
  } catch (error) {
    console.log("Error in superAdminAuth:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
   

export default superAdminAuth;

