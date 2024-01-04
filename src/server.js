const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const data = require("../data/contacts.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

app.get("/contacts", (req, res) => {

    const allContacts = {
        "contacts": data
    }

    return res.status(200).json(allContacts)
})

module.exports = app
