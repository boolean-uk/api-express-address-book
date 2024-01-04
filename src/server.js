const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// import data
const contacts = require('../data/contacts')

// Configuration
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Global variables
let idCounter = contacts.length + 1

// Global functions
const findContactById = (id) => {
  const findContact = contacts.find((contact) => contact.id === Number(id))

  if (!findContact) {
    const err = new Error(`Contact with provided id doesn't found`)
    err.status = 404
    throw err
  }

  return findContact
}

// Retrieve a list of contacts
app.get('/contacts', (req, res, next) => {
  if (!Array.isArray(contacts) || contacts.length === 0) {
    return res.status(400).json({
      message: 'Contacts must be non-empty array'
    })
  }

  res.status(200).json({ contacts })
})

// Create a contact
app.post('/contacts', (req, res, next) => {
  const data = req.body

  for (let key in data) {
    if (typeof data[key] !== 'string') {
      return res
        .status(400)
        .json({ message: 'Bad request, all the items must be string' })
    }
  }

  contacts.push({ id: idCounter++, ...data })

  res.status(201).json({ ...data })
})

// Get a single contact by id
app.get('/contacts/:id', (req, res, next) => {
  try {
    const findContact = findContactById(req.params.id)

    res.status(200).json({ contact: findContact })
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message })
  }
})

// Delete a single contact by id
app.delete('/contacts/:id', (req, res, next) => {
  try {
    const findContact = findContactById(req.params.id)

    contacts.splice(
      contacts.findIndex((contact) => contact.id === findContact.id),
      1
    )

    res.status(200).json({ contact: findContact })
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message })
  }
})

module.exports = app
