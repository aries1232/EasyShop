import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken';

//register controller
export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address} = req.body;

        //validation
        if(!name){
            return res.send({error : 'name is required'});
        }
        if(!email){
            return res.send({error : 'email is required'});
        }
        if(!phone){
            return res.send({error : 'phone is required'});
        }
        if(!password){
            return res.send({error : 'password is required'});
        }
        if(!address){
            return res.send({error : 'address is required'});
        }
        //existing user cheack
        const existingUser = await userModel.findOne({email});

        if(existingUser) {
            return res.status(409).send({
                success:false,
                message:'user is already registered please login !'
        });
        }
        //register user & save 
        const hashedPassword = await hashPassword(password);

        const user =  await new userModel({name,address,phone,email,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'user registed',
            user, 
        });
        console.log(user);


    }catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message :  'error in regirstration',
            error
        })
    }

};

//login controller
export const loginController = async(req,res)  => {

    try{
        const {email,password} = req.body
        //validation
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message:'invalid email or password',
            })
        }
        //user find
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success:false,
                message:'user is not registered'
            })
        }
        const match =  await comparePassword(password,user.password);

        //if not match
        if(!match) {
            return res.status(200).send({
                success:false,
                message:'password do not match !'
            })
        }

        //generate token
        const token = JWT.sign({_id:user._id}, process.env.JWT_SECRET , {expiresIn : '4d'});
         
        res.status(200).send({
            success:true,
            message: 'login successful !',
            user : {
                name : user.name,
                email : user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'error in login',
            error
        })

    }
};

//test controller
export const  testController = (req,res) => {
    console.log('protected route')
    try {
        res.send("protected route");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}

// forgot password controllor

export const forgotPasswordController = async(req,res) => {
    try{
        const {email,newPassword,answer} = req.body;
        if(!email) {
                 res.status(400).send({message: 'email is requried'});
        }
        if(!answer) {
                 res.status(400).send({message: 'answer is requried'});
        }
        if(!newPassword) {
                  res.status(400).send({message: 'newPassword is requried'});
        }

        //checking
        const user = await userModel.findOne({email,answer});

        //validate
        if(!user) {
            return res.status(400).send({
                success:false,
                error,
                message:'user not found'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password : hashed});
        return res.status(200).send({
            success:true,
            message:'password changed successfully !'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something went wrong !',
            error
        })
    }

}