const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.json({msg:'Welcome to the contact keeper app..'}));

//Define routes

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => `Server started on port ${PORT}`);