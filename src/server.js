const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const importContacts = require("../data/contacts");
const { firstName } = require("../test/fixtures/contacts/createTestFormData");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let contacts = importContacts;

app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome to my contacts page" });
});

// Get request to return contacts
app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

// Get request to return a specific contact by id
app.get("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    res.status(200).json({ contact: contact });
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

// Post request returns created contact
app.post("/contacts", (req, res) => {
    const newContact = req.body;
    newContact.id = contacts.length + 1;
    contacts.push(newContact);
    return res.status(201).json({ contact: newContact });
});


// Put request return updated contact
app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const foundContact = contacts.find(contact => contact.id === id);

    if (!foundContact) {
        return res.status(404).json({ error: `No such contact with id: ${id}` });
    }

    const updates = req.body;
    Object.assign(foundContact, updates);

    return res.status(200).json({ contact: foundContact }); 
});

// Delete request and removes contact
app.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const foundContactIndex = contacts.findIndex(contact => contact.id === id);

    if (foundContactIndex === -1) {
        return res.status(404).json({ error: `No such contact with id: ${id}` });
    }

    const deletedContact = contacts.splice(foundContactIndex, 1)[0];

    return res.status(200).json({ contact: deletedContact });
});




module.exports = app;