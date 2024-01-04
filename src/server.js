const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { contacts } = require("../data/contacts.js");
let { idCounter } = require("../data/contacts.js");
const foundContactById = require("./client.js");
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

module.exports = app;
