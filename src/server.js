const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = require("../data/contacts")
let currentContactId = contacts[contacts.length - 1].id

app.get('/contacts', (req, res) => {
    res.status(200).json({contacts})
})

app.get('/contacts/:id', (req, res) => {
    const contact = contacts.find((c) => c.id === Number(req.params.id))
    res.status(200).json({contact})
})

app.post('/contacts', (req, res) => {
    const body = req.body

    const newContact = {
        ...body,
        id: ++currentContactId,
    }

    contacts.push(newContact)
    return res.status(201).json({ contact: newContact })
})

app.put('/contacts/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = contacts.findIndex((c) => c.id === id);

    console.log(index)

    if (index !== -1) {
        const updatedContact = { id, ...req.body }
        contacts[index] = updatedContact
        res.status(200).json({ contact: updatedContact })
    } else {
        res.status(404).json()
    }

})

app.delete('/contacts/:id', (req, res) => {
    const contact = contacts.find((c) => c.id === Number(req.params.id))
    contacts.splice(contacts.indexOf(contact), 1)
    res.status(200).json({contact})
})



module.exports = app
