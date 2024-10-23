import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
