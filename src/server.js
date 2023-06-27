const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get contacts
app.get('/contacts', (req, res) => {
  console.log(contacts);
  return res.send({ contacts })
})



module.exports = app;
