const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { firstName } = require("../test/fixtures/contacts/createTestFormData")
const app = express()
const contacts = require("../data/contacts")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

app.get("/contacts", (req, res) => {
    return res.send ( {contacts})
})

app.post("/contacts", (req, res) => {
    const newContact = req.body
    newContact.id = contacts[contacts.length -1].id + 1
    contacts.push(newContact)
    return res.status(201).send ( { newContact })
})

module.exports = app
