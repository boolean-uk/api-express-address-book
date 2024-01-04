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

module.exports = app
