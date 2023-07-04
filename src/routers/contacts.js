const express = require('express')
const router = express.Router()
const contacts = require('../../data/contacts')

// Get all list
router.get('/', (req, res) => {
	return res.send({ contacts })
})

module.exports = router
