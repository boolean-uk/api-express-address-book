const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const state = {
  contacts: require('./data/contacts'),
  meetings: require('./data/meetings')
}

app.get('/contacts', (req, res) => {
  res.json({contacts: state.contacts})
})

app.get('/contacts/:id', (req, res) => {
  const contact = state.contacts.find(item => item.id === Number(req.params.id))

  res.json({contact: contact})
})

app.get('/contacts/:id/meetings', (req, res) => {
  const filteredMeetings = state.meetings.filter(meeting => meeting.contactId === req.params.id)

  res.json({meetings: filteredMeetings})
})

app.post('/contacts', (req, res) => {
  const contactData = {...req.body, id: state.contacts.length+1}
  state.contacts.push(contactData)

  res.json({contact: contactData})
})

app.put('/contacts/:id', (req, res) => {
  state.contacts = state.contacts.map(contact => {
    if (contact.id === Number(req.params.id)) {
      return { ...contact, ...req.body }
    } else {
      return contact
    }
  })
  const contact = state.contacts.find(item => item.id === Number(req.params.id))

  res.json({contact: contact})
})

app.delete('/contacts/:id', (req, res) => {
  const contact = state.contacts.find(item => item.id === Number(req.params.id))
  const index = state.contacts.indexOf(contact)
  state.contacts.splice(index, 1)

  res.json({contact: contact})
})


module.exports = {
  app: app,
  state: state
}
