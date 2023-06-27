const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// write your app code here
const contacts = []
let id = 0
const findById = (id) => {
  return contacts.find((item) => item.id === id)
}
app.get('/contacts', (req, res) => {
  return res.send(contacts)
})
app.post('/contacts', (req, res) => {
  const body = req.body
  body.id = id
  id++
  contacts.push(body)
  return res.status(201).send({ contact: body })
})
app.get('/contacts/:id', (req, res) => {
  const contactId = Number(req.params.id)
  const foundContact = findById(contactId)
  if (foundContact) {
    return res.status(200).send({ contact: foundContact })
  } else {
    return res.status(404).send('Contact not found')
  }
})
app.delete('/contacts/:id', (req, res) => {
  const contactId = Number(req.params.id)
  const contactIndx = contacts.findIndex((item) => item.id === contactId)
  console.log(contactIndx)
  if (contactIndx !== -1) {
    const contactToDelete = findById(contactId)
    contacts.splice(contactIndx, 1)
    return res.status(200).send({ contact: contactToDelete })
  } else {
    return res.status(404).send('Contact not found')
  }
})
module.exports = app
