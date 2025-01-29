const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.user.id });
    res.status(200).json(contacts);
});

//@desc Create New contacts
//@route POST /api/contacts
//@access Private
const createContacts = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const contact = new Contact({
        user_id:req.user.user.id,
        name,
        email,
        phone
    });
    await contact.save();
    res.status(201).json(contact);
});

//@desc GET New contacts
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.user.id.toString()){
        res.status(403);
        throw new Error("Not Authorized to Change Other user's Contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.user.id.toString()){
        res.status(403);
        throw new Error("Not Authorized to Change Other user's Contact");
    }
await Contact.deleteOne({_id:req.params.id});
    res.status(200).json({deleteContact});
});

module.exports = {
    getContacts,
    createContacts,
    getContact,
    updateContact,
    deleteContact
};
