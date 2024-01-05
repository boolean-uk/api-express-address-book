const express = require("express");
const router = express.Router();

const { contacts } = require("../../data/contacts.js");
let { idCounter } = require("../../data/contacts.js");

const findContactById = require("../client.js");

router.get("/", (req, res) => {
    return res.status(200).json({ contacts: contacts });
});

router.post("/", (req, res) => {
    let newContact = req.body;
    newContact = { id: idCounter, ...newContact };
    idCounter++;

    contacts.push(newContact);

    return res.status(201).json({ contact: newContact });
});

router.get("/:id", (req, res) => {
    const foundContact = findContactById(req, res);
    return res.status(200).json({ contact: foundContact });
});

router.delete("/:id", (req, res) => {
    const foundContact = findContactById(req, res);

    if (foundContact) {
        const foundContactIndex = contacts.indexOf(foundContact);
        contacts.splice(foundContactIndex, 1);

        const newMeetings = meetings.filter(
            (meetings) => meetings.contactId !== foundContact.id
        );
        meetings.splice(0, meetings.length, newMeetings);
    }

    res.status(200).json({ contact: foundContact });
});

router.put("/:id", (req, res) => {
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

module.exports = router;
