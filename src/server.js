const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const findContactById = (id, res) => {
  const foundContact = contacts.find((contact) => contact.id === id);
  if (!foundContact) {
    res.status(404).json(`No contact found with id ${id}.`);
  }
  return foundContact;
};

const findMeetingById = (id, res) => {
  const foundMeeting = meetings.find((meeting) => meeting.id === id);
  if (!foundMeeting) {
    res.status(404).json(`No meeting found with id ${id}.`);
  }
  return foundMeeting;
};

const deleteMeetingsByContactId = (contactId) => {
  meetings
    .filter((meeting) => meeting.contactId === contactId)
    .forEach((meeting) => {
      const index = meetings.indexOf(meeting);
      meetings.splice(index, 1);
    });
};

const getIdFromParams = (params) => parseInt(params.id);

// Core Routes
app.get("/contacts", (req, res) => res.json({ contacts }));

app.post("/contacts", (req, res) => {
  const newContact = { ...req.body, id: contacts.length + 1 };
  contacts.push(newContact);
  res.status(201).json({ contact: newContact });
});

app
  .route("/contacts/:id")
  .get((req, res) => {
    const id = getIdFromParams(req.params);
    const foundContact = findContactById(id, res);
    res.json({ contact: foundContact });
  })
  .delete((req, res) => {
    const id = getIdFromParams(req.params);
    const foundContact = findContactById(id, res);
    const index = contacts.indexOf(foundContact);
    contacts.splice(index, 1);
    deleteMeetingsByContactId(id);
    res.json({ contact: foundContact });
  })
  .put((req, res) => {
    const id = getIdFromParams(req.params);
    const foundContact = findContactById(id, res);
    const index = contacts.indexOf(foundContact);
    const updatedContact = { ...req.body, id };

    if (!Object.values(updatedContact).every((value) => value)) {
      res.status(422).json("Cannot update - missing input");
    }

    contacts.splice(index, 1, updatedContact);
    res.json({ contact: updatedContact });
  });

// Extension Routes
app.get("/meetings", (req, res) => res.json({ meetings }));

app
  .route("/meetings/:id")
  .get((req, res) => {
    const id = getIdFromParams(req.params);
    const foundMeeting = findMeetingById(id, res);

    if (foundMeeting) {
      res.json({ meeting: foundMeeting });
    }
  })
  .delete((req, res) => {
    const id = getIdFromParams(req.params);
    const foundMeeting = findMeetingById(id, res);

    if (foundMeeting) {
      const index = meetings.indexOf(foundMeeting);
      meetings.splice(index, 1);
      res.json({ meeting: foundMeeting });
    }
  })
  .put((req, res) => {
    const id = getIdFromParams(req.params);
    const updatedMeeting = req.body;
    const foundMeeting = findMeetingById(id, res);

    if (foundMeeting) {
      foundMeeting.name = updatedMeeting.name;
      res.json({ meeting: foundMeeting });
    }
  });

app
  .route("/contacts/:id/meetings")
  .get((req, res) => {
    const contactId = getIdFromParams(req.params);
    findContactById(contactId, res);
    const meetingsForContact = meetings.filter(
      (meeting) => meeting.contactId === contactId
    );

    if (meetingsForContact) {
      res.json({ meetings: meetingsForContact });
    }
  })
  .post((req, res) => {
    const id = meetings.length + 1;
    const contactId = getIdFromParams(req.params);
    findContactById(contactId, res);
    const newMeeting = { ...req.body, id, contactId };

    if (newMeeting.name) {
      meetings.push(newMeeting);
      res.status(201).json({ meeting: newMeeting });
    } else {
      res.status(422).json("Missing input name - could not add this meeting.");
    }
  });

module.exports = app;
