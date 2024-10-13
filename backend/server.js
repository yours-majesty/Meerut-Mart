import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; 
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import sellerRoutes from './routes/sellerRoutes.js'; 
import sellItemRoutes from './routes/sellItemRoutes.js';
import displayProductRouter from './routes/displayProduct.js'; 

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Initialize Cloudinary
connectCloudinary();
   

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API Endpoints
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);
    app.use('/api', sellerRoutes);
    app.use('/api', sellItemRoutes);
    app.use('/api/displayproduct', displayProductRouter);

    app.get('/', (req, res) => {
        res.send("API working");
    });

    app.listen(port, () => console.log('Server started on PORT: ' + port));


// Initialize the application

