const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const { contacts,
  addContact,
  getContactById,
  updateContact,
  deleteContactById } = require('../data/contacts.js')
const { meetings,
  addMeeting,
  getMeetingById,
  getMeetingsForContact,
  updateMeetingById,
  deleteMeetingById,
  deleteMeetingsForContact } = require('../data/meetings.js')

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
  console.log(contact, "HERE")
  return res.status(201).json( { contact }) 
})

app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params
  const contact = getContactById(Number(id))
  deleteContactById(id)
  deleteMeetingsForContact(Number(id))
  return res.json( { contact })
})

app.get('/meetings/', (req, res) => {
  return res.json( { meetings })
})

app.get('/meetings/:id', (req, res) => {
  const { id } = req.params
  const meeting = getMeetingById(Number(id))
  return res.json( { meeting })
})

app.get('/contacts/:id/meetings', (req, res) => {
  const { id } = req.params
  const meetings = getMeetingsForContact(Number(id))
  return res.json( { meetings })
})

app.post('/contacts/:id/meetings', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const meeting = addMeeting(name, Number(id))
  return res.status(201).json( { meeting })
})

app.put('/meetings/:id', (req, res) => {
  const { id } = req.params
  const { contactId, name } = req.body
  const meeting = updateMeetingById(Number(id), name, contactId)
  return res.json( { meeting })
})

app.delete('/meetings/:id', (req, res) => {
  const { id } = req.params
  const meeting = getMeetingById(Number(id))
  deleteMeetingById(Number(id))
  return res.json( { meeting })
})

module.exports = app
