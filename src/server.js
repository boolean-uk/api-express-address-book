const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const contacts = require("../data/contacts");
const meetings = require("../data/meetings");
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

// DELETE - Delete a single contact by ID and all its meetings
app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  console.log("DEL Contact --> ", contact);
  contacts.splice(contacts.indexOf(contact), 1);

  const findMeetings = meetings.filter(
    (meeting) => meeting.contactId == contact.id
  );

  if (findMeetings) {
    findMeetings.forEach((meeting) => {
      meetings.splice(meetings.indexOf(meeting), 1);
    });
  }
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

// EXTENSIONS

// GET - Retrieve a list of all meetings
app.get("/meetings", (req, res) => {
  res.json({ meetings });
});

// GET - Get a meeting by ID
app.get("/meetings/:id", (req, res) => {
  const meeting = meetings.find((meeting) => meeting.id == req.params.id);
  console.log("Meeting by ID --> ", meeting);
  res.json({ meeting });
});

// DELETE - Delete a meeting by ID
app.delete("/meetings/:id", (req, res) => {
  const meeting = meetings.find((meeting) => meeting.id == req.params.id);
  console.log("DEL Meeting --> ", meeting);
  meetings.splice(meetings.indexOf(meeting), 1);
  res.json({ meeting });
});

// TODO: PUT - Update a meeting for a contact
module.exports = app;
