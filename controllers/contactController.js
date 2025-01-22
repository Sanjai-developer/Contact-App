const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});
//@desc Create New contacts
//@route POST /api/contacts
//@access Public

const createContacts =asyncHandler( async (req,res) => {
    console.log("The Request Body is : ",req.body);

    const {name,email,phone,type} = req.body;
    if(!name || !email || !phone){
      res.status(400);
      throw new Error("Please enter all fields");
    }
    res.status(201).json({message:" Create contacts"});
});
//@desc GET New contacts
//@route GET /api/contacts/:id
//@access Public

const getContact =  asyncHandler(async(req,res) => {
    res.status(200).json({message:`get contacts with id ${req.params.id}`});
});
//@desc Update  contacts
//@route GET /api/contacts/:id
//@access Public

const updateContact =  asyncHandler(async(req,res) => {
    res.status(200).json({message:`Update contacts with id ${req.params.id}`});
});
//@desc Delete  contacts
//@route GET /api/contacts/:id
//@access Public

const deleteContact = asyncHandler( async(req,res) => {
    res.status(200).json({message:`Delete contacts with id ${req.params.id}`});
});


module.exports = {
    getContacts ,
    createContacts ,
    getContact ,
    updateContact ,
    deleteContact
}; 