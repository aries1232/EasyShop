import express from 'express'
import {requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js';
import { createCategoryController,
         updateCategoryController , 
         categoryController , 
         singleCategoryController,
         deleteCategoryController
        } from '../controllers/CategoryController.js';


const router = express.Router();

//routes

//create category
router.post('/create-category', requireSignIn , isAdmin , createCategoryController);

//update category
router.put('/update-category/:id', requireSignIn , isAdmin , updateCategoryController);

//get all category
router.get('/get-category', categoryController);

//get single category
router.get('/single-category/:id', singleCategoryController);

//delete category
router.delete('/delete-category/:id' ,  requireSignIn , isAdmin , deleteCategoryController);

export default router;