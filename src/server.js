const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let contacts = require("../data/contacts");
let meetings = require("../data/meetings");

let id = 3;
let meetingId = 4;

const findById = (id) => {
  return contacts.find((item) => item.id === id);
};

// GET all contacts
app.get("/contacts", (req, res) => {
  return res.send({ contacts });
});

// POST Create a contact
app.post("/contacts", (req, res) => {
  const body = req.body;
  const contact = { id: id, ...body };
  id++;

  contacts.push(contact);
  return res.status(201).send({ contact: contact });
});

// GET a contact by id
app.get("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const foundContact = findById(contactId);

  if (foundContact) {
    return res.status(200).send({ contact: foundContact });
  } else {
    return res.status(404).send("Contact not found");
  }
});

// DELETE a contact by id
app.delete("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  let index = -1;
  const contact = contacts.find((contact, index) => {
    return contact.id === contactId ? ((index = index), true) : false;
  });

  if (contact) {
    contacts.splice(index, 1);
    meetings.forEach((meeting, index) => {
      if (meeting.contactId === `${contactId}`) {
        meetings.splice(index, 1);
      }
    });
    return res.status(200).send({ contact: contact });
  } else {
    return res.status(404).send("Contact not found");
  }
});

// PUT update a contact by id
app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const contact = { id: id, ...body };
  const contactIndex = contacts.findIndex((item) => item.id === id);

  contacts[contactIndex] = contact;
  const contactToUpdate = contacts[contactIndex];
  return typeof contactToUpdate !== "undefined"
    ? res.send({ contact: contactToUpdate })
    : res.status(404).send("contact not found");
});

// EXTENSION

// GET all meetings
app.get("/meetings", (req, res) => {
  return res.status(200).send({ meetings });
});

// GET a meeting by id
app.get("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const checkId = meetings.find((meeting) => meeting.id === id);

  return typeof checkId !== "undefined"
    ? res.status(200).send({ meeting: checkId })
    : res.status(404).send("Meeting not found");
});

// DELETE a meeting by id
app.delete("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  let meetingIndex = -1;
  const checkId = meetings.find((meeting, index) => {
    return meeting.id === id ? ((meetingIndex = index), true) : false;
  });

  return checkId
    ? (meetings.splice(meetingIndex, 1),
      res.status(200).send({ meeting: checkId }))
    : res.status(404).send("Meeting not found");
});

// PUT update a meeting for a contact
app.put("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  let meetingIndex = -1;
  const checkId = meetings.find((meeting, index) => {
    return meeting.id === id ? ((meetingIndex = index), true) : false;
  });

  return checkId
    ? ((meetings[meetingIndex] = {
        ...meetings[meetingIndex],
        name: body.name
      }),
      console.log({ meeting: meetings[meetingIndex] }),
      res.status(200).send({ meeting: meetings[meetingIndex] }))
    : res.status(404).send("Meeting not found");
});

// GET all meetings for a specific contact
app.get("/contacts/:id/meetings", (req, res) => {
  const id = req.params.id;
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId === id
  );

  return contactMeetings.length !== 0
    ? res.status(200).send({ meetings: contactMeetings })
    : res.status(404).send("No meetings found");
});

// POST Create a meeting for a contact
app.post("/contacts/:id/meetings", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const checkId = contacts.find((contact) => contact.id === id);
  const meeting = { ...body, contactId: id, id: meetingId };
  meetingId++;

  return typeof checkId !== "undefined"
    ? (meetings.push(meeting), res.status(201).send({ meeting }))
    : res.status(404).send("Contact not found");
});

module.exports = app;
