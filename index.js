//Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
//Include the cors middleware
const cors = require("cors");
//Include the database
const contacts = require("./data/contacts");

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan("dev"));
//Tell express we want to use the cors library
app.use(cors());
//Tell express to parse JSON in the request body
app.use(express.json());

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

// GET

app.get("/contacts", (req, res) => {
  // Gets the list of contacts
  res.json(contacts);
});

app.get("/contacts/:id", (req, res) => {
  // Gets the contact by id
  const id = req.params.id;
  const foundContact = contacts.contacts.find((c) => c.id === Number(id));
  res.json(foundContact);
});

// POST

app.post("/contacts", (req, res) => {
  // Post a new contact
  const newContact = req.body;
  contacts.contacts.push({ id: contacts.contacts.length + 1, ...newContact });
  res.status(201).json(newContact);
});

// DELETE

app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const foundContact = contacts.contacts.find((c) => c.id === Number(id));
  const indexOfContact = contacts.contacts.indexOf(foundContact);
  contacts.contacts.splice(indexOfContact, 1);
  res.json(foundContact);
});

// PUT

app.put("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const foundContact = contacts.contacts.find((c) => c.id === Number(id));
  const indexOfContact = contacts.contacts.indexOf(foundContact);
  const updatedContact = req.body;
  console.log(updatedContact)
  const updatedContact2 = contacts.contacts[indexOfContact] = {...updatedContact, ...foundContact};
  res.json(updatedContact2)
});
