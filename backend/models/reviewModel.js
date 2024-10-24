import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",
    required:true
  },
  userName: {
        type: String,
        required: true
    },
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
