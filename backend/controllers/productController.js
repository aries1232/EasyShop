import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
import multer from 'multer';  

const upload = multer({ dest: 'uploads/' });  

//create product controller
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;

        // Validation 
        if (!name || !description || !price || !quantity || !category) {
            return res.status(500).send({ message: 'All fields are required' });
        }

        
        if (req.file) {
            if (req.file.size > 1000000) {  
                return res.status(500).send({ message: 'Photo shoudl be < 1MB' });
            }

            const product = new productModel({ 
                name, description, price, category, quantity, shipping,
                photo: { 
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype  
                }
            });

            await product.save();
            res.status(201).send({
                success: true,
                message: 'Product saved',
                product 
            });
        } else {
            return res.status(500).send({ message: 'Photo is required' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        });
    }
};

// get all product controller
export const  getAllProductController = async(req,res) => {
    try{
         const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1});
         res.status(200).send({
            success:true,
            message:' All products feteched successfully',
            countTotal : products.length,
            products,
             
         })

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error while getting all products',
            error,
        })
    }
}

  //category product controller
  export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };

//get single product 
 export const getSingleProductController = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await productModel.findOne({_id : id}).select("-photo").populate("category");

        res.status(200).send({
           success:true,
           message:'product feteched successfully',
           product,
            
        })

   }catch (error) {
       console.log(error);
       res.status(500).send({
           success:false,
           message:'error while getting single product',
           error,
       })
   }

}

//get photo controller
export const  photoProductController = async(req,res) => {
    try{
        const product = await productModel.findOne({_id:req.params.pid}).select("photo");
        if(product.photo.data) {
            res.set('Content-type' , product.photo.contentType);
            res.status(200).send(product.photo.data);
        }

    }catch (error) {
        console.log(error);
        res.status(500).send({
        success:false,
        message:'error while getting photo',
        error,
        })
    }
}

//delete product controller
export const deleteProductController = async(req,res) => {
    try {

         await productModel.findByIdAndDelete(req.params.pid).select("-photo");
         res.status(200).send({
            success:true,
            message:'product deleted successfully',
            
             
         })


    }catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error while deleting product',
            error,
        })
    }
}
//update product controller
export const updateProductController = async(req,res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;

        // Validation 
        if (!name || !description || !price || !quantity || !category) {
            return res.status(500).send({ message: 'All fields are required' });
        }

        
        if (req.file) {
            if (req.file.size > 1000000) {  
                return res.status(500).send({ message: 'Photo shoudl be < 1MB' });
            }

            const product = await  productModel.findByIdAndUpdate(req.params.pid,{...req.body},{new:true});
                
            if(req.file) {
                    product.photo.data =  fs.readFileSync(req.file.path),
                    product.photo.contentType = req.file.mimetype
            }

            await product.save();
            res.status(201).send({
                success: true,
                message: 'Product updated',
                product 
            });
        } else {
            return res.status(500).send({ message: 'Photo is required' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating product',
            error
        });
    }
};

//product count controlller
export const productCountController = async(req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
          success: true,
          total,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          message: "Error in product count",
          error,
          success: false,
        });
      }

};

//filters controller
export const productFiltersController = async(req,res) => {
    try {
        const {checked , radio} = req.body;
        let args = {};
        if(checked.length>0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0] , $lte: radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
          });
        

    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error in filtering Products",
          error,
        });

    }
};

//products list base page
export const productListController = async(req,res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
          .find({})
          .select("-photo")
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error in per page ctrl",
          error,
        });
      }
};

//search product controller 
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

  //similar product controller
  export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };

 

  //payment gatway API

  //tokens
  export const braintreeTokenController = async(req,res) => {
    try{
        gateway.clientToken.generate({function(err,res){
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.send(res);
            }
        }});

    }catch(error) {
        console.log(error)
    }
  }

  //payment
export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };