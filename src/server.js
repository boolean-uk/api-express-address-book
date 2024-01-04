const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// import data
const contacts = require('../data/contacts')

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

module.exports = app
