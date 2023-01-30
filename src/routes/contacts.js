const contacts = require("../../data/contacts.js");
const meetings = require("../../data/meetings.js");
const express = require("express");
const router = express.Router();

let idCount = 2;
let meetingIdCount = 0;

router.get("/", (req, res) => {
  res.json({ contacts: contacts });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  res.json({ contact: contact });
});

router.post("/", (req, res) => {
  idCount += 1;
  const contact = { id: idCount, ...req.body };
  contact.meetings = [];
  contacts.push(contact);
  res.json({ contact: contact });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json({ contact: contact });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((item) => item.id === id);
  Object.assign(contact, req.body);
  res.json({ contact: contact });
});

router.get("/:id/meetings", (req, res) => {
  const id = req.params.id;
  contactMeetings = meetings.filter((m) => m.contactId === id);
  res.json(contactMeetings);
});

router.post("/:id/meetings", (req, res) => {
  meetingIdCount += 1;
  const id = req.params.id;
  const meeting = { id: meetingIdCount, contactId: id, ...req.body };
  meetings.push(meeting);
  res.json(meeting);
});

module.exports = router;
