import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                success:false,
                message:"name is required"
            })
        }
        const exisiting = await CategoryModel.findOne({name})
        if(exisiting)
        {
            return res.status(200).send({
                success:true,
                message:"category Already exists"
            })
        }
        const category = await new CategoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category added',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"errror in category"
        })
    }
}

export const updateCategoryController = async(req, res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in update",
            error
        })
    }
}

export const categoryController = async(req,res)=>{
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all categories list",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get category",
            error
        })       
    }
}

export const singleCategoryController = async(req,res)=>{
    try {
        const category = await CategoryModel.find({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"single category fetched successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in fetxhing Category",
            error       
        })
    }
}

export const deleteCategoryController = async(req, res)=>{
    try {
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"single category deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in deleting Category",
            error       
        })
    }
}