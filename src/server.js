const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");
const meetings = require("../data/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const findContactBy = (id) => contacts.find((contact) => contact.id === id);
const findMeetingBy = (id) => meetings.find((meeting) => meeting.id === id);
const deleteMeetingsBy = (contactId) => {
  meetings.forEach((meeting) => {
    if (meeting.contactId === contactId) {
      const index = meetings.indexOf(meeting);
      meetings.splice(index, 1);
    }
  });
};
const getIdFromParams = (params) => {
  const { id } = params;
  const idNum = parseInt(id);
  return idNum;
};

// CORE
app.get("/contacts", (req, res) => {
  return res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;

  newContact.id = contacts.length + 1;
  contacts.push(newContact);

  return res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  if (!foundContact) return res.status(404).json("No such contact found.");
  return res.json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  if (!foundContact)
    return res.status(404).json("Could not delete. No such contact found.");

  const index = contacts.indexOf(foundContact);

  contacts.splice(index, 1);
  // extension: deleting a contact also delete their meetings:
  deleteMeetingsBy(id);

  return res.json({ contact: foundContact });
});

app.put("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  if (!foundContact) return res.status(404).json("No such contact found");

  const index = contacts.indexOf(foundContact);
  const updatedContact = req.body;

  if (
    !updatedContact.firstName ||
    !updatedContact.lastName ||
    !updatedContact.street ||
    !updatedContact.city ||
    !updatedContact.type ||
    !updatedContact.email ||
    !updatedContact.linkedin ||
    !updatedContact.twitter
  ) {
    return res.status(422).json("Cannot update - missing input");
  }
  
  updatedContact.id = id;
  contacts.splice(index, 1, updatedContact);

  return res.json({ contact: updatedContact });
});

// EXTENSION
app.get("/meetings", (req, res) => res.json({ meetings: meetings }));

app.get("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundMeeting = findMeetingBy(id);
  return res.json({ meeting: foundMeeting });
});

app.delete("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundMeeting = findMeetingBy(id);
  const index = meetings.indexOf(foundMeeting);

  meetings.splice(index, 1);
  return res.json({ meeting: foundMeeting });
});

app.put("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const updatedMeeting = req.body;
  const foundMeeting = findMeetingBy(id);
  const index = meetings.indexOf(foundMeeting);

  updatedMeeting.id = id;
  updatedMeeting.contactId = foundMeeting.contactId;
  meetings.splice(index, 1, updatedMeeting);

  return res.json({ meeting: updatedMeeting });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const contactId = getIdFromParams(req.params);
  const meetingsForContact = meetings.filter(
    (meeting) => meeting.contactId === contactId
  );

  return res.json({ meetings: meetingsForContact });
});

app.post("/contacts/:id/meetings", (req, res) => {
  const id = meetings.length + 1;
  const contactId = getIdFromParams(req.params);
  const newMeeting = req.body;

  newMeeting.id = id;
  newMeeting.contactId = contactId;
  meetings.push(newMeeting);

  return res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
