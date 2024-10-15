// 3
const asynchandler = require("express-async-handler");
const contact = require("../models/contactmodel");
//@desc get all contacts
//@route GET /api/contacts
//@accress private 

const getcontacts = asynchandler(async (req, res) => {
    const contactcon = await contact.find({user_id : req.user.id});
    // const contactcon = await contact.find(); // in public
    res.status(200).json(contactcon);
})

//@desc create new contact
//@route POST /api/contacts/
//@accress private 

const createcontacts = asynchandler(async (req, res) => {
    // console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory !! ");
    }
    const contactcon = await contact.create({
        name,
        email,
        phone,
        user_id : req.user.id,
    })
    res.status(201).json(contactcon);
})

//@desc get contact
//@route GET /api/contacts/:id
//@accress private 

const getcontact = asynchandler(async (req, res) => {
    const contactcon = await contact.findById(req.params.id);
    if(!contactcon) {
        res.status(404);
        throw new Error ("contact not found");
    }
    res.status(200).json(contactcon);
})

//@desc update contact
//@route PUT /api/contacts/:id
//@accress private 

const updatecontacts = asynchandler(async (req, res) => {
    const contactcon = await contact.findById(req.params.id);
    if(!contactcon) {
        res.status(404);
        throw new Error ("contact not found");
    }

    if(contactcon.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user contacts")
    } 

    const updatedcontact = await contact.findByIdAndUpdate(
        req.params.id,  //id which can pass
        req.body,  //pass body that can pass
        {new : true}
    )
    res.status(200).json(updatedcontact);
})

//@desc delete contact
//@route DELETE /api/contacts/:id
//@accress private 

const deletecontacts = asynchandler(async (req, res) => {
    const contactcon = await contact.findById(req.params.id);
    // console.log(contactcon)
    if(!contactcon) {
        res.status(404);
        throw new Error ("contact not found");
    }

    if(contactcon.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user contacts")
    } 

    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contactcon);
});

module.exports = {getcontacts, createcontacts, getcontact, updatecontacts, deletecontacts};
