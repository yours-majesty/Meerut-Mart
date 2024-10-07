import express from 'express';
import sellerController from '../controllers/sellerController';
import authUser from '../middleware/auth.js';
const router = express.Router();

// Define the route for creating a seller

router.post('/become-seller',authUser,sellerController);

export default router;
