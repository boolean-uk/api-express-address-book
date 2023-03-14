const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts.js");

app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts });
});

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((item) => item.id === id);
  res.json({ contact });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts[contacts.length - 1] + 1;
  contacts.push(newContact);
  res.status(201).json({ newContact });
});

module.exports = app;
