// FUNCTS
const formatContact = (contact) => {
    const response = {
        "contact": contact
    }
    return response
}

const findContact = (idParam, res, data) => {
    const contactId = Number(idParam)
    const foundContact = data.find(contact => contact.id === contactId)

    if (!foundContact) return res.status(404).json(`Contact with id ${contactId} does not exist`)

    return foundContact
}

const removeContact = (data, contact) => {
    const contactIndex = data.indexOf(contact)
    data.splice(contactIndex, 1)
}

module.exports = { formatContact, findContact, removeContact }