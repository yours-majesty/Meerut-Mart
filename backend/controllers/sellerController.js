import User from '../models/userModel.js'; // Adjust the path as necessary
import Seller from '../models/sellerModel.js'; // Adjust the path as necessary

const becomeSeller = async (req, res) => {
    const { contactNumber, shopLocation } = req.body;
    const userId = req.body.userId; // Ensure this comes from the token

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a seller instance
        const seller = await Seller.create({
            userId, // Use the found user's ID
            contactNumber,
            shopLocation,
        });

        res.status(201).json({ success: true, seller });
    } catch (error) {
        console.error('Error creating seller:', error);
        res.status(500).json({ success: false, message: 'Failed to create seller. Please try again.' });
    }
};

