// contact-create-api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNo: String,
  email: String,
  address: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Create API running on port ${PORT}`));