const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const importContacts = require("../data/contacts")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let contacts = importContacts

app.get('/', (req, res) => {
    res.status(201).json({message: "Welcome to my contacts page"})
})

// Get request to return contacts
app.get('/contacts', (req, res) => {
res.json({contacts: contacts})
})

module.exports = app
