import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Register first!!",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credential !!",
        });
    }
    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logout Successfully",
    });
};

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered Successfully", 201);
};

export const getMyProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const getAllUsers = async (req, res, next) => {
    const user = await User.find({});
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found",
        });
    }
    res.status(200).json({
        success: true,
        user,
    });
};

export const updateUser = async (req,res,next) => {
    const {name,email,password} = req.body;
    if(name){
        req.user.name = name;
    }
    if(email){
        req.user.email = email;
    }
    if(password){
        req.user.password = await bcrypt.hash(password,10);
    }
    await req.user.save();
    res.status(200).json({
        success:true,
        message:"Update Successfully",
        user:{
            name:req.user.name,
            email:req.user.email,
        }
    });
};

export const deleteUser = async(req,res,next) => {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).clearCookie("token").json({
        success: true,
        message: "Delete Successfully",
    });
};