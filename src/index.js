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
// retrieve all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// craete contact
app.post("/contacts", (req, res) => {
  const contactGiven = req.body;
  let uniqueId = 0;
  contacts.contacts.forEach((contact) => {
    uniqueId = contact.id + 1;
    console.log(contact.id, "hoh");
  });
  contactGiven.id = uniqueId;

  contacts.contacts.push(contactGiven);
  // console.log(contacts, " contacts");
  res.json(contacts);
});

// get single contact by ID
app.get("/contacts/:id", (req, res) => {
  const paramID = Number(req.params.id);

  const chosenId = contacts.contacts.find((contact) => contact.id === paramID);

  console.log(chosenId);
  res.json(chosenId);
  console.log(req.params.id, "hi");
});

// Delete a single contact by ID
app.delete("/contacts/:id", (req, res) => {
  const paramID = Number(req.params.id);

  const indexContact = contacts.contacts.findIndex(
    (contact) => contact.id === paramID
  );
  contacts.contacts.splice(indexContact, 1);
  res.json(contacts);
});

// update contact byID
app.put("/contacts/:id", (req, res) => {
  const paramId = Number(req.params.id);
  // console.log(req.body)
  const reqBody = req.body;
  reqBody.id = paramId;

  contacts.contacts.map((contact) => {
    if (contact.id === paramId) {
      console.log(reqBody);
      contact = reqBody;
    }
  });
  console.log();

  res.json(contacts);
});

// Retrieve a list of all meetings

app.get("/meetings", (req, res) => {
  res.json(meetings);
});

// Get a meeting by id
app.get("/meetings/:id", (req, res) => {
  const paramId = Number(req.params.id);
  chosenId = meetings.meetings.find((meeting) => meeting.id !== paramId);
  res.json(chosenId);
});

// Delete a meeting by id

app.delete("/meetings/:id", (req, res)=>{
  const paramId = Number(req.params.id)
  const filter = meetings.meetings.filter((meeting)=>meeting.id!==paramId)
  res.json(filter)
})

// Update a meeting for a contact

app.put("/meetings/:id", (req, res)=>{
  const paramId = Number(req.params.id);
  const updateById = req.body
  updateById.id = paramId
  meetings.meetings.map((meeting)=>{
    if(meeting.id===paramId){
      meeting = updateById
    }
  })
  console.log(updateById)
  res.json(meetings)
}) 

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
