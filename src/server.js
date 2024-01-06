const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let meetingData = require("../data/meetings");
const contactsData = require("../data/contacts");

const findContactById = (id, res) => {
  const foundContact = contactsData.find((contact) => contact.id === id);

  if (!foundContact) {
    res.status(404).json({ error: `No contact found with ID: ${id}` });
  }

  return foundContact;
};

const findMeetingById = (id, res) => {
  const foundMeeting = meetingData.find((meeting) => meeting.id === id);

  if (!foundMeeting) {
    res.status(404).json({ error: `No meeting found with ID: ${id}` });
  }

  return foundMeeting;
};

const getContacts = (req, res) => {
  res.status(200).json({ contacts: contactsData });
};

const createContact = (req, res) => {
  const { body } = req;

  const newContact = {
    ...body,
    id: contactsData.length + 1,
  };

  contactsData.push(newContact);

  res.status(201).json({ contact: newContact });
};

const getContactById = (req, res) => {
  const contact = findContactById(Number(req.params.id), res);

  if (contact) {
    res.status(200).json({ contact });
  }
};

const deleteContactById = (req, res) => {
  const contact = findContactById(Number(req.params.id), res);

  if (contact) {
    const contactIndex = contactsData.indexOf(contact);

    contactsData.splice(contactIndex, 1);

    meetingData = meetingData.filter(
      (meeting) => meeting.contactId !== Number(req.params.id)
    );

    res.status(200).json({ contact });
  }
};

const updateContactById = (req, res) => {
  const contact = findContactById(Number(req.params.id), res);
  const { body } = req;

  if (contact) {
    const updatedContact = {
      ...contact,
      ...body,
      id: contact.id,
    };

    const contactIndex = contactsData.indexOf(contact);

    contactsData[contactIndex] = updatedContact;

    res.status(200).json({ contact: updatedContact });
  }
};

const getMeetings = (req, res) => {
  res.status(200).json({ meetings: meetingData });
};

const getMeetingById = (req, res) => {
  const meeting = findMeetingById(Number(req.params.id), res);

  if (meeting) {
    res.status(200).json({ meeting });
  }
};

const deleteMeetingById = (req, res) => {
  const meeting = findMeetingById(Number(req.params.id), res);

  if (meeting) {
    const meetingIndex = meetingData.indexOf(meeting);

    meetingData.splice(meetingIndex, 1);
    res.status(200).json({ meeting });
  }
};

const updateMeetingById = (req, res) => {
  const meeting = findMeetingById(Number(req.params.id), res);
  const { body } = req;

  if (meeting) {
    const updatedMeeting = {
      ...meeting,
      ...body,
      id: meeting.id,
    };

    const meetingIndex = meetingData.indexOf(meeting);

    meetingData[meetingIndex] = updatedMeeting;

    res.status(200).json({ meeting: updatedMeeting });
  }
};

const getContactMeetings = (req, res) => {
  const contact = findContactById(Number(req.params.id), res);

  if (contact) {
    if (contact.meetings) {
      return res.status(200).json({ meetings: contact.meetings });
    }

    return res
      .status(404)
      .json({ error: `No meetings for contact with ID: ${contact.id}` });
  }
};

const createContactMeeting = (req, res) => {
  const contact = findContactById(Number(req.params.id), res);

  if (contact) {
    const { body } = req;

    const newMeeting = {
      ...body,
      contactId: Number(req.params.id),
      id: meetingData.length + 1,
    };

    meetingData.push(newMeeting);
    contact.meetings.push(newMeeting);

    res.status(201).json({ meeting: newMeeting });
  }
};

app.get("/contacts", getContacts);
app.post("/contacts", createContact);
app.get("/contacts/:id", getContactById);
app.delete("/contacts/:id", deleteContactById);
app.put("/contacts/:id", updateContactById);

app.get("/meetings", getMeetings);
app.get("/meetings/:id", getMeetingById);
app.delete("/meetings/:id", deleteMeetingById);
app.put("/meetings/:id", updateMeetingById);

app.get("/contacts/:id/meetings", getContactMeetings);
app.post("/contacts/:id/meetings", createContactMeeting);

module.exports = app;
