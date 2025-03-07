import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController,
        braintreeTokenController,
        createProductController,
        deleteProductController,
        getProductController,
        getSingleProductController,
        productCategoryController,
        productCountController,
        productFiltersController,
        productListController,
        photoProductController,
        realtedProductController,
        searchProductController,
        updateProductController,
        } from "../controllers/productController.js";
import multer from 'multer';
 
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
//routes
//create product route
router.post('/create-product' , requireSignIn , isAdmin ,upload.single('photo') , createProductController);

//get product route
router.get('/get-product' , getProductController);

//get single product 
router.get('/get-product/:id' , getSingleProductController);

//photo route
router.get('/product-photo/:pid', photoProductController);

//delete product
router.delete('/product/:pid' , deleteProductController);

//update product 
router.put('/update-product/:pid' , requireSignIn , isAdmin ,upload.single('photo') , updateProductController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get("/product-list/:page", productListController);

//filter product
router.post("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;