const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const contacts = require("../data/contacts");
let lastUsedId = 2;

// GET - Retrieve a list of contacts
app.get("/contacts", (req, res) => {
  res.json({ contacts });
});

// POST - Create a contact
app.post("/contacts", (req, res) => {
  const contactReq = req.body;
  lastUsedId++;
  contactReq.id = lastUsedId;
  contacts.push(contactReq);
  console.log("Over here --> ", contactReq);
  res.json({ contact: contactReq });
});

// GET - Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  console.log("Contact by ID --> ", contact);
  res.json({ contact });
});

// DELETE - Delete a single contact by ID
app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  console.log("DEL Contact --> ", contact);
  contacts.splice(contacts.indexOf(contact), 1);
  res.json({ contact });
});

// PUT - Update a contact by ID
app.put("/contacts/:id", (req, res) => {
  const contactReq = req.body;
  contactReq.id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id == req.params.id);
  contacts[contacts.indexOf(contact)] = contactReq;
  res.json({ contact: contactReq });
});

// TODO: EXTENSIONS

module.exports = app;
