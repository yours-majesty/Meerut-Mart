import userModel from '../models/userModel.js'; 
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}); // Retrieve all users
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default getAllUsers;
