const {contacts} = require('../data/contacts.js')

function foundContactById (req, res) {
    const contactId = Number(req.params.id)
    const foundContact = contacts.find((contact) => contact.id === contactId)

    if(!foundContact) {
        res.status(404).json({error: `No contact with ID: ${contactId}`})
    }
    return foundContact
}

module.exports = foundContactById