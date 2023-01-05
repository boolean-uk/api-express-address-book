const meetings = require("../../data/meetings.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ meetings: meetings });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meeting) => meeting.id === id);
  res.json({ meeting: meeting });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meeting) => meeting.id === id);
  const index = meetings.indexOf(meeting);
  meetings.splice(index, 1);
  res.json(meetings);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meeting) => meeting.id === id);
  Object.assign(meeting, req.body);
  res.json(meeting);
});

module.exports = router;
