// FUNCTS
const formatContact = (contact) => {
    const response = {
        "contact": contact
    }
    return response
}

const findContact = (idParam, data) => {
    const contactId = Number(idParam)

    return data.find(contact => contact.id === contactId)

}

module.exports = { formatContact, findContact }