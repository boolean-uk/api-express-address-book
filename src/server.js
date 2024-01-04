//import contacts  from "../data/contacts"
const contacts = require('../data/contacts')


const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())



// write your app code here


app.get('/contacts', (req , res) => {
    res.status(200).json({"contacts":contacts})
})

// create contacts
let newId = contacts.length+1

app.post('/contacts', (req,res) => {
    const contact = req.body
 const newContact= {
    ...contact,
    id : newId++
 }

 contacts.push(newContact)
 res.status(201).json({newContact})
})

// get a single contact by id

app.get('/contacts/:id', (req , res)  => {

    const contactsId = Number(req.params.id)
    const findContacts = contacts.find((contact) => contact.id === contactsId)
    res.status(200).json({contact:findContacts})
})

app.delete('/contacts/:id', (req,res) => {
    const contactsId = Number(req.params.id)
    const findContacts = contacts.find((contact) => contact.id === contactsId)
    const contactIndex = contacts.indexOf(findContacts)
    contacts.splice(contactIndex, 1)

    res.status(200).json({contact: findContacts})
})


module.exports = app
