const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsData = require('../data/contacts');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/contacts', (req, res) => {
  res.status(200).json({ contacts: contactsData });
});


app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = contactsData.find((contact) => contact.id === parseInt(id));
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    res.status(200).json({ contact });
  }
});

app.post('/contacts', (req, res) => {
  const newContact = req.body;
  newContact.id = contactsData.length + 1;
  contactsData.push(newContact);
  res.status(201).json({ contact: newContact });
});


app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  const index = contactsData.findIndex((contact) => contact.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    contactsData[index] = { ...contactsData[index], ...updatedContact };
    res.status(200).json({ contact: contactsData[index] });
  }
});


app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const index = contactsData.findIndex((contact) => contact.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    const deletedContact = contactsData.splice(index, 1);
    res.status(200).json({ contact: deletedContact[0] });
  }
});


module.exports = app;
