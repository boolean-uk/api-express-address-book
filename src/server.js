const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// write your app code here
const contacts = require('../data/contacts');
const meetings = require('../data/meetings');

app.get('/contacts', (req, res) => {
    res.json({ contacts });
});

app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find((item) => item.id === id);
    res.json({ contact });
});

app.post('/contacts', (req, res) => {
    const newContact = req.body;
    newContact.id = contacts[contacts.length - 1].id + 1;
    contacts.push(newContact);
    res.status(201).json({ contact: newContact });
});

app.put('/contacts/:id', (req, res) => {
    const id = Number(req.params.id);
    const editedContact = req.body;
    editedContact.id = id;
    const contactIndex = contacts.findIndex((contact) => (contact.id = id));
    contacts[contactIndex] = editedContact;
    res.json({ contact: editedContact });
});

app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find((item) => item.id === id);
    const contactIndex = contacts.findIndex((contact) => (contact.id = id));
    contacts.splice(contactIndex, 1);

    const filteredMeetings = meetings.filter(
        (meeting) => meeting.contactId === id
    );

    filteredMeetings.forEach((meeting) => {
        const id = meeting.id;
        const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);
        meetings.splice(meetingIndex, 1);
    });

    res.json({ contact });
});

app.get('/meetings', (req, res) => {
    res.json({ meetings });
});

app.get('/meetings/:id', (req, res) => {
    const id = Number(req.params.id);
    const meeting = meetings.find((meeting) => meeting.id === id);
    res.json({ meeting });
});

app.put('/meetings/:id', (req, res) => {
    const id = Number(req.params.id);
    const editedMeeting = req.body;
    editedMeeting.contactId = id;
    editedMeeting.id = id;
    const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);
    console.log(meetings);
    meetings[meetingIndex] = editedMeeting;
    console.log(meetings);
    res.json({ meeting: editedMeeting });
});

app.delete('/meetings/:id', (req, res) => {
    const id = Number(req.params.id);
    const meeting = meetings.find((meeting) => meeting.id === id);
    const meetingIndex = meetings.findIndex((meeting) => (meeting.id = id));
    meetings.splice(meetingIndex, 1);
    res.json({ meeting });
});

app.get('/contacts/:id/meetings', (req, res) => {
    const id = Number(req.params.id);
    const contactMeetings = meetings.filter(
        (meeting) => meeting.contactId === id
    );
    res.json({ meetings: contactMeetings });
});

app.post('/contacts/:id/meetings', (req, res) => {
    const newMeeting = req.body;
    newMeeting.id = meetings[meetings.length - 1].id + 1;
    const id = Number(req.params.id);
    newMeeting.contactId = id;
    meetings.push(newMeeting);
    res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
