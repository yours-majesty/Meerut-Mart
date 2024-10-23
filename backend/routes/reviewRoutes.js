import express from 'express'
import Review from '../models/reviewModel.js'

// import the Review model
const router = express.Router();

// Endpoint to create a review
router.post("/reviews", async (req, res) => {
  const { rating, reviewText } = req.body;
  try {
    const newReview = new Review({ rating, reviewText });
    await newReview.save();
    res.status(201).json({ message: "Review saved successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error saving review" });
  }
});

// Endpoint to fetch all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: "Error fetching reviews" });
  }
});

export default router;

