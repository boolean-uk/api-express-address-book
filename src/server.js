const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const importedContacts = require("../data/contacts");
console.log(importedContacts);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let contacts = importedContacts;

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World!!" });
});

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

app.get("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);
  res.json(contact);
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts.length + 1;
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContactData = req.body;
  const contactIndex = contacts.findIndex((c) => c.id === id);
  const updatedContact = { ...contacts[contactIndex], ...updatedContactData };
  contacts[contactIndex] = updatedContact;
  res.json(updatedContact);
});

app.delete("/contacts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const contactIndex = contacts.findIndex(c => c.id === id);
    const [deletedContact] = contacts.splice(contactIndex, 1);
    res.json(deletedContact);
});

module.exports = app;
