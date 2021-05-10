const express = require('express');

const router = express.Router();

//@route  GET api/contacts
//@desc   Get all users contacts
//@access Private
router.get('/', (req, res) => {res.send('get all contacts') });

//@route  POST api/contacts
//@desc   Add a contact
//@access Public
router.post('/', (req, res) => {res.send('add new contact') });

//@route  PUT api/contacts/:id
//@desc   Update contact
//@access Public
router.put('/:id', (req, res) => {res.send('update a contact') });

//@route  DELETE api/contacts/:id
//@desc   Delete a contact
//@access Public
router.delete('/:id', (req, res) => {res.send('Delete a contact') });

module.exports = router;