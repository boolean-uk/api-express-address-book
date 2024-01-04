const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contacts = require("../data/contacts.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const STATE = {
  contacts,
};

app.get("/contacts", (req, res) => {
  res.json({ contacts: STATE.contacts });
});

module.exports = app;
