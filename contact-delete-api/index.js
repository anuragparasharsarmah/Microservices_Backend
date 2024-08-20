// contact-delete-api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNo: String,
  email: String,
  address: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.delete('/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Delete API running on port ${PORT}`));