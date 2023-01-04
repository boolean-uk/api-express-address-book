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

const contacts = require("../data/contacts.json");
const meetings = require("../data/meetings.json");

// add your routes here
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// craete contact
app.post("/contacts", (req, res) => {
  const contactGiven = req.body;
  let uniqueId = 0;
  contacts.contacts.forEach((contact) => {
    uniqueId = contact.id + 1
    console.log(contact.id, "hoh");
  });
  contactGiven.id = uniqueId;

  contacts.contacts.push(contactGiven);
  // console.log(contacts, " contacts");
  res.json(contacts);
});

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
