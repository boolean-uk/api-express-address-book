const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contacts = require("../data/contacts.js");
const meetings = require("../data/meetings.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const STATE = {
  contacts,
  nextContactId: 3,
  meetings,
  nextMeetingId: 3,
};

const getNextContactId = () => {
  return STATE.nextContactId++;
};

const getNextMeetingId = () => {
  return STATE.nextMeetingId++;
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
  newContact.contact.id = getNextContactId();
  res.status(201).json(newContact);
});

app.get("/contacts/:id", (req, res) => {
  const foundIndex = findContactIndex(req);
  res.json({ contact: STATE.contacts[foundIndex] });
});

app.delete("/contacts/:id", (req, res) => {
  const foundIndex = findContactIndex(req);
  const [removedContact] = STATE.contacts.splice(foundIndex, 1);
  res.json({ contact: removedContact });
});

app.put("/contacts/:id", (req, res) => {
  const foundIndex = findContactIndex(req);
  foundContact = STATE.contacts[foundIndex] = {
    ...req.body,
    id: req.params.id * 1,
  };

  res.json({ contact: foundContact });
});

module.exports = app;
