import express from "express";
import {sellProduct, addItemToWebsite} from '../controllers/sellProduct.js';
import upload from "../middleware/multer.js";

const sellRouter = express.Router();

// Route for selling product
sellRouter.post('/sell-item', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), sellProduct);


sellRouter.post('/add-item-website/:id', addItemToWebsite);

export default sellRouter;

