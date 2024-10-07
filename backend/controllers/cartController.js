// cartController.js
import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body; // Removed userId from here
        const userId = req.userId; // Use userId from the token
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Make sure to handle cases where cartData is undefined

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body; // Removed userId from here
        const userId = req.userId; // Use userId from the token
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Make sure to handle cases where cartData is undefined

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
        } else {
            return res.status(400).json({ success: false, message: "Item or size does not exist in cart." });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId; // Use userId from the token
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Make sure to handle cases where cartData is undefined
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart };
