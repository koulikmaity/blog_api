import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if(!users) {
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
}



export const signup = async (req, res, next) => {
    // console.log(req.body);
    const {name, email, password} = req.body; // that mean collect data from frontend
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.error(error);
    }
    if(existingUser){
        res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    
    try {
        // to save data in mongoose
        await user.save();
    } catch (error) {
       return  console.log(error);
    }
    return res.status(201).json({user})
}


export const login = async (req, res, next) => {
    const {email, password} = req.body; // that mean collect data from frontend
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.error(error);
    }
    if(!existingUser){
        res.status(404).json({message: "Don't find the user by that email."});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "login successful"});

}