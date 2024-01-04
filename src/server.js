const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const contacts = require('../data/contacts.js')
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
 return res.status(200).json('Welcome to contacts')
})

app.get('/contacts', (req, res) => {
    return res.status(200).json({contacts: contacts})
})


module.exports = app
