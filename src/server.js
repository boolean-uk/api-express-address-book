const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = require("../data/contacts.js");
const meetings = require("../data/meetings.js");

// initializing express app
const app = express();

// Middleware setup for logging and handling CORS
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

module.exports = app
