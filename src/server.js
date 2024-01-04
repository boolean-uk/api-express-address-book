const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const createTestFormData = require("../test/fixtures/contacts/createTestFormData.js");
const createTestupdateTestFormDataFormData = require("../test/fixtures/contacts/updateTestFormData.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let currentID = 1;

const contacts = createTestFormData.map((contact, index) => ({
  id: currentID + index,
  ...contact,
}));

app.get("/contacts", (req, res) => {
  return res.status(200).json({ contacts });
});

module.exports = app;
