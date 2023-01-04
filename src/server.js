const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const contacts = require('../data/contacts')
const { query } = require('express')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// write your app code here

//GET: All data
app.get('/contacts', (req, res) => {
  res.json({ contacts: contacts })
})

// GET: get data by id

app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)

  res.json({ contact })
})

app.post('/contacts', (req, res) => {
  const id = contacts.length + 1
  const newContact = { ...req.body, id }
  contacts.push(newContact)
  res.json({ newContact })
})

module.exports = app
