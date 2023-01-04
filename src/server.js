const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
let contacts = require('../data/contacts')
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

// POST: creating a new contact and adding it to the initial contact data
app.post('/contacts', (req, res) => {
  let id
  if (contacts.length === 0) {
    id = 1
  } else {
    id = contacts[contacts.length - 1].id + 1
  }

  const newContact = { ...req.body, id }
  contacts.push(newContact)
  res.status(201).json({ newContact })
})

//
app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)
  //   contacts = contacts.filter((singleContact) => singleContact.id !== contact.id)
  contacts.splice(contacts.indexOf(contact), 1)
  res.json({ contact })
})

app.put('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)
  contacts = contacts.map((singleContact) => {
    if (singleContact.id === contact.id) {
      return { ...req.body, id }
    } else return singleContact
  })
  res.status(201).json({ contact })
})

module.exports = app
