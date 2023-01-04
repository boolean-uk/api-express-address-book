const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let idCount = 2;

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  idCount += 1;
  const contact = { id: idCount, ...req.body };
  contact.id = idCount;
  contacts.push(contact);
  res.json(contacts);
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = contacts.find((contact) => contact.id === id);
  const index = contacts.indexOf(task);
  contacts.splice(index, 1);
  res.json(contacts);
});

app.patch("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((item) => item.id === id);
  Object.assign(contact, req.body);
  res.json(contact);
});

module.exports = app;
