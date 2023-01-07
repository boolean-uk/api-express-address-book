const express = require("express");
const router = express.Router();
const meetings = require("../../data/meetings.js");
// get all meetings
router.get("/", (req, res) => {
  res.json({ meetings: meetings });
});
// get meeting by id
router.get("/:id", (req, res) => {
  const meeting = meetings.find((item) => item.id === Number(req.params.id));
  const contactId = meeting.contactId;

  res.json({ meeting: meeting });
});
//delete a meeting
router.delete("/:id", (req, res) => {
  const meeting = meetings.find((item) => item.id === Number(req.params.id));
  const index = meetings.indexOf(meeting);

  meetings.splice(index, 1);
  res.json({ meeting: meeting });
});
//update a meeting
router.put("/:id", (req, res) => {
  const meeting = meetings.find((item) => item.id === Number(req.params.id));

  meeting.name = req.body.name;
  //meeting.contactId = Number(meeting.contactId);

  res.json({ meeting: meeting });
});

module.exports = router;
