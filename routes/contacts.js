const express = require('express');
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const { json } = require('express');

const router = express.Router();

//@route  GET api/contacts
//@desc   Get all users contacts
//@access Private
router.get('/', auth,
 async (req, res) => {
   try {
     const contacts = await Contact.find({ user: req.user.id}).sort({date: -1});
     res.json(contacts);
   } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
   }
  });

//@route  POST api/contacts
//@desc   Add a contact
//@access Public
router.post('/', [auth, [
  body('name','name').notEmpty()
]], 
async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type} = req.body;
    
  try {
    const newContact = new Contact({name, email, phone, user: req.user.id});

    const contact = await newContact.save();

    return res.json(contact);
   
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

//@route  PUT api/contacts/:id
//@desc   Update contact
//@access Public
router.put('/:id',auth , 
async (req, res) => {
  const { name, email, phone, type} = req.body;

  //Build contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Constact not found'});

    //Make sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({msg: 'Not authorize'});
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: contactFields }, 
      {new: true} );
    
    
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

//@route  DELETE api/contacts/:id
//@desc   Delete a contact
//@access Public
router.delete('/:id', auth,
async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Constact not found'});

    //Make sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({msg: 'Not authorize'});
    }

    await Contact.findByIdAndRemove(req.params.id );
    
    
    res.json({msg: 'Contact removed'});
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

module.exports = router;