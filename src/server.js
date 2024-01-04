const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const meetings = require('../data/meetings.js')
const { contacts } = require("../data/contacts.js");
let { idCounter } = require("../data/contacts.js");
const {foundContactById, foundMeetingById} = require("./client.js");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json("Welcome to contacts");
});

app.get("/contacts", (req, res) => {
    return res.status(200).json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
    let newContact = req.body;
    newContact = { id: idCounter, ...newContact };
    idCounter++;

    contacts.push(newContact);

    return res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
    const foundContact = foundContactById(req, res);
    return res.status(200).json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
    const foundContact = foundContactById(req, res);

    if (foundContact) {
        const foundContactIndex = contacts.indexOf(foundContact);
        contacts.splice(foundContactIndex, 1)
    }

    res.status(200).json({contact: foundContact})
});

app.put('/contacts/:id', (req, res) => {
    const foundContact = foundContactById(req, res)

    if(foundContact) {
        const { firstName, lastName, street, city, type, email, linkedin, twitter} = req.body;
    
        foundContact.firstName = firstName,
        foundContact.lastName = lastName,
        foundContact.street = street,
        foundContact.city = city,
        foundContact.type = type,
        foundContact.email = email,
        foundContact.linkedin = linkedin,
        foundContact.twitter = twitter
    }

    return res.status(200).json({contact: foundContact})
})

app.get('/meetings', (req, res) => {
    return res.status(200).json({ meetings: meetings })
})

app.get('/meetings/:id', () => {
    const foundMeeting = foundMeetingById(req, res)
    return res.status(200).json({meeting: foundMeeting})
})

module.exports = app;
