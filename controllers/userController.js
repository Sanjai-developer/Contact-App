const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
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
    const user = await User.create({
        username,
        email,
        password,
    });
    res.json({ message: "Register Route" });
});
//@desc Login user
//@route POST /api/users/login
//@access Public
const loginuser = asyncHandler(async (req, res) => {
    res.json({ message: "Login Route" });
});
//@desc Get current user
//@route GET /api/users/current
//@access Private
const getcurrentuser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User Information" });
});

module.exports = { registeruser, loginuser, getcurrentuser };