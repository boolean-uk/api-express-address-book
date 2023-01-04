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

let contacts = require("../data/contacts");
let meetings = require("../data/meetings");
// add your routes here
app.get("/contacts", (req, res) => {
	res.json(contacts);
});

app.post("/contacts", (req, res) => {
	const contactData = { ...req.body, id: contacts.length + 1 };
	contacts.push(contactData);
	res.status(201).json({ contact: contactData });
});

app.get("/contacts/:id", (req, res) => {
	const contact = contacts.find((item) => item.id === Number(req.params.id));
	res.json(contact);
});

app.delete("/contacts/:id", (req, res) => {
	const contact = contacts.find((item) => item.id === Number(req.params.id));
	const index = contacts.indexOf(contact);
	contacts.splice(index, 1);
	res.json();
});

app.put("/contacts/:id", (req, res) => {
	const contact = contacts.find((item) => item.id === Number(req.params.id));

	contact.firstName = req.body.firstName;
	contact.lastName = req.body.lastName;
	contact.street = req.body.street;
	contact.city = req.body.city;
	contact.type = req.body.type;
	contact.email = req.body.email;
	contact.linkedin = req.body.linkedin;
	contact.twitter = req.body.twitter;

	console.log(contact);

	res.status(201).json({ contact: contact });
});

// Extension

app.get("/meetings", (req, res) => {
	res.json(meetings);
});

app.get("/meetings/:id", (req, res) => {
	const meeting = meetings.find((item) => item.id === Number(req.params.id));
	res.json(meeting);
});

app.delete("/meetings/:id", (req, res) => {
	const meeting = meetings.find((item) => item.id === Number(req.params.id));
	const index = meetings.indexOf(meeting);
	meetings.splice(index, 1);
	res.json();
});

app.put("/meetings/:id", (req, res) => {
	const meeting = meetings.find((item) => item.id === Number(req.params.id));
	meeting.name = req.body.name;
	res.status(201).json(meeting);
});

app.get("/contacts/:id/meetings", (req, res) => {
	const filteredMeetings = meetings.filter(
		(meeting) => meeting.contactId === req.params.id
	);
	res.json({ meetings: filteredMeetings });
});

app.post("/contacts/:id/meetings", (req, res) => {
	const contactId = req.params.id;
	const meetingData = { ...req.body, id: meetings.length + 1, contactId };
	meetings.push(meetingData);
	console.log(meetingData);

	console.log(req.params.id);
	res.status(201).json({ meeting: meetingData });
});

module.exports = app;
