import express from 'express';
import sellerController from '../controllers/sellerController.js';
import authUser from '../middleware/auth.js';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();



router.post('/become-seller',authUser,sellerController);

export default router;
