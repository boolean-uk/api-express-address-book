const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require("../data/contacts.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let currentContactId = 3
app.get('/contacts', (req, res) => {
    res.status(200).json({contacts:contacts})
    
})
app.post('/contacts', (req, res) => {
    const {firstName, lastName, street, city, type, email, linkedin, twitter} = req.body;
  
    const newContact = {
      id:currentContactId,
      firstName,
      lastName,
      street,
      city,
      type,
      email,
      linkedin,
      twitter,
    }
  
    contacts.push(newContact)
  
    // 201 = successfully created HTTP status code
    res.status(201).json({ contacts: newContact })
  })
  app.get('/contacts/:id', (req, res) => {
    // `req.params.id` is a string
    const contactId = Number(req.params.id)
  
    // Query the database to find the relevant post
    // Along the way, you should do some checks to make sure the user is authorised to do this:
    // Check if the post with ID `postId` exists
    // If the posts exists, then send the post back to the user who requested it.
    // If the post does not exist, then send an error message
  
    const foundContact = contacts.find((contact) => contact.id === contactId)
  
    if (!foundContact) {
      return res.status(404).json({
        message: `No contact with id ${contactId} exists!`
      })
    }
  
    return res.json({ contact: foundContact });
  })

module.exports = app
