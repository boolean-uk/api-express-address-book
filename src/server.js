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

// add your routes here
app.get("/contacts", (req, res) => {
	res.json(contacts);
});

app.post("/contacts", (req, res) => {
	const contactData = { ...req.body, id: contacts.length + 1 };
	contacts.push(contactData);
	res.status(201).json({ contact: contactData });
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

	res.json({ contact: contact });
});

module.exports = app;
