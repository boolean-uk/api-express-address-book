const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const data = require("../data/contacts.js")
const meetings = require("../data/meetings.js")

const { createContact, formatContact, findContact, removeContact, updateContact } = require("./functions.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let currentId = 2

// GET ALL CONTACTS
app.get("/contacts", (req, res) => {

    const allContacts = {
        "contacts": data
    }
    return res.status(200).json(allContacts)
})

// CREATE NEW CONTACT
app.post("/contacts", (req, res) => {

    const newContact = createContact(req, data, currentId)
    return res.status(201).json(formatContact(newContact))
})

// FIND CONTACT BY ID
app.get("/contacts/:id", (req, res) => {

    const foundContact = findContact(req.params.id, res, data)
    return res.status(200).json(formatContact(foundContact))
})

// DELETE CONTACT BY ID
app.delete("/contacts/:id", (req, res) => {
    
    const foundContact = findContact(req.params.id, res, data)
    removeContact(data, foundContact)
    return res.status(200).json(formatContact(foundContact))
})

// UPDATE A CONTACT BY ID
app.put("/contacts/:id", (req, res) => {

    const contact = findContact(req.params.id, res, data)
    updateContact(req, contact)
    return res.status(200).json(formatContact(contact))
})

// EXTENSION
// GET ALL MEETINGS
app.get("/meetings", (req, res) => {
    
    const allMeetings = {
        meetings
    }
    return res.status(200).json(allMeetings)
})

module.exports = app
