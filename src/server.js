const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/contacts", (req, res) => {
  return res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;

	newContact.id = contacts.length + 1;
  contacts.push(newContact)
	
  return res.status(201).json({ "contact": newContact });
});

module.exports = app;
