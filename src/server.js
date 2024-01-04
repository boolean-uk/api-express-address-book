const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const data = require("../data/contacts.js")

const { formatContact, findContact, removeContact, updateContact } = require("./functions.js")

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

    const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body

    const newContact = {
        id: ++currentId,
        firstName,
        lastName,
        street,
        city,
        type,
        email,
        linkedin,
        twitter
    }

    data.push(newContact)

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

// UPDATE A CONTACT
app.put("/contacts/:id", (req, res) => {

    const contact = findContact(req.params.id, res, data)

    updateContact(req, contact)

    return res.status(200).json(formatContact(contact))
})

module.exports = app
