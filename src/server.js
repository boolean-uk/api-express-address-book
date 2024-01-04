const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get all contacts
app.get('/contacts', (req, res) => {
  res.status(200).json({ contacts: contacts });
});

let currentContactId = 3;

// Add a new contact
app.post('/contacts', (req, res) => {
  const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body;

  const newContact = {
    id: currentContactId,
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter,
  };

  contacts.push(newContact);

  // 201 = successfully created HTTP status code
  res.status(201).json({ contact: newContact });
});

// Get a specific contact by ID
app.get('/contacts/:id', (req, res) => {
  const contactId = Number(req.params.id);
  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return res.status(404).json({
      message: `No contact with id ${contactId} exists!`,
    });
  }

  return res.json({ contact: foundContact });
});

// Delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const contactId = Number(req.params.id);
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) {
    return res.status(404).json({
      message: `Delete failed. No such contact with ID ${contactId}`,
    });
  }

  const deletedContact = contacts.splice(contactIndex, 1)[0];

  return res.status(200).json({ contact: deletedContact, message: 'Successfully deleted contact' });
});

// Update a contact by ID
app.put('/contacts/:id', (req, res) => {
  const contactId = Number(req.params.id);
  const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body;

  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return res.status(404).json({
      message: `Update failed. No such contact with ID ${contactId}`,
    });
  }

  foundContact.firstName = firstName;
  foundContact.lastName = lastName;
  foundContact.street = street;
  foundContact.city = city;
  foundContact.type = type;
  foundContact.email = email;
  foundContact.linkedin = linkedin;
  foundContact.twitter = twitter;

  res.json({ contact: foundContact });
});

module.exports = app;
