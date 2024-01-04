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

const updateContact = (req, contact) => {
    const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body

    contact.firstName = firstName
    contact.lastName = lastName
    contact.street = street
    contact.city = city
    contact.type = type
    contact.email = email
    contact.linkedin = linkedin
    contact.twitter = twitter

    return contact
}

module.exports = { formatContact, findContact, removeContact, updateContact }