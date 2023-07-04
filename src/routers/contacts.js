const express = require('express')
const router = express.Router()
const contacts = require('../../data/contacts')

let newId = contacts.length
// Get all list
router.get('/', (req, res) => {
	return res.send({ contacts })
})

// Create contact
router.post('/', (req, res) => {
	newId++
	const newContact = {
		...req.body,
		id: newId,
	}
	contacts.push(newContact)
	return res.status(201).send({
		newContact,
	})
})

// Contact by ID
router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	const contact = contacts.find((contact) => contact.id === id)
	return res.send({ contact: contact })
})

// Delete contact by ID
router.delete('/:id', (req, res) => {
	const id = Number(req.params.id)
	const contact = contacts.find((contact) => contact.id === id)
	return res.send({ contact: contact })
})

module.exports = router
