const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const data = require("../data/contacts.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

let currentId = 2;
app.get("/contacts", (req, res) => {
  const allContacts = {
    contacts: data,
  };

  return res.status(200).json(allContacts);
});

app.post("/contacts", (req, res) => {
  const { firstName, lastName, street, city, type, email, linkedin, twitter } =
    req.body;

  const newContact = {
    id: ++currentId,
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter,
  };

  data.push(newContact)

  const returnedContact = {
    "contact": newContact
  }

  return res.status(201).json(returnedContact)
});

app.get('/contacts/:id',(req,res)=>{
    const contactId = Number(req.params.id)

    const foundContact = data.find((contact) => contact.id === contactId)

    if(!foundContact){
        return res.status(404).json(`Contact with id ${contactId} not found`)
    }
    
    const contactToReturn = {
        "contact":foundContact
    }

    return res.status(200).json(contactToReturn)
})

module.exports = app;
