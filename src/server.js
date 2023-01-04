const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts.js");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
//Get all contacts
app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});
//get a contact by id
app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.json({ contact: contact });
});
//create a contact
app.post("/contacts", (req, res) => {
  const contact = { ...req.body, id: contacts.length + 1 };
  contacts.push(contact);
  res.json({ contact: contact });
});
//delete a contact
app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json({});
});
//update a contact
app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.street = req.body.street;
  contact.city = req.body.city;
  contact.type = req.body.type;
  contact.email = req.body.email;
  contact.linkedin = req.body.linkedin;
  contact.twitter = req.body.twitter;
  res.json({ contact: contact });
});

module.exports = app;
