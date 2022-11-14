const express = require("express");
const morgan = require("morgan");
const allContacts = require("./data/contacts");
const allMettings = require("./data/meetings");
const contacts = allContacts.contacts;
const meetings = allMettings.meetings;
const app = express();

app.use(express.json());
app.use(morgan());

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(contact);
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  contacts.forEach((item, index) => {
    if (item.id === id) {
      return counters.splice(index, 1);
    }
  });
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  contacts.push({ ...req.body });
  res.json({ id: contacts.length + 1, ...req.body });
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  let contact = contacts.find((item) => item.id === Number(id));
  contact = { ...req.body };
  res.json(contact);
});

// MEETINGS

app.get("/meetings", (req, res) => {
  res.json({ meetings: meetings });
});

app.post("/meetings", (req, res) => {
  req.body.contactId = req.body.contactId.toString();
  const meeting = { ...req.body, id: meetings.length + 1 };
  meetings.push(meeting);
  res.json(meetings);
});

app.get("/contacts/:id/meetings", (req, res) => {
  const { id } = req.params;
  let meeting = meetings.find((item) => item.contactId === id);
  res.json(meeting);
});

app.post("/contacts/:id/meetings", (req, res) => {
  const { id } = req.params;
  let meeting = { ...req.body, contactId: id, id: meetings.length + 1 };
  res.json(meeting);
});

app.put("/contacts/:id/meetings/:meetingId", (req, res) => {
  const { id, meetingId } = req.params;
  let meeting = meetings.find((item) => item.contactId === id);
  if (!meeting) {
    return res.status(404).json({ message: "not found" });
  }
  meeting = { ...meeting, name: req.body.name };
  res.json(meeting);
});

app.listen(3030, () => {
  console.log("my app satrted");
});
