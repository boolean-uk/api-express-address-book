const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const { contacts, addContact, getContactById, deleteContactById } = require('../data/contacts.js')

app.get('/contacts', (req, res) => {
  return res.json({ contacts })
})

app.post('/contacts', (req, res) => {
  const contact = addContact(
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string"
  )
  return res.status(201).json( { contact }) 
})

app.delete('/contacts/:id', (req, res) => {
  const { id } = Number(req.params)
  const contact = getContactById(id)
  deleteContactById(id)
  return res.json( { contact })
})

module.exports = app
