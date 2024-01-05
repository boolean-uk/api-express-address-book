const express = require("express");
const router = express.Router();

const { meetings } = require("../../data/meetings.js");
let { meetingsIdCounter } = require("../../data/meetings.js")
const { findMeetingById, findMeetingsByContactId } = require("../client.js");

router.get("/meetings", (req, res) => {
    return res.status(200).json({ meetings: meetings });
});

router.get("/meetings/:id", (req, res) => {
    const foundMeeting = findMeetingById(req, res);
    return res.status(200).json({ meeting: foundMeeting });
});

router.delete("/meetings/:id", (req, res) => {
    const foundMeetingToDelete = findMeetingById(req, res);

    if (foundMeetingToDelete) {
        const foundMeetingIndex = meetings.indexOf(foundMeetingToDelete);
        meetings.splice(foundMeetingIndex, 1);
    }
    return res.status(200).json({ meeting: foundMeetingToDelete });
});

router.put("/meetings/:id", (req, res) => {
    const foundMeetingToUpdate = findMeetingById(req, res);

    if (foundMeetingToUpdate) {
        const { name } = req.body;

        foundMeetingToUpdate.name = name;
    }
    return res.status(200).json({ meeting: foundMeetingToUpdate });
});

router.get("/contacts/:id/meetings", (req, res) => {
    const foundMeetings = findMeetingsByContactId(req, res);
    console.log(foundMeetings);
    return res.status(200).json({ meetings: foundMeetings });
});

router.post("/contacts/:id/meetings", (req, res) => {
    const contactId = Number(req.params.id);
    let newMeeting = req.body;
    newMeeting = { ...newMeeting, contactId: contactId, id: meetingsIdCounter };
    meetingsIdCounter++;

    meetings.push(newMeeting);

    return res.status(201).json({ meeting: newMeeting });
});

module.exports = router;
