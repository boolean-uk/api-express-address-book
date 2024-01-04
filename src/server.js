const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Contacts

const contacts = require("../data/contacts");

const findContactById = (req, res) => {
  const contactId = Number(req.params.id);

  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    res.status(404).json({ error: `No contact found with ID: ${contactId}` });
  }

  return foundContact;
};

app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const body = req.body;

  const newContact = {
    ...body,
    id: contacts.length + 1,
  };

  contacts.push(newContact);

  res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
  const contact = findContactById(req, res);

  if (contact) {
    res.status(200).json({ contact: contact });
  }

  return contact;
});

app.delete("/contacts/:id", (req, res) => {
  const contact = findContactById(req, res);

  if (contact) {
    const contactIndex = contacts.indexOf(contact);

    contacts.splice(contactIndex, 1);

    meetings = meetings.filter(
      (meeting) => meeting.contactId !== Number(req.params.id)
    );

    res.status(200).json({ contact: contact });
  }

  return contact;
});

app.put("/contacts/:id", (req, res) => {
  const contact = findContactById(req, res);
  const body = req.body;

  if (contact) {
    const updatedContact = {
      ...contact,
      ...body,
      id: contact.id,
    };

    const contactIndex = contacts.indexOf(contact);

    contacts[contactIndex] = updatedContact;

    return res.status(200).json({ contact: contacts[contactIndex] });
  }

  return contact;
});

// Meetings

let meetings = require("../data/meetings");

const findMeetingById = (req, res) => {
  const meetingId = Number(req.params.id);

  const foundMeeting = meetings.find((meeting) => meeting.id === meetingId);

  if (!foundMeeting) {
    res.status(404).json({ error: `No meeting found with ID: ${meetingId}` });
  }

  return foundMeeting;
};

app.get("/meetings", (req, res) => {
  res.status(200).json({ meetings: meetings });
});

app.get("/meetings/:id", (req, res) => {
  const meeting = findMeetingById(req, res);

  if (meeting) {
    res.status(200).json({ meeting: meeting });
  }

  return meeting;
});

app.delete("/meetings/:id", (req, res) => {
  const meeting = findMeetingById(req, res);

  if (meeting) {
    const meetingIndex = meetings.indexOf(meeting);

    meetings.splice(meetingIndex, 1);
    res.status(200).json({ meeting: meeting });
  }

  return meeting;
});

app.put("/meetings/:id", (req, res) => {
  const meeting = findMeetingById(req, res);
  const body = req.body;

  if (meeting) {
    const updatedMeeting = {
      ...meeting,
      ...body,
      id: meeting.id,
    };

    const meetingIndex = meetings.indexOf(meeting);

    meetings[meetingIndex] = updatedMeeting;

    return res.status(200).json({ meeting: meetings[meetingIndex] });
  }

  return meeting;
});

app.get("/contacts/:id/meetings", (req, res) => {
  const contact = findContactById(req, res);

  if (contact) {
    if (contact.meetings) {
      return res.status(200).json({ meetings: contact.meetings });
    }

    return res
      .status(404)
      .json({ error: `No meetings for contact with ID: ${contact.id}` });
  }

  return contact;
});

app.post("/contacts/:id/meetings", (req, res) => {
  const contact = findContactById(req, res);

  if (contact) {
    const body = req.body;

    const newMeeting = {
      ...body,
      contactId: Number(req.params.id),
      id: meetings.length + 1,
    };

    meetings.push(newMeeting);
    contact.meetings.push(newMeeting);

    res.status(201).json({ meeting: newMeeting });
  }

  return contact;
});

module.exports = app;
