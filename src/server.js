const contacts = require("../data/contacts");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts: contacts });
});

// create contacts
let newId = contacts.length + 1;

app.post("/contacts", (req, res) => {
  const contact = req.body;
  const newContact = {
    ...contact,
    id: newId++,
  };

  contacts.push(newContact);
  res.status(201).json({ contact: newContact });
});

// get a single contact by id

app.get("/contacts/:id", (req, res) => {
  const contactsId = Number(req.params.id);
  const findContacts = contacts.find((contact) => contact.id === contactsId);
  res.status(200).json({ contact: findContacts });
});

app.delete("/contacts/:id", (req, res) => {
  const contactsId = Number(req.params.id);
  const findContacts = contacts.find((contact) => contact.id === contactsId);
  const contactIndex = contacts.indexOf(findContacts);
  contacts.splice(contactIndex, 1);

<<<<<<< HEAD
  res.status(200).json({ contact: findContacts });
});
=======
// delete a single  contact by Id
app.delete('/contacts/:id', (req,res) => {
    const contactsId = Number(req.params.id)
    const findContacts = contacts.find((contact) => contact.id === contactsId)
    const contactIndex = contacts.indexOf(findContacts)
    contacts.splice(contactIndex, 1)
>>>>>>> b7b521f9865f2c2dd228bcde8ef270e6ee5fa911

//updated contact by Id

app.put("/contacts/:id", (req, res) => {
  const contactsId = Number(req.params.id);
  const findContacts = contacts.find((contact) => contact.id === contactsId);

  if (findContacts) {
    const {
      firstName,
      lastName,
      street,
      city,
      type,
      email,
      linkedin,
      twitter,
    } = req.body;
    findContacts.firstName = firstName;
    findContacts.lastName = lastName;
    findContacts.street = street;
    findContacts.city = city;
    findContacts.type = type;
    findContacts.email = email;
    findContacts.linkedin = linkedin;
    findContacts.twitter = twitter;

    return res.status(200).json({ contact: findContacts });
  }
});

module.exports = app;
