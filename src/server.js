const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contacts = require("../data/contacts.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const STATE = {
  contacts,
  nextId: 3,
};

const getNextId = () => {
  return STATE.nextId++;
};

const findContactIndex = (req) => {
  const { id } = req.params;
  const foundIndex = STATE.contacts.findIndex(
    (contact) => contact.id === id * 1
  );
  return foundIndex;
};

app.get("/contacts", (req, res) => {
  res.json({ contacts: STATE.contacts });
});

app.post("/contacts", (req, res) => {
  const count = STATE.contacts.push(req.body);
  const newContact = { contact: STATE.contacts[count - 1] };
  newContact.contact.id = getNextId();
  res.status(201).json(newContact);
});

app.get("/contacts/:id", (req, res) => {
  const foundIndex = findContactIndex(req);
  res.json({ contact: STATE.contacts[foundIndex] });
});

module.exports = app;
