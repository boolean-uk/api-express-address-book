const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = require("../data/contacts.js");
const meetings = require("../data/meetings.js");

// initializing express app
const app = express();

// Middleware setup for logging and handling CORS
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

module.exports = app

// intial  state setup for contacts and meetings
const STATE = {
    contacts,
    nextContactId: 3,
    meetings,
    nextMeetingId: 4,
  };

// Function to get the next contact ID and meeting ID
const getNextContactId = () => {
    return STATE.nextContactId++;
  };
  
  const getNextMeetingId = () => {
    return STATE.nextMeetingId++;
  };

/**
 * Function to find the index of an item in an array based on the ID in the request parameters.
 * @param {array} array - The array to search in.
 * @param {import('express').Request} req - The Express request object.
 * @returns {number} - Index of the item in the array.
 */
const findStateIndex = (array, req) => {
    const { id } = req.params;
    const foundIndex = array.findIndex((contact) => contact.id === Number(id));
    return foundIndex;
  };
  
  // Route to get all contacts
  app.get("/contacts", (req, res) => {
    res.json({ contacts: STATE.contacts });
  });
  
  // Route to add a new contact
  app.post("/contacts", (req, res) => {
    const count = STATE.contacts.push(req.body);
    const newContact = { contact: STATE.contacts[count - 1] };
    newContact.contact.id = getNextContactId();
    res.status(201).json(newContact);
  });
  
  // Route to get a specific contact by ID
  app.get("/contacts/:id", (req, res) => {
    const foundIndex = findStateIndex(STATE.contacts, req);
    res.json({ contact: STATE.contacts[foundIndex] });
  });
  
  // Route to delete a contact by ID
  app.delete("/contacts/:id", (req, res) => {
    const foundContactIndex = findStateIndex(STATE.contacts, req);
    const [removedContact] = STATE.contacts.splice(foundContactIndex, 1);
  
    // Remove associated meetings for the deleted contact
    STATE.meetings = STATE.meetings.filter(
      (meeting) => meeting.contactId !== Number(req.params.id)
    );
  
    res.json({ contact: removedContact });
  });
  
  // Route to update a contact by ID
  app.put("/contacts/:id", (req, res) => {
    const foundIndex = findStateIndex(STATE.contacts, req);
    const foundContact = (STATE.contacts[foundIndex] = {
      ...req.body,
      id: Number(req.params.id),
    });
  
    res.json({ contact: foundContact });
  });


  // Code for the meeting part 

  // Codes --- route for handling HTTP GET, Delete , Put , Post requests to the "/meetings by ID" endpoint. 

app.get("/meetings", (req, res) => {
    res.json({ meetings: STATE.meetings });
  });
  
  app.get("/meetings/:id", (req, res) => {
    const foundIndex = findStateIndex(STATE.meetings, req);
    res.json({ meeting: STATE.meetings[foundIndex] });
  });
  
  app.delete("/meetings/:id", (req, res) => {
    const foundIndex = findStateIndex(STATE.meetings, req);
    const [removedMeeting] = STATE.meetings.splice(foundIndex, 1);
    res.json({ meeting: removedMeeting });
  });
  
  app.put("/meetings/:id", (req, res) => {
    const foundMeetingIndex = findStateIndex(STATE.meetings, req);
    const foundMeeting = STATE.meetings[foundMeetingIndex];
  
    foundMeeting.name = req.body.name;
    res.json({ meeting: foundMeeting });
  });
  
  app.get("/contacts/:id/meetings", (req, res) => {
    const foundContactIndex = findStateIndex(STATE.contacts, req);
    const foundMeetings = STATE.meetings.filter(
      (meeting) => meeting.contactId === Number(req.params.id)
    );
    res.json({ meetings: foundMeetings });
  });
  
  app.post("/contacts/:id/meetings", (req, res) => {
    const count = STATE.meetings.push(req.body);
    const newMeeting = { meeting: STATE.meetings[count - 1] };
  
    newMeeting.meeting.id = getNextMeetingId();
    newMeeting.meeting.contactId = Number(req.params.id);
  
    res.status(201).json(newMeeting);
  });
  
  module.exports = app;
