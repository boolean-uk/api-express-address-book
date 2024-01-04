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

app.get("/contacts", (req, res) => {
  res.json({ contacts: appState.contacts });
});

module.exports = app;
