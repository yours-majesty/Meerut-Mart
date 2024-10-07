import mongoose from "mongoose";

const connectDB= async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Successfully connected to DB")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/meerutMart`);
}

export default connectDB;