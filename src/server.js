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
    res.json('hello')
})


module.exports = app
