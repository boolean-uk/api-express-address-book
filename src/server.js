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

// Function to generate the next meeting ID
const generateNextMeetingId = () => appState.nextMeetingId++;

// Function to find an array index by ID
const findIndexById = (array, req) => {
  const { id } = req.params;
  return array.findIndex((item) => item.id === Number(id));
};

app.get("/contacts", (req, res) => {
  res.json({ contacts: appState.contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = { contact: { ...req.body, id: generateNextContactId() } };
  appState.contacts.push(newContact.contact);
  res.status(201).json(newContact);
});
app.get("/contacts/:id", (req, res) => {
  const foundIndex = findIndexById(appState.contacts, req);
  res.json({ contact: appState.contacts[foundIndex] });
});

app.delete("/contacts/:id", (req, res) => {
  const foundContactIndex = findIndexById(appState.contacts, req);
  const [removedContact] = appState.contacts.splice(foundContactIndex, 1);

  appState.meetings = appState.meetings.filter(
    (meeting) => meeting.contactId !== Number(req.params.id)
  );

  res.json({ contact: removedContact });
});

app.put("/contacts/:id", (req, res) => {
  const foundIndex = findIndexById(appState.contacts, req);
  appState.contacts[foundIndex] = { ...req.body, id: Number(req.params.id) };
  res.json({ contact: appState.contacts[foundIndex] });
});
// Meetings endpoints
app.get("/meetings", (req, res) => {
  res.json({ meetings: appState.meetings });
});

app.get("/meetings/:id", (req, res) => {
  const foundIndex = findIndexById(appState.meetings, req);
  res.json({ meeting: appState.meetings[foundIndex] });
});

app.delete("/meetings/:id", (req, res) => {
  const foundIndex = findIndexById(appState.meetings, req);
  const [removedMeeting] = appState.meetings.splice(foundIndex, 1);
  res.json({ meeting: removedMeeting });
});

app.put("/meetings/:id", (req, res) => {
  const foundMeetingIndex = findIndexById(appState.meetings, req);
  appState.meetings[foundMeetingIndex].name = req.body.name;
  res.json({ meeting: appState.meetings[foundMeetingIndex] });
});

// Endpoint to get meetings associated with a contact
app.get("/contacts/:id/meetings", (req, res) => {
  const foundContactIndex = findIndexById(appState.contacts, req);
  const foundMeetings = appState.meetings.filter(
    (meeting) => meeting.contactId === Number(req.params.id)
  );
  res.json({ meetings: foundMeetings });
});

// Endpoint to add a meeting for a specific contact
app.post("/contacts/:id/meetings", (req, res) => {
  const newMeeting = {
    meeting: {
      ...req.body,
      id: generateNextMeetingId(),
      contactId: Number(req.params.id),
    },
  };
  appState.meetings.push(newMeeting.meeting);
  res.status(201).json(newMeeting);
});

module.exports = app;
