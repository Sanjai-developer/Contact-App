const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a new user
//@route POST /api/users/register
//@access Public

const registeruser = asyncHandler(async (req, res) => {
    const {username, email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please Fill All Fields");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exists");
    }
    //Hash Password\
    const hashedPasword = await bcrypt.hash(password, 10);
    console.log(hashedPasword);
    const user = await User.create({
        username,
        email,
        password : hashedPasword,
    });
    if(user){
    res.status(201).json({_id: user.id,email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid User Data");
    }
});
//@desc Login user
//@route POST /api/users/login
//@access Public
const loginuser = asyncHandler(async (req, res) => {
    const {email , password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("Please Fill All Fields");
    }
    const user = await User.findOne({email});
//compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
       const accessToken = jwt.sign({
        user:{
            username : user.username,
            email : user.email,
            id : user._id,

        }
       },process.env.ACCESS_TOKEN_SECRET, 
         {expiresIn: "1d"}
    );res.status(200).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("Invalid Password or Invalid Email");
    }
   
});
//@desc Get current user
//@route GET /api/users/current
//@access Private
const getcurrentuser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User Information" });
});

module.exports = { registeruser, loginuser, getcurrentuser };