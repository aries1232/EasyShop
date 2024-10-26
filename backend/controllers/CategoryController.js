import categoryModel from '../models/categoryModel.js'


//create category
export const createCategoryController = async(req,res) => {
    try{
        const {name} = req.body;
        if(!name) {
            return res.status(401).send({message:'name is required'});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success:true,
                message:'category already exist',
            })
        }
        const cateogry = await new categoryModel({name}).save();
        res.status(201).send({
            success:true,
            message:'category created successfully',
            cateogry,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'error in category',
            error

        })
    }

}

//update category 
export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id,{name},{new:true});
        res.status(200).send({
            success:true,
            message:'category updated successfully !',
            category,
        })

    } catch (error) {
        console.log(error),
        res.status(500).send({
            success : false,
            message : "error in updating category",
            error,
        })
    }
}

// get all category 
export const categoryController = async(req,res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'all categories',
            category,
        })

    }catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in finding all categories',
            error,
        })
    }
}

//get single cateogry 
export const singleCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findOne({_id : id});
        res.status(200).send({
            success:true,
            message:'single category get successful !',
            category,
        })

    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in  finding single categories',
            error,
        })
        
    }
};

// delete category
export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        await categoryModel.deleteOne({_id : id});
        res.status(200).send({
            success:true,
            message:"category deleted successfully !",
        })
        

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while deleting category !",
            error
        })
    }
}