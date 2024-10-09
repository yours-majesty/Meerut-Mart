import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopLocation: { type: String, required: true }, 
    contactNumber: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10}$/ 
    },
    email: { 
        type: String, 
        required: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    }, 
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: 'seller' 
    }
});

const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

export default Seller;
