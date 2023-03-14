const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contactsRouter = require("./routes/contacts");
const meetingsRouter = require("./routes/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/meetings", meetingsRouter);

module.exports = app;
