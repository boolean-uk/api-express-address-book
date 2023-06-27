const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { firstName } = require("../test/fixtures/contacts/createTestFormData")
const app = express()
const contacts = require("../data/contacts")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

// Get all contacts
app.get("/contacts", (req, res) => {
    return res.send ( {contacts})
})

// Create new contact
app.post("/contacts", (req, res) => {
    const newContact = req.body
    newContact.id = contacts[contacts.length -1].id + 1
    contacts.push(newContact)
    return res.status(201).send ( { contact: newContact })
})

// Get contact by ID
app.get('/contacts/:id', (req, res) => {
  const id = req.params.id
  const contact = contacts.find((contact) => contact.id === Number(id))
  if (contact) {
    return res.send( { contact } )  
  } else {
    return res.send('No Contact Found')
  }
})

// Delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const targetContact = contacts.find((contact) => contact.id === id)
  const deletionIndex = contacts.indexOf(targetContact)
  contacts.splice(deletionIndex, 1)
  if (targetContact) {
    return res.send( { contact: targetContact } )
  } else {
    return res.send('No Contact Found')
  }
})

module.exports = app
