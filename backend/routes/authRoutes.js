import express from "express";
import {registerController , loginController , testController , forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register
router.post('/register',registerController);

//login
router.post('/login',loginController);

//forget password
router.post('/forgot-password',forgotPasswordController);

//TEST route
router.post('/test', requireSignIn , isAdmin,  testController);

export default router;