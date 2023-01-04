//Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
//Include the cors middleware
const cors = require("cors");

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan("dev"));
//Tell express we want to use the cors library
app.use(cors());
//Tell express to parse JSON in the request body
app.use(express.json());

const contacts = require("../../api-sample-client/data/contacts");

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  res.json({});
});

// add your routes here
module.exports = app;
