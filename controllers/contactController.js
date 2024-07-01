const asyncHandler = require('express-async-handler')

const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async(req,res)=>{
    const contacts =  await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
})

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(200).json(contact);
})

const createContact =asyncHandler(async (req,res)=>{
    console.log("the req body is",req.body);
    const {name,email,phone} =req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact);
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not authorized to delete this contact")
    }
    const deletedContact = await Contact.deleteOne({ _id: req.params.id });

    if (deletedContact.deletedCount === 0) {
        res.status(404);
        throw new Error("Failed to delete contact");
    }

    res.status(200).json({ message: "Contact deleted successfully" });
});
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not authorized to update this contact")
    }
    const updatedContact = await(Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ))
    res.status(201).json(updatedContact);
})
module.exports = {getContact,createContact,deleteContact,updateContact,getContacts}