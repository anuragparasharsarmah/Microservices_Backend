// contact-update-api/index.js
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

app.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Update API running on port ${PORT}`));