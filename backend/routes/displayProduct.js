// routes/displayProduct.js
import express from 'express';
import SellProduct from '../models/sellerProductModel.js'; // Adjust the path as necessary

const router = express.Router();

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await SellProduct.find(); // Fetch all products from the collection
        res.status(200).json(products); // Send the products as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

