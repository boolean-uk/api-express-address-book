const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
const contacts = [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Carmack",
      "street": "10 Keen Street",
      "city": "London",
      "type": "work",
      "email": "test@test.com",
      "linkedin": "https://www.linkedin.com/school/boolean-uk/",
      "twitter": "https://twitter.com/booleanuk"
    },
    {
      "id": 2,
      "firstName": "Grace",
      "lastName": "Hopper",
      "street": "32 Deebug Road",
      "city": "London",
      "type": "personal",
      "email": "test@test.com",
      "linkedin": "https://www.linkedin.com/school/boolean-uk/",
      "twitter": "https://twitter.com/booleanuk"
    }
  ]

app.get('/contacts', (req, res) => {
    return res.status(200).send({contacts})
})
app.get('/contacts/:id', (req, res) => {
    const idNum = Number(req.params.id)
    const foundContact = contacts.find(contact => {
        return contact.id === idNum
    })
    return res.status(200).send({contact: foundContact})
})
app.post('/contacts', (req, res) => {
    const body = req.body
    const lastIdValue = contacts[contacts.length - 1].id
    body.id = lastIdValue + 1
    contacts.push(body)
    return res.status(201).send({contact: body})
})
app.delete('/contacts/:id', (req, res) => {
    const idNum = Number(req.params.id)
    let indexNum
    const contactById = contacts.find((contact, index) => {
        indexNum = index
        return contact.id === idNum
    })
    contacts.splice(indexNum, 1)
    return res.status(200).send({contact: contactById})
})
app.put('/contacts/:id', (req, res) => {
    const idNum = Number(req.params.id)
    const contactById = contacts.findIndex((contact) =>{
        return contact.id === idNum
    })
    const contact = req.body   
    contact.id = idNum 
    contacts[contactById] = contact

    return res.status(200).send({contact: contacts[contactById]})
})

module.exports = app
