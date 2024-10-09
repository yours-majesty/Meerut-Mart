import mongoose from 'mongoose';
import validator from 'validator';

const sellerProductSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  productName: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productSubCategory: { type: String },
  vendorNumber: { type: String, required: true },
  productPhotos: { type: [String], required: true } 
}, { timestamps: true });

const sellerProductModel = mongoose.model("sellProduct",sellerProductSchema);

export default sellerProductModel;
