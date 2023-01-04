const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require('../data/contacts.js')
console.log('contacts are: ', contacts)
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

 // // READ
// GET ALL contacts: GET http://localhost:3030/contacts
app.get("/contacts", (req, res) => {
    // 1. send back a response with all contacts
    res.json(contacts)
  })
  
  // GET A SPECIFIC contact ( BY ID ): GET http://localhost:3030/contacts/2
  app.get("/contacts/:id", (req, res) => {
    // 1. extract the data from the request parameter
    // 2. convert to number
    const id = Number(req.params.id)
    // 3. find the corresponding array item with that id from contacts
    const contact = contacts.find(item => item.id === id)
    // 4. send it back in the response
    res.json(contact)
  })

// // CREATE
// CREATE A Contact
app.post("/contacts", (req, res) => {
    const contact = (req.body)
    contacts.push(contact)
    res.json(contacts)
})

// // UPDATE
// UPDATE A CONTACT BY ID
app.patch("/contacts/:id", (req, res) => {
    // 1. extract the data from the request parameter
    // 2. convert to number
    const id = Number(req.params.id)
    // 3. find the corresponding array item with that id from contacts
    let contact = contacts.find(item => item.id === id)

    const updatedContact = {
        "id": id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "street": req.body.street,
        "city": req.body.city,
        "type": req.body.type,
        "email": req.body.email,
        "linkedin": req.body.linkedin,
        "twitter": req.body.twitter
   }
   let index = contacts.indexOf(contact)
   if (index !== -1) {
    contacts[index]= updatedContact
  }
  
    // 4. send it back in the response
    res.json(contacts)
  })

  // // DELETE
// DELETE A CONTACT BY ID
app.delete("/contacts/:id", (req, res) => {
    // 1. extract the data from the request parameter
    // 2. convert to number
    const id = Number(req.params.id)
    // 3. find the corresponding array item with that id from contacts
    const contact = contacts.find(item => item.id === id)
    let index = contacts.indexOf(contact);
    contacts.splice(index, 1)
    // 4. send it back in the response
    res.json(contacts)
  })
module.exports = app

