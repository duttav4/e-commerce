import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

export const createProductController = async(req, res)=>{
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name:
                return res.status.send({message:"name is required"})
            case !description:
                return res.status.send({message:"description is required"})
            case !price:
                return res.status.send({message:"price is required"})
            case !category:
                return res.status.send({message:"category is required"})
            case !quantity:
                return res.status.send({message:"quantity is required"})
            case photo && photo.size >1000000:
                return res.status.send({message:"photo is required and should be less than 1 mb"})
        }
        const products = new ProductModel( { ...req.fields, slug: slugify( name ) } )
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:"product saved successfully",  
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create Product",
            error
        })
    }
}

export const getProductController = async(req,res)=>{
    try {
        const products = await ProductModel
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count: products.length,
            message:"all products", 
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"product error",
            error
        })
    }
}

export const getSingleProductController = async(req,res)=>{
    try {
        const product = await ProductModel
        .findOne({slug:req.params.slug})
        .populate('category')
        .select('-photo')
        res.status(200).send({
            success:true,
            message:'single product fetced',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"product error",
            error
        })
    }
}

export const productPhotoCOntroller = async(req,res)=>{
    try {
      const product = await ProductModel.findById(req.params.pid).select('photo')
      if(product.photo.data){
        res.set('contentType', product.photo.contentType)
      }
      return res.status(200).send(product.photo.data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"product error",
            error
        })
    }
}

export const deleteProductController = async(req,res)=>{
    try {
      await ProductModel.findByIdAndDelete(req.params.pid).select('-photo')
      return res.status(200).send({
        success:true,
        message:"product deleted"
      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"product error",
            error
        })
    }
}

export const updateProductController = async(req,res)=>{
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name:
                return res.status.send({message:"name is required"})
            case !description:
                return res.status.send({message:"description is required"})
            case !price:
                return res.status.send({message:"price is required"})
            case !category:
                return res.status.send({message:"category is required"})
            case !quantity:
                return res.status.send({message:"quantity is required"})
            case photo && photo.size >1000000:
                return res.status.send({message:"photo is required and should be less than 1 mb"})
        }
        const products = new ProductModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify( name ) }, {new:true} )
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:"product updated successfully",  
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update Product",
            error
        })
    }
}