const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3030

let contacts = require('./data/contacts')
const meetings = require('./data/meetings')

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
// GET request
// 1st arg: the path
// 2nd arg: a function -> what to do when a particular request is received.
app.get("/", (req, res) => {
  res.json("hello!")
})

app.get('/contacts', (req, res) => {
  res.json({contacts: contacts})
})

app.get('/contacts/:id', (req, res) => {
  // 0. extract id from the path
  const contact = contacts.find(item => item.id === Number(req.params.id))
  // 1. search the contacts array
  // 2. find the contact

  res.json({contact: contact})
})

app.get('/contacts/:id/meetings', (req, res) => {
  const filteredMeetings = meetings.filter(meeting => meeting.contactId === req.params.id)
  // which meetings to send back
  res.json({meetings: filteredMeetings})
})

app.post('/contacts', (req, res) => {
  // extract data from the body
  const contactData = {...req.body, id: contacts.length+1}
  // add data to the store of contacts
  contacts.push(contactData)
  // send back the response
  res.json({contact: contactData})
})

app.put('/contacts/:id', (req, res) => {
  // extract data from the body
  // find the contact in the contacts array
  const contact = contacts.find(item => item.id === Number(req.params.id))
  // update the contact data
  // contact.id = req.body.id
  // contacts = contacts.map(item => {
  //   if (item.id === contact.id) {
  //     return {...req.body}
  //   } else {
  //     return item
  //   }
  // })
  contact.firstName = req.body.firstName
  contact.lastName = req.body.lastName
  contact.street = req.body.street
  contact.city = req.body.city
  contact.type = req.body.type
  contact.email = req.body.email
  contact.linkedin = req.body.linkedin
  contact.twitter = req.body.twitter

  console.log(contact)
  // update it with the right data
  // send back the response
  res.json({contact: contact})
})

app.delete('/contacts/:id', (req, res) => {
  // find the contact
  const contact = contacts.find(item => item.id === Number(req.params.id))
  // remove it from the array
  const index = contacts.indexOf(contact)
  contacts.splice(index, 1)
  res.json({})
  //
})


app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})
