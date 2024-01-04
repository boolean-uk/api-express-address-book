const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contacts = require("../data/contacts.js");
const createTestFormData = require("../test/fixtures/contacts/createTestFormData.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
const findContact = (req, res) => {
  const contactId = Number(req.params.contactId);

  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    res.status(404).json({ message: `no such contact with id: ${contactId}` });
  }

  return foundContact;
};
let currentID = 2;

app.get("/contacts", (req, res) => {
  return res.status(200).json({ contacts });
});

app.get("/contacts/:contactId", (req, res) => {
  const contact = findContact(req, res);

  res.status(200).json({ contact });
});

app.post("/contacts", (req, res) => {
  const body = createTestFormData;

  const newContact = {
    id: ++currentID,
    ...body,
  };

  contacts.push({ ...newContact });

  res.status(201).json({ contact: newContact });
});

app.delete("/contacts/:contactId", (req, res) => {
  const contact = findContact(req, res);
//   const contactId = Number(req.params.contactId);

  const findIndex = contacts.indexOf(contact);
  contacts.splice(findIndex, 1);

  res.json({contact});
});

module.exports = app;
