import Seller from '../models/sellerModel.js'; 
const getAllSellers = async (req, res) => {
    try {
        const users = await Seller.find({}); // Retrieve all users
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default getAllSellers;
