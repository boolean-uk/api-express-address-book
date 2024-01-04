const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// CORE
const findContactBy = (id) => contacts.find((contact) => contact.id === id);
const getIdFromParams = (params) => {
  const { id } = params;
  const idNum = parseInt(id);
  return idNum;
};

app.get("/contacts", (req, res) => {
  return res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;

  newContact.id = contacts.length + 1;
  contacts.push(newContact);

  return res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  return res.json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  const index = contacts.indexOf(foundContact);

  contacts.splice(index, 1);

  return res.json({ contact: foundContact });
});

app.put("/contacts/:id", (req, res) => {
	const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id);
  const index = contacts.indexOf(foundContact);
	const updatedContact = req.body;

	updatedContact.id = id;
	contacts.splice(index, 1, updatedContact)

	return res.json({"contact": updatedContact})
});

// EXTENSION

module.exports = app;
