const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const importContacts = require("../data/contacts");

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
    const createContact = req.body;
    createContact.id = contacts.length + 1;
    contacts.push(createContact);
    return res.status(201).json({createContact: createContact});
  });

module.exports = app;
