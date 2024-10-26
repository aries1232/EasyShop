import mongoose from "mongoose";
 
const connectDB = async () => { 
    try {
        //console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to database!".bgGreen.white);

    } catch(error) {   
        console.log(`error in mongodb ${error}`.bgRed.white);
    }
}
export default connectDB;

