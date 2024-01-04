const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contactsData = require("../data/contacts")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.get('/contacts', (req, res) => {
    return res.json({"contacts": contactsData})
})

module.exports = app
