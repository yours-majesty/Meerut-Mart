import {v2 as cloudinary} from 'cloudinary'
import sellerProductModel from '../models/sellerProductModel.js';

// Function for add product
const sellProduct= async (req,res)=>{
   try {
    const {name,description,price,category,subCategory,sizes,bestseller}=req.body;
    const image1= req.files.image1 && req.files.image1[0];
    const image2= req.files.image2 && req.files.image2[0];
    const image3= req.files.image3 && req.files.image3[0];
    const image4= req.files.image4 && req.files.image4[0];

    const images=[image1,image2,image3,image4].filter((item)=> item !== undefined);

    let imagesUrl=await Promise.all(
        images.map(async (item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url;
        })
    )


    const sellData={
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date: Date.now()
    }

    const product= new sellerProductModel(sellData);
    await product.save();



    res.json({success:true , message:"Product added"});
    
   } catch (error) {
    res.json({success:false, message:error.message})
    console.log(error);
   }
}
export default sellProduct;