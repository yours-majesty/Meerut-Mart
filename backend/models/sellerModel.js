import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopLocation: { type: String, required: true }, 
    contactNumber: { type: String, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;

