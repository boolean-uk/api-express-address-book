const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts");
app.get("/contacts", (req, res) => {
  res.send({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.send({ contact });
});

module.exports = app;
