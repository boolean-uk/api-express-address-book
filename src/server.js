const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts");

// Get list of contacts
app.get("/contacts", (req, res) => {
  res.send({ contacts });
});

// Create a contact
app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts[contacts.length - 1].id + 1;
  contacts.push(newContact);
  res.send({ contact: newContact });
});

// Get contact by Id
app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  res.send({ contact });
});

// Delete contact by Id
app.delete("/contacts/:id", (req, res) => {
  const contactIndex = contacts.findIndex(
    (contact) => contact.id == req.params.id
  );
  const removedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  deleteMeetingsForContact(req.params.id);
  res.send({ contact: removedContact });
});

const deleteMeetingsForContact = (contactId) => {
  const targetMeetings = meetings.filter(
    (meeting) => meeting.contactId == contactId
  );
  targetMeetings.forEach((meeting) => {
    const removeIndex = meetings.findIndex((e) => e === meeting);
    meetings.splice(removeIndex, 1);
  });
};

// Update contact by Id
app.put("/contacts/:id", (req, res) => {
  const updatedContact = req.body;
  const contactIndex = contacts.findIndex(
    (contact) => contact.id == req.params.id
  );
  updatedContact.id = contacts[contactIndex].id;
  contacts.splice(contactIndex, 1, updatedContact);
  res.send({ contact: updatedContact });
});

const meetings = require("../data/meetings");

// Get list of meetings
app.get("/meetings", (req, res) => {
  res.send({ meetings });
});

// Get meeting by id
app.get("/meetings/:id", (req, res) => {
  const meeting = meetings.find((meeting) => meeting.id == req.params.id);
  res.send({ meeting });
});

// Update meeting name by Id
app.put("/meetings/:id", (req, res) => {
  const meeting = meetings.find((meeting) => meeting.id == req.params.id);
  meeting.name = req.body.name;
  meeting.contactId = Number(meeting.contactId);
  res.send({ meeting });
});

// Delete meeting by id
app.delete("/meetings/:id", (req, res) => {
  const meetingIndex = meetings.findIndex(
    (meeting) => meeting.id == req.params.id
  );
  const meeting = meetings[meetingIndex];
  meetings.splice(meetingIndex, 1);
  res.send({ meeting });
});

// Get meetings for contact
app.get("/contacts/:id/meetings", (req, res) => {
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId == req.params.id
  );
  res.send({ meetings: contactMeetings });
});

// Create meeting for contact Id
app.post("/contacts/:id/meetings", (req, res) => {
  const newMeeting = {
    id: meetings[meetings.length - 1].id + 1,
    contactId: Number(req.params.id),
    name: req.body.name,
  };
  meetings.push(newMeeting);
  res.send({ meeting: newMeeting });
});

module.exports = app;
