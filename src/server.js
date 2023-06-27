const contacts = require("../data/contacts");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

// console.log(contacts);

// 1. Retrieve a list of contacts

app.get('/contacts', (req, res) => {
    return res.send({contacts})
})


module.exports = app;
