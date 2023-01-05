const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts.js");
const meetings = require("../data/meetings.js")

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let idCount = 2;
let meetingIdCount = 0

app.get("/contacts", (req, res) => {
  res.json({contacts: contacts});
});

app.get("/contacts/:id", (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)
    res.json({contact: contact})
})

app.post("/contacts", (req, res) => {
  idCount += 1;
  const contact = { id: idCount, ...req.body };
  contact.id = idCount;
  contacts.push(contact);
  res.json({contacts: contacts});
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json({contact: contact});
});

app.patch("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((item) => item.id === id);
  Object.assign(contact, req.body);
  res.json({contact: contact});
});

app.get("/meetings", (req, res) => {
    res.json({meetings: meetings})
})

app.get("/meetings/:id", (req, res) => {
    const id = Number(req.params.id)
    const meeting = meetings.find(meeting => meeting.id === id)
    res.json({meeting: meeting})
})

app.delete("/meetings/:id", (req, res) => {
    const id = Number(req.params.id)
    const meeting = meetings.find(meeting => meeting.id === id)
    const index = meetings.indexOf(meeting)
    meetings.splice(index, 1)
    res.json(meetings)
})

app.patch("/meetings/:id", (req, res) => {
    const id = Number(req.params.id)
    const meeting = meetings.find(meeting => meeting.id === id)
    Object.assign(meeting, req.body);
    res.json(meeting)
})

app.get("/contacts/:id/meetings", (req, res) => {
    const id = (req.params.id)
    contactMeetings = meetings.filter(m => m.contactId === id)
    res.json(contactMeetings)
})

app.post("/contacts/:id/meetings", (req, res) => {
    meetingIdCount += 1
    const id = (req.params.id)
    const meeting = {id: meetingIdCount, contactId: id, ...req.body}
    meetings.push(meeting)
    res.json(meeting)
})

module.exports = app;
