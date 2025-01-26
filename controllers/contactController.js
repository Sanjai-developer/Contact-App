const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});
//@desc Create New contacts
//@route POST /api/contacts
//@access Private

const createContacts =asyncHandler( async (req,res) => {
    console.log("The Request Body is : ",req.body);

    const {name,email,phone,type} = req.body;
    if(!name || !email || !phone){
      res.status(400);
      throw new Error("Please enter all fields"); 
    } 
    const contacts = await Contact.create(
        { name , email , phone , });
    res.status(201).json(contacts);
});
//@desc GET New contacts
//@route GET /api/contacts/:id
//@access Private 

const getContact =  asyncHandler(async(req,res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
});
//@desc Update  contacts
//@route GET /api/contacts/:id
//@access Private

const updateContact =  asyncHandler(async(req,res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new : true});
   
    res.status(200).json({message:`Update contacts with id ${req.params.id}`});
});
//@desc Delete  contacts
//@route GET /api/contacts/:id
//@access Private

const deleteContact = asyncHandler( async(req,res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const deleteContact = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteContact);
});


module.exports = {
    getContacts ,
    createContacts ,
    getContact ,
    updateContact ,
    deleteContact
}; 