import User from '../models/userModel.js'; 
import Seller from '../models/sellerModel.js'; 

const sellerController = async (req, res) => {
    const { contactNumber, shopLocation,addharCard,panCard, email } = req.body; 
    const userId = req.body.userId; 

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        console.log("Searching for user with ID:", userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a seller instance
        const seller = await Seller.create({
            userId, 
            contactNumber,
            addharCard,
            panCard,
            shopLocation,
            email, 
            password: user.password, 
            role: 'seller' 
        });

        res.status(201).json({ success: true, seller });
    } catch (error) {
        console.error('Error creating seller:', error);
        res.status(500).json({ success: false, message: 'Failed to create seller. Please try again.' });
    }
};

export default sellerController;
