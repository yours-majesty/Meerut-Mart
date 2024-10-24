import express from 'express';
import Review from '../models/reviewModel.js';

const router = express.Router();

// Endpoint to create a review
router.post("/product/:id/reviews", async (req, res) => {
  const { id: productId } = req.params; // Get productId from URL params
  const { userName, rating, reviewText } = req.body;

  try {
    // Create a new review associated with the product
    const newReview = new Review({ productId, userName, rating, reviewText });
    await newReview.save();
    res.status(201).json({ message: "Review saved successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error saving review" });
  }
});

// Endpoint to fetch all reviews for a specific product
router.get("/product/:id/reviews", async (req, res) => {
  const { id: productId } = req.params; // Get productId from URL params
  
  try {
    // Fetch reviews associated with the product
    const reviews = await Review.find({ productId });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: "Error fetching reviews" });
  }
});

export default router;
