const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const { contacts, addContact, getContactById, updateContact, deleteContactById } = require('../data/contacts.js')

app.get('/contacts', (req, res) => {
  return res.json({ contacts })
})

app.get('/contacts/:id', (req, res) => {
  const { id } = req.params
  const contact = getContactById(Number(id))
  return res.json( { contact })
})

app.put('/contacts/:id', (req, res) => {
  const { id } = req.params
  const newBody = req.body
  const contact = updateContact(Number(id), newBody)
  return res.json({ contact })
})

app.post('/contacts', (req, res) => {
  const contact = addContact(req.body)
  return res.status(201).json( { contact }) 
})

app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params
  const contact = getContactById(Number(id))
  deleteContactById(id)
  return res.json( { contact })
})

module.exports = app
