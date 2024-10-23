import { useState, useEffect } from "react";
import axios from "axios";

const Review = () => {
  // State to manage review and rating
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]); 
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

  // Function to fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reviews`); // Adjust the URL based on your server
      setReviews(response.data); // Set the fetched reviews in the state
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (rating && reviewText) {
      try {
        const response = await axios.post(`${backendUrl}/api/reviews`, {
          rating,
          reviewText,
        });
        console.log(response.data.message); // Log success message from backend
        setRating(0); // Reset form
        setReviewText("");
        fetchReviews(); // Refresh the reviews after submission
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  // Fetch reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>

      {/* Rating System */}
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-8 h-8 cursor-pointer ${
              (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27l5.18 3.73-1.64-6.03L20.6 9.24l-6.18-.51L12 3 9.58 8.73 3.4 9.24l4.46 5.73L6.18 21z" />
          </svg>
        ))}
      </div>

      {/* Review Input */}
      <textarea
        className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        disabled={rating === 0 || reviewText === ""}
      >
        Submit Review
      </button>

      {/* Display Submitted Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-center">User Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="mb-4 border p-4 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27l5.18 3.73-1.64-6.03L20.6 9.24l-6.18-.51L12 3 9.58 8.73 3.4 9.24l4.46 5.73L6.18 21z" />
                  </svg>
                ))}
              </div>
              <p>{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;

