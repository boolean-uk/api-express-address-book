const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contacts = require("../data/contacts.js");
const createTestFormData = require("../test/fixtures/contacts/createTestFormData.js");
const updateTestFormData = require("../test/fixtures/contacts/updateTestFormData.js");

const meetings = require("../data/meetings.js");
const createTestFormDatax = require("../test/fixtures/meetings/createTestFormData.js");

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

const findMeeting = (req, res) => {
  const meetingId = Number(req.params.meetingId);

  const foundMeeting = meetings.find((meeting) => meeting.id === meetingId);

  foundMeeting.contactId.toString();

  if (!foundMeeting) {
    res.status(404).json({ message: `no such meeting with id: ${meetingId}` });
  }

  return foundMeeting;
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

  if (contact) {
    const contactIndex = contacts.indexOf(contact);
    contacts.splice(contactIndex, 1);

    const newMeetings = meetings.filter(
      (meetings) => meetings.contactId !== contact.id
    );
    meetings.splice(0, meetings.length, newMeetings);
  }

  res.status(200).json({ contact });
});

app.put("/contacts/:contactId", (req, res) => {
  const contact = findContact(req, res);

  contact.firstName = updateTestFormData.firstName;
  contact.lastName = updateTestFormData.lastName;
  contact.street = updateTestFormData.street;
  contact.city = updateTestFormData.city;
  contact.type = updateTestFormData.type;
  contact.email = updateTestFormData.email;
  contact.linkedin = updateTestFormData.linkedin;
  contact.twitter = updateTestFormData.twitter;

  res.status(200).json({ contact });
});

// Extension
app.get("/meetings", (req, res) => {
  return res.status(200).json({ meetings });
});

app.get("/meetings/:meetingId", (req, res) => {
  const meeting = findMeeting(req, res);

  return res.status(200).json({ meeting });
});

app.put("/meetings/:meetingId", (req, res) => {
  const meeting = findMeeting(req, res);
  const { name } = req.body;

  meeting.name = name;
  return res.status(200).json({ meeting });
});

app.delete("/meetings/:meetingId", (req, res) => {
  const meeting = findMeeting(req, res);

  const meetingIndex = meetings.indexOf(meeting);
  meetings.splice(meetingIndex, 1);

  return res.status(200).json({ meeting: meeting });
});

app.get("/contacts/:contactId/meetings", (req, res) => {
  const contactId = Number(req.params.contactId);
  const findMeetingByContactId = meetings.filter(
    (meeting) => meeting.contactId === contactId
  );

  if (!findMeetingByContactId) {
    res.status(404).json({
      error: `No meetings with contact ID: ${contactId}`,
    });
  }

  return res.status(200).json({ meetings: findMeetingByContactId });
});

let currentMeetingId = 4;
app.post("/contacts/:contactId/meetings", (req, res) => {
  const contactId = Number(req.params.contactId);
  let newMeeting = req.body;
  newMeeting = { ...newMeeting, contactId: contactId, id: currentMeetingId };
  currentMeetingId++;

  meetings.push(newMeeting);

  return res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
