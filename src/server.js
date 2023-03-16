const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts.js");
const meetings = require("../data/meetings.js");

app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts[contacts.length - 1].id + 1;
  contacts.push(newContact);
  const contact = newContact;
  res.json({ contact });
});

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((item) => item.id === id);
  res.status(200).json({ contact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedContact = contacts.find((item) => item.id === id);
  const contactIndex = contacts.findIndex((contact) => (contact.id = id));
  contacts.splice(contactIndex, 1);
  
  const filteredMeetings = meetings.filter((meeting) =>  {
    return meeting.contactId === id;
  });

  filteredMeetings.forEach((meeting) => {
    const id = meeting.id;
    const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);
    meetings.splice(meetingIndex, 1);
  });
  const contact = deletedContact;
  res.status(200).json({contact});
});

app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const editedContact = req.body;
  editedContact.id = id;
  const contactIndex = contacts.findIndex((contact) => (contact.id = id));
  contacts[contactIndex] = editedContact;
  res.status(200).json({ contact: editedContact });
});

app.get("/meetings", (req, res) => {
  res.status(200).json({ meetings });
});

app.get("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meeting) => meeting.id === id);
  res.status(200).json({ meeting });
});

app.delete("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedMeeting = meetings.find((meeting) => meeting.id === id);
  const meetingIndex = meetings.findIndex((meeting) => (meeting.id = id));
  meetings.splice(meetingIndex, 1);
  res.status(200).json({ deletedMeeting });
});

app.put("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const editedMeeting = req.body;
  editedMeeting.contactId = id;
  editedMeeting.id = id;
  const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);
  meetings[meetingIndex] = editedMeeting;
  res.status(200).json({ meeting: editedMeeting });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const id = Number(req.params.id);
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId === id
  );
  res.status(200).json({ meetings: contactMeetings });
});

app.post("/contacts/:id/meetings", (req, res) => {
  const newMeeting = req.body;
  newMeeting.id = meetings[meetings.length - 1].id + 1;
  const id = Number(req.params.id);
  newMeeting.contactId = id;
  meetings.push(newMeeting);
  res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
