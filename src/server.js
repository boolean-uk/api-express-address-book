const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json("Welcome to contacts");
});

const contactsRouter = require("./routers/contactsEndpoints.js");
app.use('/contacts', contactsRouter);

// ............... EXTENSION ..............

const meetingsRouter = require('./routers/meetingsEndpoints.js')
app.use(meetingsRouter)

module.exports = app;
