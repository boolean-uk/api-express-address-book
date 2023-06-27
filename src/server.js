const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get contacts
app.get("/contacts", (req, res) => {
  console.log(contacts);
  return res.send({ contacts });
});

// Create a new contact
app.post("/contacts", (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  return res.status(201).send(newContact);
});

// Find contact by id
app.get("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((contact) => contact.id === Number(id));

  return res.send( {contact} );
});

// Delete a single contact by id
app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const deletedContact =  contacts.find((contact) => contact.id === Number(id))
  const contactIndex = contacts.indexOf(deletedContact);
  contacts.splice(contactIndex, 1);
//   return res.send({ contacts: contactIndex });
  return res.status(200).send( {contact: deletedContact} );
});

module.exports = app;
