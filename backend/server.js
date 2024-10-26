import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from '../backend/config/db.js';
import authRoutes from './routes/authRoutes.js'
import JWT from 'jsonwebtoken'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'
import cors from "cors";

//config env
dotenv.config();
//db
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product" , productRoutes);


//rest api
app.get('/', (req,res)=> {
    res.send(
        "<h1>Welcome to my app</h1>"
    );
})


const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`server running on  ${PORT}`.bgCyan.white);
})