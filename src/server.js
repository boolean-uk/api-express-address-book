const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = require("../data/contacts")

app.get('/contacts', (req, res) => {
    res.status(200).json({contacts})
})


module.exports = app
