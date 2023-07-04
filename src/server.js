const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const router = express.Router();

const contacts = require("../data/contacts");

router.get("/contacts", (req, res) => {
  res.send({ contacts });
});

router.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.send({ contact });
});

router.post("/contacts", (req, res) => {
  const newContact = req.body;
  const lastContactId = contacts[contacts.length - 1].id;
  newContact.id = lastContactId + 1;
  contacts.push(newContact);
  res.status(201).send({ contact: newContact });
});

router.delete("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const contactIndex = contacts.findIndex((contact) => contact.id == contactId);
  const removedContact = contacts.splice(contactIndex, 1)[0];
  res.send({ contact: removedContact });
});

router.put("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const updateContact = req.body;
  const contactIndex = contacts.findIndex((contact) => contact.id == contactId);
  updateContact.id = contacts[contactIndex].id;
  contacts.splice(contactIndex, 1, updateContact);
  res.send({ contact: updateContact });
});

module.exports = router;
