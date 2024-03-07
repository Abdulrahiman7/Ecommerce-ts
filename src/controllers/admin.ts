
import { Request, Response, NextFunction } from 'express';
import { Product } from '../model/Product';


export const addProduct=async (req:Request, res:Response, next:NextFunction)=>{
    try{
    const {title, price, description, imageUrl, id}=req.body
    const product:Product=new Product(title, price, description, imageUrl, id);
    
    product.save();
    console.log(product);
    res.status(200).json(product);
    }
    catch(err) {
        console.log(err);
    };

}

export const fetchProducts =async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const allProducts=await Product.fetchAll();
    
     res.status(200).json(allProducts);
    }
    catch(err) {
        console.log(err)
    };

}

export const fetchProductById =async (req:Request, res:Response, next:NextFunction)=>{
    try{
        console.log('entered controllers');
        const prodId:string=req.params.id;
        console.log(prodId);
        const product=await Product.findById(prodId);
    
     res.status(200).json(product);
    }
    catch(err) {
        console.log('Error in the controller of admin');
    };

}



export const deleteProduct=async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const prodId:string=req.params.id;
        const product=await Product.deleteById(prodId);
    
     res.status(200).json(product);
    }
    catch(err) {
        console.log(err)
    };

}