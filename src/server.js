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
let newId= contacts.length
app.post('/contacts', (req,res) => {
    const contact = req.body
 const newContact= {
    ...contact,
    id : newId++
 }

 contacts.push(newContact)
 res.status(201).json({newContact})
})


module.exports = app
