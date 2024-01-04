const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require("../data/contacts.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

app.get('/contacts', (req, res) => {
    res.status(200).json({contacts:contacts})
    
})
let currentContactId = 3
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
    res.status(201).json({ contact: newContact })
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
  app.delete('/contacts/:id', (req, res) => {
    const contactId = Number(req.params.id);

    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

    if (contactIndex === -1) {
        return res.status(404).json({ message: `Delete failed. No such contact with ID ${contactId}` });
    }

    // Get the deleted contact before splicing it out
    const deletedContact = contacts[contactIndex];

    // Remove the contact from the array
    contacts.splice(contactIndex, 1);

    return res.status(200).json({ contact: deletedContact, message: 'Successfully deleted contact' });
});
app.put('/contacts/:id', (req, res) => {
    const contactId = Number(req.params.id);
    // const text = req.body.text;
    const { firstName, lastName, street, city, type, email, linkedin, twitter} = req.body;
  
    const foundContact = contacts.find((contact) => contact.id === contactId);
  
    if (!foundContact) {
      return res.status(404).json({ message: `Update failed. No such post with ID ${contactId}`})
    }
  
    foundContact.firstName = firstName
    foundContact.lastName = lastName
    foundContact.street = street
    foundContact.city = city
    foundContact.type = type
    foundContact.email = email
    foundContact.linkedin = linkedin
    foundContact.twitter = twitter
  
    res.json({ contact: foundContact });
  })

module.exports = app
