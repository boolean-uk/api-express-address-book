const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// import data
const contacts = require('../data/contacts')

// Global variables
let idCounter = contacts.length + 1

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// write your app code here

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

module.exports = app
