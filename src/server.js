const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require("../data/contacts.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
app.get('/contacts', (req, res) => {
    res.status(200).json(contacts)
})

module.exports = app
