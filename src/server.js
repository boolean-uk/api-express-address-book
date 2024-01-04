const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require("../data/contacts.js")
const meetings = require("../data/meetings.js")

const { createContact, formatContact, findContact, removeContact, updateContact } = require("./contactFunctions.js")
const { findMeeting, formatMeeting, removeMeeting, updateMeeting, getContactMeetings, createMeeting } = require("./meetingFunctions.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let currentContactId = 2

// GET ALL CONTACTS
app.get("/contacts", (req, res) => {
    const allContacts = {
        "contacts": contacts
    }
    return res.status(200).json(allContacts)
})

// CREATE NEW CONTACT
app.post("/contacts", (req, res) => {
    const newContact = createContact(req, contacts, currentContactId)
    return res.status(201).json(formatContact(newContact))
})

// FIND CONTACT BY ID
app.get("/contacts/:id", (req, res) => {
    const foundContact = findContact(req, res, contacts)
    return res.status(200).json(formatContact(foundContact))
})

// DELETE CONTACT BY ID
app.delete("/contacts/:id", (req, res) => {
    const foundContact = findContact(req, res, contacts)
    removeContact(contacts, foundContact)
    meetings.map(meeting => {
        if (Number(meeting.contactId) === foundContact.id) {
            removeMeeting(meetings, meeting)
        }
    })
    return res.status(200).json(formatContact(foundContact))
})

// UPDATE A CONTACT BY ID
app.put("/contacts/:id", (req, res) => {
    const contact = findContact(req, res, contacts)
    updateContact(req, contact)
    return res.status(200).json(formatContact(contact))
})

// EXTENSION
// GET ALL MEETINGS
app.get("/meetings", (req, res) => {
    const allMeetings = {
        meetings
    }
    return res.status(200).json(allMeetings)
})

// GET MEETING BY ID
app.get("/meetings/:id", (req, res) => {
    const foundMeeting = findMeeting(req, res, meetings)
    return res.status(200).json(formatMeeting(foundMeeting))
})

// DELETE MEETING BY ID
app.delete("/meetings/:id", (req, res) => {
    const meetingToDelete = findMeeting(req, res, meetings)
    removeMeeting(meetings, meetingToDelete)
    return res.status(200).json(formatMeeting(meetingToDelete))
})

// UPDATE MEETING BY ID
app.put("/meetings/:id", (req, res) => {
    const meeting = findMeeting(req, res, meetings)
    updateMeeting(req, meeting)
    return res.status(200).json(formatMeeting(meeting))
})

// GET MEETING FOR CONTACT
app.get("/contacts/:id/meetings", (req, res) => {
    const contact = findContact(req, res, contacts)
    const contactMeetings = getContactMeetings(contact, meetings)
    return res.status(200).json(contactMeetings)
})

// CREATE MEETING FOR A CONTACT
let currentMeetingId = 3

app.post("/contacts/:id/meetings", (req, res) => {
    const contact = findContact(req, res, contacts)
    const newMeeting = createMeeting(req, contact, currentMeetingId, meetings)
    return res.status(201).json(formatMeeting(newMeeting))
})

module.exports = app
