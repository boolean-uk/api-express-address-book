const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const contacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Carmack",
    street: "10 Keen Street",
    city: "London",
    type: "work",
    email: "test@test.com",
    linkedin: "https://www.linkedin.com/school/boolean-uk/",
    twitter: "https://twitter.com/booleanuk",
  },
  {
    id: 2,
    firstName: "Grace",
    lastName: "Hopper",
    street: "32 Deebug Road",
    city: "London",
    type: "personal",
    email: "test@test.com",
    linkedin: "https://www.linkedin.com/school/boolean-uk/",
    twitter: "https://twitter.com/booleanuk",
  },
];

let id = 3;

const findById = (id) => {
  return contacts.find((item) => item.id === id);
};

app.get("/contacts", (req, res) => {
  return res.send({contacts});
});

app.post("/contacts", (req, res) => {
  const body = req.body;
  const contact = { id: id, ...body };
  id++;

  contacts.push(contact);
  return res.status(201).send({ contact: contact });
});

app.get("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const foundContact = findById(contactId);
  if (foundContact) {
    return res.status(200).send({ contact: foundContact });
  } else {
    return res.status(404).send("Contact not found");
  }
});

app.delete("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const contactIndx = contacts.findIndex((item) => item.id === contactId);
  console.log(contactIndx);
  if (contactIndx !== -1) {
    const contactToDelete = findById(contactId);
    contacts.splice(contactIndx, 1);
    return res.status(200).send({ contact: contactToDelete });
  } else {
    return res.status(404).send("Contact not found");
  }
});

app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const contact = { id: id, ...body };
  const contactIndex = contacts.findIndex((item) => item.id === id);

  contacts[contactIndex] = contact;
  const contactToUpdate = contacts[contactIndex];
  return typeof contactToUpdate !== "undefined"
    ? res.send({ contact: contactToUpdate })
    : res.status(404).send("contact not found");
});

module.exports = app;
