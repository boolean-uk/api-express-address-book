const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let contacts = []

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World!!" });
});

app.get("/contacts", (req, res) => {
  res.status(200).json([contacts]);
});

module.exports = app;
