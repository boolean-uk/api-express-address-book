const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const importedContacts = require("../data/contacts");
console.log(importedContacts); // Check what's being imported
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let contacts = importedContacts; // Initialize contacts with imported data

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World!!" });
});

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

module.exports = app;
