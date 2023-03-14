const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let contactId = 2;

const contacts = require("../data/contacts");
const createTestFormData = require("../test/fixtures/contacts/createTestFormData");
const updateTestFormData = require("../test/fixtures/contacts/updateTestFormData");

app.get("/contacts", (req, res) => {
  res.json({ contacts });
});

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((person) => person.id === id);
  res.json({ contact });
});

app.post("/contacts", (req, res) => {
  contactId++;
  createTestFormData.id = contactId;
  contacts.push(createTestFormData);
  res.status(201).json({ contacts });
});

app.post('/contacts', (req, res) => {
    contactId++
    createTestFormData.id = contactId
    contacts.push(createTestFormData)
    res.send({contact: createTestFormData})
})

app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find((person) => person.id === id)
    contacts.splice(contacts.contact , 1)
    res.json({contact})
})

app.put('/contacts/:id', (req, res) => {
    const contact = contacts.find((person) => person.id === Number(req.params.id))
    
    updatetedContact = {...updateTestFormData,
    id: contact.id,
    firstName: req.body.firstName}  

    console.log("req.body", req.body)
    console.log("updated" , updatetedContact)
    
    res.send({contact: updatetedContact})
})

module.exports = app;
