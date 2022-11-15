//Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
//Include the cors middleware
const cors = require("cors");
//Include the databases
const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

const contactsWithMeetings = (contacts, meetings) => {
  contacts.contacts.forEach((c) => {
    const contactMeetings = meetings.meetings.filter(
      (m) => m.contactId == c.id
    );
    c.meetings = contactMeetings;
  });
  return contacts;
};

const sanitiseContactPost = (newContact) => {
  const keysInContacts = [
    "firstName",
    "lastName",
    "street",
    "city",
    "type",
    "email",
    "linkedin",
    "twitter",
  ];
  const keysInNewContact = Object.keys(newContact);
  const ObjKeysAreTheSame =
    keysInContacts.every((item) => keysInNewContact.includes(item)) &&
    keysInNewContact.every((item) => keysInContacts.includes(item));
  if (!ObjKeysAreTheSame) {
    throw new Error("Must provide correct keys to make a new contact");
  }
  return newContact;
};

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan("dev"));
//Tell express we want to use the cors library
app.use(cors());
//Tell express to parse JSON in the request body
app.use(express.json());
//Error handling

// app.use((error, req, res, next) => {
//     if (error.statusCode) {
//         return res.status(error.statusCode).json({ message: error.message })
//     }

//     res.status(500).json({ message: 'Oops! Something went wrong :(' })
// })

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

// GET

app.get("/contacts", (req, res) => {
  // Gets the list of contacts
  res.json(contactsWithMeetings(contacts, meetings));
});

app.get("/contacts/:id", (req, res) => {
  // Gets the contact by id
  const id = req.params.id;
  const contactsArr = contactsWithMeetings(contacts, meetings);
  const foundContact = contactsArr.contacts.find((c) => c.id === Number(id));
  res.json({ contact: foundContact });
});

app.get("/contacts/:id/meetings", (req, res) => {
  // Gets the contact meetings by id
  const id = req.params.id;
  const contactsArr = contactsWithMeetings(contacts, meetings);
  const foundContact = contactsArr.contacts.find((c) => c.id === Number(id));
  res.json({ meetings: foundContact.meetings });
});

app.get('/meetings', (req, res) => {
    // Gets all meetings
    res.json({meetings: meetings.meetings})
})

// POST

app.post("/contacts", (req, res) => {
  // Post a new contact
  const newContact = req.body;
  sanitiseContactPost(newContact);
  contacts.contacts.push({ id: contacts.contacts.length + 1, ...newContact });
  res.status(201).json(contacts.contacts.slice(-1).pop());
});

app.post("/contacts/:id/meetings", (req, res) => {
  // Post a new meeting by contact id
  const input = req.body;
  const id = req.params.id;
  if (Object.keys(input)[0] !== 'name') {
    throw new Error('Must only provide a name for the meeting')
  }
  const contactsArr = contactsWithMeetings(contacts, meetings);
  const foundContact = contactsArr.contacts.find((c) => c.id === Number(id));
  const newMeeting = {contactId: String(foundContact.id), id: meetings.meetings.length + 1, ...input}
  meetings.meetings.push(newMeeting)
  res.json({meeting: newMeeting});
});

app.post("/meetings", (req, res) => {
  // Post a new meeting
  const input = req.body;
  if (Object.keys(input).length !== 2) {
    throw new Error('Must provide a valid input for the meeting')
  }
  const newMeeting = {id: meetings.meetings.length + 1, ...input}
  meetings.meetings.push(newMeeting)
  res.json({meeting: newMeeting});
});

// DELETE

app.delete("/contacts/:id", (req, res) => {
    // delete a contact by id
  const id = req.params.id;
  const foundContact = contacts.contacts.find((c) => c.id === Number(id));
  const indexOfContact = contacts.contacts.indexOf(foundContact);
  contacts.contacts.splice(indexOfContact, 1);
  res.json({ contact: foundContact });
});

// PUT

app.put("/contacts/:id", (req, res) => {
    // update a contact by id
  const id = req.params.id;
  const foundContact = contacts.contacts.find((c) => c.id === Number(id));
  const indexOfContact = contacts.contacts.indexOf(foundContact);
  const updatedContact = req.body;
  contacts.contacts[indexOfContact] = {
    ...foundContact,
    ...updatedContact,
  };
  res.json({ contact: contacts.contacts[indexOfContact] });
});

app.put("/contacts/:id/meetings/:id", (req, res) => {
    // update a meeting by contact id
    const input = req.body;
    const id = req.params.id;
    if (Object.keys(input)[0] !== 'name') {
      throw new Error('Must only provide a new name for the meeting')
    }
    const foundMeeting = meetings.meetings.find((m) => m.id === Number(id));
    const indexOfMeeting = meetings.meetings.indexOf(foundMeeting);
    meetings.meetings[indexOfMeeting].name = input.name
    res.json({meeting: meetings.meetings[indexOfMeeting]});
  });
