const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { meetings } = require("../data/meetings.js");
let { meetingsIdCounter } = require("../data/meetings.js");
const { contacts } = require("../data/contacts.js");
let { idCounter } = require("../data/contacts.js");
const {
    findContactById,
    findMeetingById,
    findMeetingsByContactId,
} = require("./client.js");
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
    const foundContact = findContactById(req, res);
    return res.status(200).json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
    const foundContact = findContactById(req, res);

    if (foundContact) {
        const foundContactIndex = contacts.indexOf(foundContact);
        contacts.splice(foundContactIndex, 1);
        
        const newMeetings = meetings.filter((meetings) => meetings.contactId !== foundContact.id)
        meetings.splice(0, meetings.length, newMeetings)
    }

    res.status(200).json({ contact: foundContact });
});

app.put("/contacts/:id", (req, res) => {
    const foundContact = findContactById(req, res);

    if (foundContact) {
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

        (foundContact.firstName = firstName),
            (foundContact.lastName = lastName),
            (foundContact.street = street),
            (foundContact.city = city),
            (foundContact.type = type),
            (foundContact.email = email),
            (foundContact.linkedin = linkedin),
            (foundContact.twitter = twitter);
    }

    return res.status(200).json({ contact: foundContact });
});

// ............... EXTENSION ..............

app.get("/meetings", (req, res) => {
    return res.status(200).json({ meetings: meetings });
});

app.get("/meetings/:id", (req, res) => {
    const foundMeeting = findMeetingById(req, res);
    return res.status(200).json({ meeting: foundMeeting });
});

app.delete("/meetings/:id", (req, res) => {
    const foundMeetingToDelete = findMeetingById(req, res);

    if (foundMeetingToDelete) {
        const foundMeetingIndex = meetings.indexOf(foundMeetingToDelete);
        meetings.splice(foundMeetingIndex, 1);
    }
    return res.status(200).json({ meeting: foundMeetingToDelete });
});

app.put("/meetings/:id", (req, res) => {
    const foundMeetingToUpdate = findMeetingById(req, res);

    if (foundMeetingToUpdate) {
        const { name } = req.body;

        foundMeetingToUpdate.name = name;
    }
    return res.status(200).json({ meeting: foundMeetingToUpdate });
});

app.get("/contacts/:id/meetings", (req, res) => {
    const foundMeetings = findMeetingsByContactId(req, res);
    console.log(foundMeetings)
    return res.status(200).json({ meetings: foundMeetings });
});

app.post("/contacts/:id/meetings", (req, res) => {
    const contactId = Number(req.params.id);
    let newMeeting = req.body;
    newMeeting = {  ...newMeeting, contactId: contactId, id: meetingsIdCounter };
    meetingsIdCounter++;

    meetings.push(newMeeting)

    return res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
