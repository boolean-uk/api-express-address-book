const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
const contacts = []

app.get('/contacts', (req, res) => {
    return res.send(contacts)
})

app.post('/contacts', (req, res) => {
    const body = req.body
    return res.status(200).send(body)
})

module.exports = app
