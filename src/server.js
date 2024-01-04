const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contacts = require("../data/contacts");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

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

module.exports = app;
