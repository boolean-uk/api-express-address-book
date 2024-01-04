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

module.exports = { formatContact, findContact }