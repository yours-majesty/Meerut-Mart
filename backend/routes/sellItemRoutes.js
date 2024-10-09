import express from 'express';
import multer from 'multer';
import path from 'path';
import sellerProductModel from '../models/sellerProductModel.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });


router.post('/sell-item', upload.array('productPhotos', 4), async (req, res) => {
  try {
    const { shopName, productName, productQuantity, productPrice, productCategory, productSubCategory, vendorNumber } = req.body;
    
    const productPhotos = req.files.map(file => file.filename); // Array of uploaded photo filenames

    const newItem = new sellerProductModel({
      shopName,
      productName,
      productQuantity,
      productPrice,
      productCategory,
      productSubCategory,
      vendorNumber,
      productPhotos
    });

    await newItem.save();

    res.status(201).json({ success: true, message: 'Product listed successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
