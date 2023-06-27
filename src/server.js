const contacts = require("../data/contacts");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());



// 1. Retrieve a list of contacts
app.get("/contacts", (req, res) => {
  return res.send({ contacts });
});

// 2. Create a new contact
app.post("/contacts", (req, res) => {
  const contact = req.body;
  const id = contacts.push(contact);
  contact.id = id;
  contacts.push(contact);
  return res.status(201).send({ contact });
});

// 3. Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => {
    return (contact.id === Number(id));
  });

  if (contact) {
    return res.send({ contact });
  } else {
    return res.send("Contact does not exist");
  }
});

module.exports = app;
