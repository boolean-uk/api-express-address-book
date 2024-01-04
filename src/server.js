const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contactsData = require("../data/contacts.js");
const meetingsData = require("../data/meetings.js");

const appState = {
  contacts: contactsData,
  nextContactId: 3,
  meetings: meetingsData,
  nextMeetingId: 4,
};

// Function to generate the next contact ID
const generateNextContactId = () => appState.nextContactId++;

app.get("/contacts", (req, res) => {
  res.json({ contacts: appState.contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = { contact: { ...req.body, id: generateNextContactId() } };
  appState.contacts.push(newContact.contact);
  res.status(201).json(newContact);
});

module.exports = app;
