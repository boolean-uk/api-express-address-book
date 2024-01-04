const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const contacts = require('../data/contacts.js')

app.get('/contacts', (req, res) => {
  return res.json({ contacts })
})

module.exports = app
